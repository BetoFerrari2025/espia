import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AD_LIBRARY_API = "https://graph.facebook.com/v21.0/ads_archive";

interface AdLibraryAd {
  id: string;
  ad_snapshot_url?: string;
  page_name?: string;
  page_id?: string;
  ad_creative_bodies?: string[];
  ad_creative_link_titles?: string[];
  ad_creative_link_captions?: string[];
  ad_creative_link_descriptions?: string[];
  bylines?: string;
  publisher_platforms?: string[];
  ad_delivery_start_time?: string;
  ad_delivery_stop_time?: string;
  impressions?: { lower_bound?: string; upper_bound?: string };
  spend?: { lower_bound?: string; upper_bound?: string };
  languages?: string[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FACEBOOK_ACCESS_TOKEN = Deno.env.get("FACEBOOK_ACCESS_TOKEN");
    if (!FACEBOOK_ACCESS_TOKEN) {
      throw new Error("FACEBOOK_ACCESS_TOKEN is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Parse optional search params from request body
    let searchTerms = "";
    let adType = "ALL";
    let country = "BR";
    let limit = 50;

    try {
      const body = await req.json();
      searchTerms = body.search_terms || "";
      adType = body.ad_type || "ALL";
      country = body.country || "BR";
      limit = Math.min(body.limit || 50, 100);
    } catch {
      // Use defaults for cron calls with no body
    }

    // Build Facebook Ad Library API URL
    const params = new URLSearchParams({
      access_token: FACEBOOK_ACCESS_TOKEN,
      ad_reached_countries: `["${country}"]`,
      ad_active_status: "ACTIVE",
      ad_type: adType,
      fields: [
        "id",
        "ad_snapshot_url",
        "page_name",
        "page_id",
        "ad_creative_bodies",
        "ad_creative_link_titles",
        "ad_creative_link_captions",
        "publisher_platforms",
        "ad_delivery_start_time",
        "ad_delivery_stop_time",
        "impressions",
        "spend",
        "languages",
      ].join(","),
      limit: limit.toString(),
      search_page_ids: "",
      search_type: "KEYWORD_UNORDERED",
    });

    if (searchTerms) {
      params.set("search_terms", searchTerms);
    } else {
      // Default: fetch ads with high impressions (scaled ads)
      params.set("search_terms", "compre agora");
    }

    const url = `${AD_LIBRARY_API}?${params.toString()}`;
    console.log("Fetching from Facebook Ad Library API...");

    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Facebook API error [${response.status}]: ${errorBody}`);
    }

    const data = await response.json();
    const ads: AdLibraryAd[] = data.data || [];

    console.log(`Fetched ${ads.length} ads from Facebook Ad Library`);

    // Transform and upsert ads
    const transformedAds = ads.map((ad) => {
      const startDate = ad.ad_delivery_start_time
        ? new Date(ad.ad_delivery_start_time)
        : null;
      const endDate = ad.ad_delivery_stop_time
        ? new Date(ad.ad_delivery_stop_time)
        : null;
      const now = new Date();
      const daysRunning = startDate
        ? Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      // Determine platform
      const platforms = ad.publisher_platforms || [];
      let platform = "facebook";
      if (platforms.includes("instagram") && !platforms.includes("facebook")) {
        platform = "instagram";
      }

      return {
        ad_library_id: ad.id,
        ad_snapshot_url: ad.ad_snapshot_url || null,
        advertiser_name: ad.page_name || "Desconhecido",
        page_name: ad.page_name || null,
        page_id: ad.page_id || null,
        ad_creative_body: ad.ad_creative_bodies?.[0] || null,
        ad_creative_link_title: ad.ad_creative_link_titles?.[0] || null,
        ad_creative_link_url: null,
        ad_creative_image_url: null,
        platform,
        ad_type: "imagem",
        status: endDate ? "ended" : "active",
        start_date: startDate ? startDate.toISOString().split("T")[0] : null,
        end_date: endDate ? endDate.toISOString().split("T")[0] : null,
        days_running: Math.max(daysRunning, 0),
        impressions_lower: parseInt(ad.impressions?.lower_bound || "0"),
        impressions_upper: parseInt(ad.impressions?.upper_bound || "0"),
        spend_lower: parseFloat(ad.spend?.lower_bound || "0"),
        spend_upper: parseFloat(ad.spend?.upper_bound || "0"),
        country,
        fetched_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });

    if (transformedAds.length > 0) {
      const { error: upsertError } = await supabase
        .from("facebook_ads")
        .upsert(transformedAds, { onConflict: "ad_library_id" });

      if (upsertError) {
        throw new Error(`Upsert error: ${upsertError.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        fetched: ads.length,
        upserted: transformedAds.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error fetching Facebook ads:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
