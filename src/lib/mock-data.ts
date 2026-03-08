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
    id: "1", name: "VSL - Método Milionário 2.0", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://metodo-milionario.com/oferta", spend: 12450.00, impressions: 385000,
    clicks: 11550, conversions: 578, ctr: 3.0, cpc: 1.08, startDate: "2026-01-10",
    endDate: null, creative: "VSL 18min - Depoimentos", campaign: "Conversão - Método MM",
    advertiser: "Pablo Marçal", platform: "facebook", adType: "video",
    activeAdsCount: 87, daysRunning: 57,
    thumbnailUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop"
  },
  {
    id: "2", name: "Carrossel - 5 Erros no Tráfego Pago", status: "active", funnelStage: "topo",
    salesPageUrl: "https://trafegopago.expert/erros", spend: 3200.00, impressions: 520000,
    clicks: 15600, conversions: 1560, ctr: 3.0, cpc: 0.21, startDate: "2026-02-01",
    endDate: null, creative: "Carrossel 5 slides educativo", campaign: "Captação - Tráfego Expert",
    advertiser: "Tiago Tessmann", platform: "facebook", adType: "carrossel",
    activeAdsCount: 63, daysRunning: 35,
    thumbnailUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=500&fit=crop"
  },
  {
    id: "3", name: "Criativo Estático - Emagreça em 21 Dias", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://corpo21dias.com/oferta", spend: 8900.00, impressions: 290000,
    clicks: 8700, conversions: 435, ctr: 3.0, cpc: 1.02, startDate: "2026-01-05",
    endDate: null, creative: "Antes e Depois + CTA", campaign: "Vendas - Corpo 21",
    advertiser: "Dra. Fernanda Lima", platform: "facebook", adType: "imagem",
    activeAdsCount: 112, daysRunning: 62,
    thumbnailUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop"
  },
  {
    id: "4", name: "Reels - Renda Extra com Dropshipping", status: "active", funnelStage: "meio",
    salesPageUrl: "https://dropmaster.com.br/aula", spend: 5670.00, impressions: 670000,
    clicks: 20100, conversions: 2010, ctr: 3.0, cpc: 0.28, startDate: "2026-01-20",
    endDate: null, creative: "UGC Storytelling 45s", campaign: "Webinar Drop",
    advertiser: "Caio Ferreira", platform: "instagram", adType: "video",
    activeAdsCount: 95, daysRunning: 47,
    thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=500&fit=crop"
  },
  {
    id: "5", name: "VSL - Curso de Inglês Fluente", status: "paused", funnelStage: "fundo",
    salesPageUrl: "https://inglesfluente.com/matricula", spend: 15200.00, impressions: 410000,
    clicks: 12300, conversions: 615, ctr: 3.0, cpc: 1.24, startDate: "2025-12-15",
    endDate: "2026-02-28", creative: "VSL Professor Nativo", campaign: "Matrícula Inglês Q1",
    advertiser: "Mairo Vergara", platform: "facebook", adType: "video",
    activeAdsCount: 74, daysRunning: 75,
    thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop"
  },
  {
    id: "6", name: "Story - Lançamento Mentoria Premium", status: "active", funnelStage: "meio",
    salesPageUrl: "https://mentoriapremium.io/lista-espera", spend: 2100.00, impressions: 180000,
    clicks: 5400, conversions: 540, ctr: 3.0, cpc: 0.39, startDate: "2026-02-20",
    endDate: null, creative: "Stories Countdown + Urgência", campaign: "Lançamento Mentoria",
    advertiser: "Ícaro de Carvalho", platform: "instagram", adType: "video",
    activeAdsCount: 48, daysRunning: 16,
    thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop"
  },
  {
    id: "7", name: "Carrossel - Skincare Coreano", status: "active", funnelStage: "topo",
    salesPageUrl: "https://kbeauty.store/colecao", spend: 4300.00, impressions: 890000,
    clicks: 26700, conversions: 1335, ctr: 3.0, cpc: 0.16, startDate: "2026-01-25",
    endDate: null, creative: "Carrossel Produto + Review", campaign: "Awareness K-Beauty",
    advertiser: "Boca Rosa", platform: "facebook", adType: "carrossel",
    activeAdsCount: 56, daysRunning: 42,
    thumbnailUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop"
  },
  {
    id: "8", name: "Video UGC - Suplemento Whey Isolado", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://nutrishop.com/whey-promo", spend: 6800.00, impressions: 320000,
    clicks: 9600, conversions: 960, ctr: 3.0, cpc: 0.71, startDate: "2026-02-05",
    endDate: null, creative: "UGC Review + Unboxing", campaign: "Vendas Whey Fev",
    advertiser: "Growth Supplements", platform: "facebook", adType: "video",
    activeAdsCount: 41, daysRunning: 31,
    thumbnailUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=500&fit=crop"
  },
  {
    id: "9", name: "Imagem - Consultoria Financeira Grátis", status: "ended", funnelStage: "topo",
    salesPageUrl: "https://finplan.com.br/consultoria", spend: 1950.00, impressions: 410000,
    clicks: 12300, conversions: 1230, ctr: 3.0, cpc: 0.16, startDate: "2025-11-10",
    endDate: "2026-01-10", creative: "Imagem Calculadora + Gancho", campaign: "Lead Gen Finanças",
    advertiser: "Primo Rico", platform: "facebook", adType: "imagem",
    activeAdsCount: 33, daysRunning: 61,
    thumbnailUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop"
  },
  {
    id: "10", name: "VSL - Método de Vendas no Instagram", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://instasales.pro/oferta", spend: 9400.00, impressions: 275000,
    clicks: 8250, conversions: 413, ctr: 3.0, cpc: 1.14, startDate: "2026-01-18",
    endDate: null, creative: "VSL Resultados Alunos 12min", campaign: "Conversão Insta Sales",
    advertiser: "Leandro Ladeira", platform: "facebook", adType: "video",
    activeAdsCount: 68, daysRunning: 49,
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=500&fit=crop"
  },
  {
    id: "11", name: "Carrossel - Móveis Planejados 50% OFF", status: "active", funnelStage: "meio",
    salesPageUrl: "https://moveisplanejados.com/promo", spend: 3750.00, impressions: 195000,
    clicks: 5850, conversions: 293, ctr: 3.0, cpc: 0.64, startDate: "2026-02-10",
    endDate: null, creative: "Carrossel Ambientes Decorados", campaign: "Promo Março Móveis",
    advertiser: "MadeiraMadeira", platform: "facebook", adType: "carrossel",
    activeAdsCount: 29, daysRunning: 26,
    thumbnailUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop"
  },
  {
    id: "12", name: "Video Depoimento - Clareamento Dental", status: "paused", funnelStage: "fundo",
    salesPageUrl: "https://sorrisoperfeito.com/agendar", spend: 2800.00, impressions: 98000,
    clicks: 2940, conversions: 147, ctr: 3.0, cpc: 0.95, startDate: "2026-01-08",
    endDate: "2026-03-01", creative: "Antes/Depois Pacientes", campaign: "Agendamento Dental",
    advertiser: "Clínica OdontoStar", platform: "instagram", adType: "video",
    activeAdsCount: 19, daysRunning: 52,
    thumbnailUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=500&fit=crop"
  },
  {
    id: "13", name: "Imagem - Tênis Nike Air Max 40% OFF", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://sneakerstore.com.br/airmax", spend: 7200.00, impressions: 540000,
    clicks: 16200, conversions: 1620, ctr: 3.0, cpc: 0.44, startDate: "2026-02-14",
    endDate: null, creative: "Produto + Fundo Gradiente", campaign: "Promo Sneakers Fev",
    advertiser: "Netshoes", platform: "facebook", adType: "imagem",
    activeAdsCount: 82, daysRunning: 22,
    thumbnailUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop"
  },
  {
    id: "14", name: "TikTok - Receita Fit em 5 Minutos", status: "active", funnelStage: "topo",
    salesPageUrl: "https://receitasfit.app/download", spend: 1200.00, impressions: 1200000,
    clicks: 36000, conversions: 3600, ctr: 3.0, cpc: 0.03, startDate: "2026-03-01",
    endDate: null, creative: "Trend Recipe POV", campaign: "App Download Receitas",
    advertiser: "Cozinha Fitness", platform: "tiktok", adType: "video",
    activeAdsCount: 44, daysRunning: 7,
    thumbnailUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=500&fit=crop"
  },
  {
    id: "15", name: "Story - Curso de Confeitaria Artesanal", status: "active", funnelStage: "meio",
    salesPageUrl: "https://confeitariaartesanal.com/inscreva", spend: 1850.00, impressions: 145000,
    clicks: 4350, conversions: 435, ctr: 3.0, cpc: 0.43, startDate: "2026-02-18",
    endDate: null, creative: "Timelapse Bolo + CTA", campaign: "Lançamento Confeitaria",
    advertiser: "Dani Noce", platform: "instagram", adType: "video",
    activeAdsCount: 37, daysRunning: 18,
    thumbnailUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=500&fit=crop"
  },
  {
    id: "16", name: "VSL - Robô de Pix Automático", status: "active", funnelStage: "fundo",
    salesPageUrl: "https://pixrobo.digital/acesso", spend: 18500.00, impressions: 620000,
    clicks: 18600, conversions: 930, ctr: 3.0, cpc: 0.99, startDate: "2025-12-20",
    endDate: null, creative: "VSL Prova Social 20min", campaign: "Escala Pix Robô",
    advertiser: "Alex Vargas", platform: "facebook", adType: "video",
    activeAdsCount: 134, daysRunning: 78,
    thumbnailUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=500&fit=crop"
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
