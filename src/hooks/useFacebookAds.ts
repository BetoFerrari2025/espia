import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FacebookAd {
  id: string;
  ad_library_id: string;
  ad_snapshot_url: string | null;
  advertiser_name: string;
  advertiser_id: string | null;
  page_name: string | null;
  page_id: string | null;
  ad_creative_body: string | null;
  ad_creative_link_title: string | null;
  ad_creative_link_url: string | null;
  ad_creative_image_url: string | null;
  platform: string;
  ad_type: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  days_running: number;
  impressions_lower: number;
  impressions_upper: number;
  spend_lower: number;
  spend_upper: number;
  country: string;
  category: string | null;
  fetched_at: string;
  created_at: string;
}

export const useFacebookAds = () => {
  return useQuery({
    queryKey: ["facebook-ads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facebook_ads")
        .select("*")
        .order("days_running", { ascending: false })
        .limit(200);

      if (error) throw error;
      return data as FacebookAd[];
    },
  });
};

export const useTriggerFetch = () => {
  const triggerFetch = async (searchTerms?: string) => {
    const { data, error } = await supabase.functions.invoke("fetch-facebook-ads", {
      body: {
        search_terms: searchTerms || "",
        country: "BR",
        limit: 50,
      },
    });
    if (error) throw error;
    return data;
  };

  return { triggerFetch };
};
