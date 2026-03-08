import { useState, useMemo } from "react";
import { ExternalLink, Filter, TrendingUp, Eye, MousePointerClick, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { mockAds, funnelStageLabels, statusLabels } from "@/lib/mock-data";

const statusColor: Record<string, string> = {
  active: "bg-success/15 text-success border-success/20",
  paused: "bg-warning/15 text-warning border-warning/20",
  ended: "bg-muted text-muted-foreground border-border",
};

const funnelColor: Record<string, string> = {
  topo: "bg-info/15 text-info border-info/20",
  meio: "bg-primary/15 text-primary border-primary/20",
  fundo: "bg-success/15 text-success border-success/20",
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [funnelFilter, setFunnelFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredAds = useMemo(() => {
    return mockAds.filter((ad) => {
      const matchSearch = ad.name.toLowerCase().includes(search.toLowerCase()) ||
        ad.campaign.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || ad.status === statusFilter;
      const matchFunnel = funnelFilter === "all" || ad.funnelStage === funnelFilter;
      const matchDateFrom = !dateFrom || ad.startDate >= dateFrom;
      const matchDateTo = !dateTo || ad.startDate <= dateTo;
      return matchSearch && matchStatus && matchFunnel && matchDateFrom && matchDateTo;
    });
  }, [search, statusFilter, funnelFilter, dateFrom, dateTo]);

  const activeCount = mockAds.filter((a) => a.status === "active").length;
  const totalSpend = mockAds.reduce((s, a) => s + a.spend, 0);
  const totalConversions = mockAds.reduce((s, a) => s + a.conversions, 0);
  const totalClicks = mockAds.reduce((s, a) => s + a.clicks, 0);

  const stats = [
    { label: "Anúncios Ativos", value: activeCount, icon: TrendingUp },
    { label: "Gasto Total", value: `R$ ${totalSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, icon: DollarSign },
    { label: "Total Cliques", value: totalClicks.toLocaleString("pt-BR"), icon: MousePointerClick },
    { label: "Conversões", value: totalConversions.toLocaleString("pt-BR"), icon: Eye },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-display font-semibold text-foreground">Dashboard</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Filtros</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <Input
                  placeholder="Buscar anúncio ou campanha..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-secondary border-border"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Status</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="paused">Pausado</SelectItem>
                    <SelectItem value="ended">Encerrado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={funnelFilter} onValueChange={setFunnelFilter}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Funil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todo Funil</SelectItem>
                    <SelectItem value="topo">Topo</SelectItem>
                    <SelectItem value="meio">Meio</SelectItem>
                    <SelectItem value="fundo">Fundo</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="bg-secondary border-border" />
                <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="bg-secondary border-border" />
              </div>
            </div>

            {/* Ads Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">Anúncio</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Funil</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">URL de Vendas</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Gasto</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">CTR</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">CPC</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Conversões</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Início</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAds.map((ad, i) => (
                      <tr key={ad.id} className="border-b border-border hover:bg-muted/30 transition-colors animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-foreground">{ad.name}</p>
                            <p className="text-xs text-muted-foreground">{ad.campaign}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={statusColor[ad.status]}>
                            {statusLabels[ad.status]}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={funnelColor[ad.funnelStage]}>
                            {funnelStageLabels[ad.funnelStage]}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <a href={ad.salesPageUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline text-xs">
                            <ExternalLink className="w-3 h-3" /> Ver página
                          </a>
                        </td>
                        <td className="p-3 text-right font-medium text-foreground">
                          R$ {ad.spend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-right text-foreground">{ad.ctr.toFixed(1)}%</td>
                        <td className="p-3 text-right text-foreground">R$ {ad.cpc.toFixed(2)}</td>
                        <td className="p-3 text-right font-medium text-foreground">{ad.conversions}</td>
                        <td className="p-3 text-muted-foreground text-xs">{ad.startDate}</td>
                      </tr>
                    ))}
                    {filteredAds.length === 0 && (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-muted-foreground">
                          Nenhum anúncio encontrado com os filtros aplicados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
