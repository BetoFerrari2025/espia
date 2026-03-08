import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  ArrowLeft, ExternalLink, Play, Image, Layers, Eye, DollarSign,
  MousePointerClick, BarChart3, Target, Calendar, Globe, Facebook, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { mockAds, Ad, statusLabels } from "@/lib/mock-data";
import { useFacebookAds } from "@/hooks/useFacebookAds";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";

const statusColor: Record<string, string> = {
  active: "bg-success/15 text-success border-success/20",
  paused: "bg-warning/15 text-warning border-warning/20",
  ended: "bg-muted text-muted-foreground border-border",
};

const adTypeIcon: Record<string, typeof Play> = {
  video: Play,
  imagem: Image,
  carrossel: Layers,
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatNumber = (value: number) => value.toLocaleString("pt-BR");

const generateChartData = (ad: Ad) => {
  const days = Math.min(ad.daysRunning, 30);
  const data = [];
  for (let i = 0; i < days; i++) {
    const noise = () => 0.7 + Math.random() * 0.6;
    data.push({
      day: `Dia ${i + 1}`,
      impressões: Math.round((ad.impressions / days) * noise()),
      cliques: Math.round((ad.clicks / days) * noise()),
      conversões: Math.round((ad.conversions / days) * noise()),
      gasto: Math.round((ad.spend / days) * noise() * 100) / 100,
    });
  }
  return data;
};

const AdDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: facebookAds } = useFacebookAds();

  // Convert FB ads
  const convertedFbAds: Ad[] = useMemo(() => {
    if (!facebookAds) return [];
    return facebookAds.map((fb): Ad => ({
      id: fb.id,
      name: fb.ad_creative_link_title || fb.ad_creative_body?.slice(0, 60) || "Anúncio Facebook",
      status: fb.status as Ad["status"],
      funnelStage: "fundo",
      salesPageUrl: fb.ad_creative_link_url || "#",
      snapshotUrl: fb.ad_snapshot_url || undefined,
      spend: (fb.spend_lower + fb.spend_upper) / 2,
      impressions: (fb.impressions_lower + fb.impressions_upper) / 2,
      clicks: Math.round(((fb.impressions_lower + fb.impressions_upper) / 2) * 0.03),
      conversions: Math.round(((fb.impressions_lower + fb.impressions_upper) / 2) * 0.01),
      ctr: 3.0,
      cpc: fb.spend_upper > 0 ? fb.spend_upper / Math.max(1, fb.impressions_upper * 0.03) : 0,
      startDate: fb.start_date || "",
      endDate: fb.end_date || null,
      creative: fb.ad_creative_body?.slice(0, 40) || "Criativo Facebook",
      campaign: fb.category || "Facebook Ad Library",
      advertiser: fb.advertiser_name,
      platform: fb.platform as Ad["platform"],
      adType: fb.ad_type as Ad["adType"],
      activeAdsCount: fb.days_running > 30 ? Math.round(fb.days_running * 1.5) : fb.days_running,
      daysRunning: fb.days_running,
      thumbnailUrl: fb.ad_creative_image_url || fb.ad_snapshot_url || "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=500&fit=crop",
      adCreativeBody: fb.ad_creative_body || undefined,
    }));
  }, [facebookAds]);

  const allAds = [...convertedFbAds, ...mockAds];
  const ad = allAds.find((a) => a.id === id);
  const chartData = useMemo(() => (ad ? generateChartData(ad) : []), [ad]);

  if (!ad) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">Anúncio não encontrado</p>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const TypeIcon = adTypeIcon[ad.adType] || Image;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center border-b border-border px-4 bg-card gap-3">
            <SidebarTrigger className="mr-2" />
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Button>
            <h1 className="font-display font-semibold text-foreground truncate">{ad.name}</h1>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <div className="max-w-5xl mx-auto space-y-6">

              {/* Top Section: Creative + Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Creative Preview */}
                <Card className="md:col-span-1">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/5] bg-muted rounded-t-xl overflow-hidden">
                      <img src={ad.thumbnailUrl} alt={ad.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="outline" className={statusColor[ad.status] + " backdrop-blur-sm"}>
                          {statusLabels[ad.status]}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                        <TypeIcon className="w-3.5 h-3.5 text-foreground" />
                        <span className="text-xs font-medium text-foreground">{ad.adType}</span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="p-4 space-y-3">
                      {ad.snapshotUrl && (
                        <a
                          href={ad.snapshotUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline bg-primary/10 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary/15"
                        >
                          <Facebook className="w-4 h-4" />
                          Ver na Ad Library do Facebook
                          <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                        </a>
                      )}
                      <a
                        href={ad.salesPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:underline bg-secondary rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary/80"
                      >
                        <Globe className="w-4 h-4" />
                        Ver página de vendas
                        <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Info Column */}
                <div className="md:col-span-2 space-y-6">
                  {/* Advertiser Card */}
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary shrink-0">
                          {ad.advertiser.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg font-semibold text-foreground">{ad.advertiser}</h2>
                          <p className="text-sm text-muted-foreground">{ad.campaign}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">{ad.platform}</Badge>
                            <Badge variant="secondary">{ad.adType}</Badge>
                            <Badge variant="secondary">
                              {ad.funnelStage === "topo" ? "Topo de Funil" : ad.funnelStage === "meio" ? "Meio de Funil" : "Fundo de Funil"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Creative Body */}
                  {ad.adCreativeBody && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                          <Layers className="w-4 h-4" /> Texto do Criativo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{ad.adCreativeBody}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* KPIs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <MetricCard icon={DollarSign} label="Gasto Total" value={formatCurrency(ad.spend)} accent />
                    <MetricCard icon={Eye} label="Impressões" value={formatNumber(ad.impressions)} />
                    <MetricCard icon={MousePointerClick} label="Cliques" value={formatNumber(ad.clicks)} />
                    <MetricCard icon={Target} label="Conversões" value={formatNumber(ad.conversions)} />
                    <MetricCard icon={BarChart3} label="CTR" value={`${ad.ctr.toFixed(1)}%`} />
                    <MetricCard icon={DollarSign} label="CPC" value={formatCurrency(ad.cpc)} />
                  </div>

                  {/* Timeline */}
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Início: <span className="text-foreground font-medium">{ad.startDate}</span></span>
                        </div>
                        {ad.endDate && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Fim: <span className="text-foreground font-medium">{ad.endDate}</span></span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span><span className="text-foreground font-medium">{ad.daysRunning}</span> dias ativo</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span><span className="text-foreground font-medium">{ad.activeAdsCount}</span> anúncios com este criativo</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Performance Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                      <BarChart3 className="w-4 h-4" /> Impressões & Cliques (últimos {chartData.length} dias)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                          <defs>
                            <linearGradient id="impressionsGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} interval="preserveStartEnd" />
                          <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                          <Legend wrapperStyle={{ fontSize: "11px" }} />
                          <Area type="monotone" dataKey="impressões" stroke="hsl(var(--primary))" fill="url(#impressionsGrad)" strokeWidth={2} />
                          <Area type="monotone" dataKey="cliques" stroke="hsl(var(--chart-2))" fill="url(#clicksGrad)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" /> Conversões & Gasto Diário
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} interval="preserveStartEnd" />
                          <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                          <Legend wrapperStyle={{ fontSize: "11px" }} />
                          <Line type="monotone" dataKey="conversões" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="gasto" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const MetricCard = ({ icon: Icon, label, value, accent }: { icon: typeof Eye; label: string; value: string; accent?: boolean }) => (
  <Card className={accent ? "border-primary/30" : ""}>
    <CardContent className="p-4 space-y-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className={`text-lg font-semibold ${accent ? "text-primary" : "text-foreground"}`}>{value}</p>
    </CardContent>
  </Card>
);

export default AdDetailPage;
