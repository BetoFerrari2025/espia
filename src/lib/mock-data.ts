export type Ad = {
  id: string;
  name: string;
  status: "active" | "paused" | "ended";
  funnelStage: "topo" | "meio" | "fundo";
  salesPageUrl: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  startDate: string;
  endDate: string | null;
  creative: string;
  campaign: string;
  advertiser: string;
  platform: "facebook" | "instagram" | "tiktok";
  adType: "video" | "imagem" | "carrossel";
  activeAdsCount: number;
  daysRunning: number;
  thumbnailUrl: string;
};

export const mockAds: Ad[] = [
  {
    id: "1", name: "Oferta Black Friday - VSL", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://exemplo.com/oferta-black", spend: 4520.50, impressions: 125000,
    clicks: 3750, conversions: 187, ctr: 3.0, cpc: 1.21, startDate: "2026-01-15",
    endDate: null, creative: "Video VSL 15min", campaign: "BF2026 - Conversão",
    advertiser: "Autor de Livros JJ Rozza", platform: "facebook", adType: "video",
    activeAdsCount: 42, daysRunning: 52,
    thumbnailUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=500&fit=crop"
  },
  {
    id: "2", name: "Remarketing - Carrinho Abandonado", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://exemplo.com/checkout-remarketing", spend: 1890.30, impressions: 45000,
    clicks: 2250, conversions: 112, ctr: 5.0, cpc: 0.84, startDate: "2026-02-01",
    endDate: null, creative: "Carrossel Depoimentos", campaign: "Remarketing Q1",
    advertiser: "Emily Kent", platform: "instagram", adType: "carrossel",
    activeAdsCount: 40, daysRunning: 35,
    thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=500&fit=crop"
  },
  {
    id: "3", name: "Lead Magnet - Ebook Gratuito", status: "active", funnelStage: "topo",
    salesPageUrl: "https://exemplo.com/ebook-gratis", spend: 2340.00, impressions: 230000,
    clicks: 9200, conversions: 920, ctr: 4.0, cpc: 0.25, startDate: "2026-01-01",
    endDate: null, creative: "Imagem + Copy Direta", campaign: "Captação Leads",
    advertiser: "Ana Ruiz", platform: "facebook", adType: "imagem",
    activeAdsCount: 60, daysRunning: 67,
    thumbnailUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop"
  },
  {
    id: "4", name: "Webinar - Aula Ao Vivo", status: "paused", funnelStage: "meio",
    salesPageUrl: "https://exemplo.com/webinar-aovivo", spend: 3100.00, impressions: 89000,
    clicks: 4450, conversions: 445, ctr: 5.0, cpc: 0.70, startDate: "2026-01-20",
    endDate: "2026-02-28", creative: "Video Convite 60s", campaign: "Webinar Março",
    advertiser: "Belo Valcido", platform: "facebook", adType: "video",
    activeAdsCount: 53, daysRunning: 47,
    thumbnailUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=500&fit=crop"
  },
  {
    id: "5", name: "Teste A/B - Nova Copy", status: "active", funnelStage: "meio",
    salesPageUrl: "https://exemplo.com/teste-ab-v2", spend: 890.00, impressions: 34000,
    clicks: 1020, conversions: 51, ctr: 3.0, cpc: 0.87, startDate: "2026-03-01",
    endDate: null, creative: "Imagem Minimalista", campaign: "Teste Criativos",
    advertiser: "Dicas de Laune", platform: "instagram", adType: "imagem",
    activeAdsCount: 35, daysRunning: 7,
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop"
  },
  {
    id: "6", name: "Lookalike - Compradores", status: "ended", funnelStage: "topo",
    salesPageUrl: "https://exemplo.com/lp-lookalike", spend: 5600.00, impressions: 450000,
    clicks: 13500, conversions: 675, ctr: 3.0, cpc: 0.41, startDate: "2025-11-01",
    endDate: "2025-12-31", creative: "Video UGC 30s", campaign: "Escala Q4 2025",
    advertiser: "Marco Silva", platform: "tiktok", adType: "video",
    activeAdsCount: 28, daysRunning: 61,
    thumbnailUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=500&fit=crop"
  },
  {
    id: "7", name: "Retargeting - Visualizadores VSL", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://exemplo.com/oferta-retarget", spend: 1560.00, impressions: 28000,
    clicks: 1400, conversions: 98, ctr: 5.0, cpc: 1.11, startDate: "2026-02-15",
    endDate: null, creative: "Stories Urgência", campaign: "Retarget VSL",
    advertiser: "Pedro Almeida", platform: "instagram", adType: "video",
    activeAdsCount: 45, daysRunning: 21,
    thumbnailUrl: "https://images.unsplash.com/photo-1553729459-uj1ef3a6cze?w=400&h=500&fit=crop"
  },
  {
    id: "8", name: "Awareness - Marca Pessoal", status: "active", funnelStage: "topo",
    salesPageUrl: "https://exemplo.com/quem-somos", spend: 780.00, impressions: 180000,
    clicks: 5400, conversions: 0, ctr: 3.0, cpc: 0.14, startDate: "2026-03-01",
    endDate: null, creative: "Reels Educativo", campaign: "Branding 2026",
    advertiser: "Julia Mendes", platform: "tiktok", adType: "video",
    activeAdsCount: 22, daysRunning: 7,
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=500&fit=crop"
  },
];

export const funnelStageLabels: Record<string, string> = {
  topo: "Topo de Funil",
  meio: "Meio de Funil",
  fundo: "Fundo de Funil",
};

export const statusLabels: Record<string, string> = {
  active: "Ativo",
  paused: "Pausado",
  ended: "Encerrado",
};
