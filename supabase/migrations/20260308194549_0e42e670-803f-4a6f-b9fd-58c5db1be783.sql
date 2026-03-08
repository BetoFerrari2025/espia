
CREATE TABLE public.facebook_ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_library_id text UNIQUE NOT NULL,
  ad_snapshot_url text,
  advertiser_name text NOT NULL,
  advertiser_id text,
  page_name text,
  page_id text,
  ad_creative_body text,
  ad_creative_link_title text,
  ad_creative_link_url text,
  ad_creative_image_url text,
  platform text NOT NULL DEFAULT 'facebook',
  ad_type text NOT NULL DEFAULT 'imagem',
  status text NOT NULL DEFAULT 'active',
  start_date date,
  end_date date,
  days_running integer DEFAULT 0,
  impressions_lower bigint DEFAULT 0,
  impressions_upper bigint DEFAULT 0,
  spend_lower numeric DEFAULT 0,
  spend_upper numeric DEFAULT 0,
  country text DEFAULT 'BR',
  category text,
  fetched_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.facebook_ads ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read ads
CREATE POLICY "Authenticated users can read facebook_ads"
ON public.facebook_ads FOR SELECT TO authenticated
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.facebook_ads;

-- Enable pg_cron and pg_net for scheduled fetching
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
