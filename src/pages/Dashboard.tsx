import { useState, useMemo } from "react";
import { Search, Settings, Calendar, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { mockAds } from "@/lib/mock-data";
import { Slider } from "@/components/ui/slider";
import AdCard from "@/components/AdCard";

const ITEMS_PER_PAGE = 8;

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [funnelFilter, setFunnelFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [adTypeFilter, setAdTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minDays, setMinDays] = useState(0);
  const [maxDays, setMaxDays] = useState(100);
  const [minAds, setMinAds] = useState(0);
  const [maxAds, setMaxAds] = useState(100);

  const filteredAds = useMemo(() => {
    return mockAds.filter((ad) => {
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
      return matchSearch && matchStatus && matchFunnel && matchPlatform && matchAdType && matchDateFrom && matchDateTo && matchDays && matchAdsCount;
    });
  }, [search, statusFilter, funnelFilter, platformFilter, adTypeFilter, dateFrom, dateTo, minDays, maxDays, minAds, maxAds]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setFunnelFilter("all");
    setPlatformFilter("all");
    setAdTypeFilter("all");
    setDateFrom("");
    setDateTo("");
    setMinDays(0);
    setMaxDays(100);
    setMinAds(0);
    setMaxAds(100);
  };

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

              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Data</label>
                <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="bg-secondary border-border text-xs h-8" />
                <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="bg-secondary border-border text-xs h-8" />
              </div>

              {/* Tipo de Anúncio */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Tipo de Anúncio</label>
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
              {/* Results header */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredAds.length}</span> anúncios encontrados
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAds.map((ad, i) => {
                  const TypeIcon = adTypeIcon[ad.adType] || Image;
                  return (
                    <div
                      key={ad.id}
                      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-200 animate-fade-in group"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                        <img
                          src={ad.thumbnailUrl}
                          alt={ad.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {/* Type badge */}
                        <div className="absolute top-2 left-2">
                          <Badge variant="outline" className={statusColor[ad.status] + " text-[10px] backdrop-blur-sm"}>
                            {statusLabels[ad.status]}
                          </Badge>
                        </div>
                        {/* Play / type overlay */}
                        {ad.adType === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                              <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                        )}
                        {/* Duration / type indicator */}
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded px-1.5 py-0.5">
                          <TypeIcon className="w-3 h-3 text-foreground" />
                          <span className="text-[10px] font-medium text-foreground">{ad.adType === "video" ? "0:30" : ad.adType}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 space-y-2">
                        {/* Ads count & days */}
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {ad.activeAdsCount} Anúncios utilizam este criativo
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {ad.daysRunning} Dias ativo
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-success inline-block"></span>
                            {ad.startDate}
                          </span>
                          {ad.endDate && (
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block"></span>
                              {ad.endDate}
                            </span>
                          )}
                        </div>

                        {/* Advertiser */}
                        <div className="flex items-center gap-2 pt-1 border-t border-border">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                            {ad.advertiser.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{ad.advertiser}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{ad.name}</p>
                          </div>
                        </div>

                        {/* Sales page link */}
                        <a
                          href={ad.salesPageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] text-primary hover:underline mt-1"
                        >
                          <ExternalLink className="w-3 h-3" /> Ver página de vendas
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredAds.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Search className="w-10 h-10 mb-3 opacity-40" />
                  <p className="font-medium">Nenhum anúncio encontrado</p>
                  <p className="text-sm">Tente ajustar os filtros</p>
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
