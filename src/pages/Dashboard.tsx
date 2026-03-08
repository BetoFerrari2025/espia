import { useState, useMemo } from "react";
import { Search, Settings, Calendar, SlidersHorizontal, ChevronLeft, ChevronRight, Facebook, RefreshCw, Loader2, Eye, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { mockAds, Ad } from "@/lib/mock-data";
import { Slider } from "@/components/ui/slider";
import AdCard from "@/components/AdCard";
import { useFacebookAds, useTriggerFetch, FacebookAd } from "@/hooks/useFacebookAds";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 8;

const Dashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: facebookAds, isLoading: loadingAds } = useFacebookAds();
  const { triggerFetch } = useTriggerFetch();
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [funnelFilter, setFunnelFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [adTypeFilter, setAdTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minDays, setMinDays] = useState(0);
  const [maxDays, setMaxDays] = useState(365);
  const [minAds, setMinAds] = useState(0);
  const [maxAds, setMaxAds] = useState(200);
  const [dataSource, setDataSource] = useState<"all" | "facebook" | "mock">("all");
  const [minImpressions, setMinImpressions] = useState(0);
  const [maxImpressions, setMaxImpressions] = useState(10000000);
  const [minSpend, setMinSpend] = useState(0);
  const [maxSpend, setMaxSpend] = useState(100000);

  // Convert Facebook ads to Ad format for the existing AdCard
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
      cpc: fb.spend_upper > 0 ? fb.spend_upper / Math.max(1, ((fb.impressions_upper) * 0.03)) : 0,
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
    }));
  }, [facebookAds]);

  // Combine data sources
  const allAds = useMemo(() => {
    if (dataSource === "facebook") return convertedFbAds;
    if (dataSource === "mock") return mockAds;
    return [...convertedFbAds, ...mockAds];
  }, [convertedFbAds, dataSource]);

  const handleFetchAds = async () => {
    setFetching(true);
    try {
      const result = await triggerFetch(search || undefined);
      toast({
        title: "Busca concluída!",
        description: `${result.fetched} anúncios encontrados e ${result.upserted} salvos.`,
      });
      queryClient.invalidateQueries({ queryKey: ["facebook-ads"] });
    } catch (err: any) {
      toast({
        title: "Erro na busca",
        description: err.message || "Não foi possível buscar anúncios.",
        variant: "destructive",
      });
    }
    setFetching(false);
  };

  const filteredAds = useMemo(() => {
    return allAds.filter((ad) => {
      const matchSearch = ad.name.toLowerCase().includes(search.toLowerCase()) ||
        ad.campaign.toLowerCase().includes(search.toLowerCase()) ||
        ad.advertiser.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || ad.status === statusFilter;
      const matchFunnel = funnelFilter === "all" || ad.funnelStage === funnelFilter;
      const matchPlatform = platformFilter === "all" || ad.platform === platformFilter;
      const matchAdType = adTypeFilter === "all" || ad.adType === adTypeFilter;
      const matchDateFrom = !dateFrom || ad.startDate >= dateFrom;
      const matchDateTo = !dateTo || ad.startDate <= dateTo;
      const matchDays = ad.daysRunning >= minDays && ad.daysRunning <= maxDays;
      const matchAdsCount = ad.activeAdsCount >= minAds && ad.activeAdsCount <= maxAds;
      const matchImpressions = ad.impressions >= minImpressions && ad.impressions <= maxImpressions;
      const matchSpend = ad.spend >= minSpend && ad.spend <= maxSpend;
      return matchSearch && matchStatus && matchFunnel && matchPlatform && matchAdType && matchDateFrom && matchDateTo && matchDays && matchAdsCount && matchImpressions && matchSpend;
    });
  }, [allAds, search, statusFilter, funnelFilter, platformFilter, adTypeFilter, dateFrom, dateTo, minDays, maxDays, minAds, maxAds, minImpressions, maxImpressions, minSpend, maxSpend]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setFunnelFilter("all");
    setPlatformFilter("all");
    setAdTypeFilter("all");
    setDateFrom("");
    setDateTo("");
    setMinDays(0);
    setMaxDays(365);
    setMinAds(0);
    setMaxAds(200);
    setMinImpressions(0);
    setMaxImpressions(10000000);
    setMinSpend(0);
    setMaxSpend(100000);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredAds.length / ITEMS_PER_PAGE);
  const paginatedAds = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAds.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAds, currentPage]);

  // Reset page when filters change
  useMemo(() => { setCurrentPage(1); }, [filteredAds.length]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-14 flex items-center border-b border-border px-4 bg-card gap-3">
            <SidebarTrigger className="mr-2" />
            <div className="flex-1 flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por anúncio, campanha ou anunciante..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-secondary border-border"
                />
              </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFetchAds}
                disabled={fetching}
                className="gap-2 border-border text-muted-foreground"
              >
                {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                {fetching ? "Buscando..." : "Buscar Anúncios"}
              </Button>
              <Select value={dataSource} onValueChange={(v: "all" | "facebook" | "mock") => setDataSource(v)}>
                <SelectTrigger className="w-36 bg-secondary border-border text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="facebook">Facebook API</SelectItem>
                  <SelectItem value="mock">Dados Demo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2 border-border text-muted-foreground">
                <Settings className="w-4 h-4" /> Configurações
              </Button>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Filter Sidebar */}
            <aside className="w-64 border-r border-border bg-card p-4 space-y-5 overflow-y-auto hidden lg:block">
              <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span className="font-display font-semibold text-foreground text-sm">Filtros</span>
              </div>

              {/* Days Running */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Min de Dias Rodando / Max de Dias Rodando</label>
                <div className="flex gap-2">
                  <Input type="number" value={minDays} onChange={(e) => setMinDays(Number(e.target.value))} className="bg-secondary border-border text-xs h-8" placeholder="0" />
                  <Input type="number" value={maxDays} onChange={(e) => setMaxDays(Number(e.target.value))} className="bg-secondary border-border text-xs h-8" placeholder="100" />
                </div>
              </div>

              {/* Nº Ads */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Nº Mín Anúncios / Nº Máx Anúncios</label>
                <div className="flex gap-2">
                  <Input type="number" value={minAds} onChange={(e) => setMinAds(Number(e.target.value))} className="bg-secondary border-border text-xs h-8" placeholder="0" />
                  <Input type="number" value={maxAds} onChange={(e) => setMaxAds(Number(e.target.value))} className="bg-secondary border-border text-xs h-8" placeholder="100" />
                </div>
              </div>

              {/* Slider visual */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Faixa de Anúncios</label>
                <Slider
                  defaultValue={[minAds, maxAds]}
                  max={100}
                  step={1}
                  onValueChange={(v) => { setMinAds(v[0]); setMaxAds(v[1]); }}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{minAds}</span>
                  <span>{maxAds}</span>
                </div>
              </div>

              {/* Impressões */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Impressões
                </label>
                <div className="flex gap-2">
                  <Input type="number" value={minImpressions} onChange={(e) => setMinImpressions(Number(e.target.value))} className="bg-secondary border-border text-xs h-8" placeholder="Mín" />
                  <Input type="number" value={maxImpressions} onChange={(e) => setMaxImpressions(Number(e.target.value))} className="bg-secondary border-border text-xs h-8" placeholder="Máx" />
                </div>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  onValueChange={(v) => { setMinImpressions(v[0] * 100000); setMaxImpressions(v[1] * 100000); }}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{(minImpressions / 1000).toFixed(0)}k</span>
                  <span>{(maxImpressions / 1000).toFixed(0)}k</span>
                </div>
              </div>

              {/* Gasto Estimado */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Gasto Estimado (R$)
                </label>
                <div className="flex gap-2">
                  <Input type="number" value={minSpend} onChange={(e) => setMinSpend(Number(e.target.value))} className="bg-secondary border-border text-xs h-8" placeholder="Mín" />
                  <Input type="number" value={maxSpend} onChange={(e) => setMaxSpend(Number(e.target.value))} className="bg-secondary border-border text-xs h-8" placeholder="Máx" />
                </div>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  onValueChange={(v) => { setMinSpend(v[0] * 1000); setMaxSpend(v[1] * 1000); }}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>R${(minSpend / 1000).toFixed(0)}k</span>
                  <span>R${(maxSpend / 1000).toFixed(0)}k</span>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Data</label>
                <Select value={adTypeFilter} onValueChange={setAdTypeFilter}>
                  <SelectTrigger className="bg-secondary border-border text-xs h-8">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="imagem">Imagem</SelectItem>
                    <SelectItem value="carrossel">Carrossel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-secondary border-border text-xs h-8">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="paused">Pausado</SelectItem>
                    <SelectItem value="ended">Encerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Funil */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Etapa do Funil</label>
                <Select value={funnelFilter} onValueChange={setFunnelFilter}>
                  <SelectTrigger className="bg-secondary border-border text-xs h-8">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="topo">Topo</SelectItem>
                    <SelectItem value="meio">Meio</SelectItem>
                    <SelectItem value="fundo">Fundo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Plataforma */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Plataforma</label>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="bg-secondary border-border text-xs h-8">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={resetFilters} className="flex-1 text-xs border-border">
                  Limpar
                </Button>
                <Button size="sm" className="flex-1 text-xs gradient-gold text-primary-foreground font-semibold hover:opacity-90">
                  Aplicar
                </Button>
              </div>
            </aside>

            {/* Main Content - Card Grid */}
            <main className="flex-1 p-4 md:p-6 overflow-auto">
              {/* Platform Quick Filters */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  {[
                    { value: "all", label: "Todas", icon: null },
                    { value: "facebook", label: "Facebook", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                    { value: "instagram", label: "Instagram", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                    { value: "tiktok", label: "TikTok", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
                  ].map((p) => (
                    <Button
                      key={p.value}
                      variant={platformFilter === p.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPlatformFilter(p.value)}
                      className={
                        platformFilter === p.value
                          ? "gradient-gold text-primary-foreground font-semibold gap-1.5"
                          : "border-border text-muted-foreground gap-1.5"
                      }
                    >
                      {p.icon}
                      {p.label}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredAds.length}</span> anúncios encontrados
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedAds.map((ad, i) => (
                  <AdCard key={ad.id} ad={ad} index={i} />
                ))}
              </div>

              {filteredAds.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Search className="w-10 h-10 mb-3 opacity-40" />
                  <p className="font-medium">Nenhum anúncio encontrado</p>
                  <p className="text-sm">Tente ajustar os filtros</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-border"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={page === currentPage ? "gradient-gold text-primary-foreground font-semibold" : "border-border"}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-border"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
