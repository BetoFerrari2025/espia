import { ExternalLink, Play, Image, Layers, Eye, DollarSign, MousePointerClick, BarChart3, Target, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Ad, statusLabels } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

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

interface AdCardProps {
  ad: Ad;
  index: number;
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const generateChartData = (ad: Ad) => {
  const days = Math.min(ad.daysRunning, 30);
  const data = [];
  for (let i = 0; i < days; i++) {
    const progress = (i + 1) / days;
    const noise = () => 0.7 + Math.random() * 0.6;
    data.push({
      day: `D${i + 1}`,
      impressões: Math.round((ad.impressions / days) * noise()),
      cliques: Math.round((ad.clicks / days) * noise()),
      conversões: Math.round((ad.conversions / days) * noise()),
    });
  }
  return data;
};

const formatNumber = (value: number) => value.toLocaleString("pt-BR");

const AdCard = ({ ad, index }: AdCardProps) => {
  const TypeIcon = adTypeIcon[ad.adType] || Image;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-200 animate-fade-in group cursor-pointer"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div className="relative aspect-[4/5] bg-muted overflow-hidden">
          <img
            src={ad.thumbnailUrl}
            alt={ad.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="outline" className={statusColor[ad.status] + " text-[10px] backdrop-blur-sm"}>
              {statusLabels[ad.status]}
            </Badge>
          </div>
          {ad.adType === "video" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
              </div>
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded px-1.5 py-0.5">
            <TypeIcon className="w-3 h-3 text-foreground" />
            <span className="text-[10px] font-medium text-foreground">{ad.adType === "video" ? "0:30" : ad.adType}</span>
          </div>
        </div>

        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {ad.activeAdsCount} Anúncios utilizam este criativo
            </span>
          </div>
          <div className="text-[11px] text-muted-foreground">
            {ad.daysRunning} Dias ativo
          </div>
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
          <div className="flex items-center gap-2 pt-1 border-t border-border">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
              {ad.advertiser.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{ad.advertiser}</p>
              <p className="text-[10px] text-muted-foreground truncate">{ad.name}</p>
            </div>
          </div>
          <a
            href={ad.salesPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[11px] text-primary hover:underline mt-1"
          >
            <ExternalLink className="w-3 h-3" /> Ver página de vendas
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg">{ad.name}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            {/* Thumbnail */}
            <div className="sm:w-48 shrink-0">
              <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden">
                <img src={ad.thumbnailUrl} alt={ad.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className={statusColor[ad.status] + " text-[10px] backdrop-blur-sm"}>
                    {statusLabels[ad.status]}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              {/* Advertiser */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {ad.advertiser.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{ad.advertiser}</p>
                  <p className="text-xs text-muted-foreground">{ad.campaign}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">{ad.platform}</Badge>
                <Badge variant="secondary" className="text-xs">{ad.adType}</Badge>
                <Badge variant="secondary" className="text-xs">{ad.funnelStage === "topo" ? "Topo de Funil" : ad.funnelStage === "meio" ? "Meio de Funil" : "Fundo de Funil"}</Badge>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <MetricCard icon={DollarSign} label="Gasto Total" value={formatCurrency(ad.spend)} />
                <MetricCard icon={Eye} label="Impressões" value={formatNumber(ad.impressions)} />
                <MetricCard icon={MousePointerClick} label="Cliques" value={formatNumber(ad.clicks)} />
                <MetricCard icon={Target} label="Conversões" value={formatNumber(ad.conversions)} />
                <MetricCard icon={BarChart3} label="CTR" value={`${ad.ctr.toFixed(1)}%`} />
                <MetricCard icon={DollarSign} label="CPC" value={formatCurrency(ad.cpc)} />
              </div>

              {/* Dates & extra */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Início: {ad.startDate}</span>
                  {ad.endDate && <span>· Fim: {ad.endDate}</span>}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{ad.activeAdsCount} anúncios utilizam este criativo · {ad.daysRunning} dias ativo</span>
                </div>
              </div>

              {/* Sales page */}
              <a
                href={ad.salesPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
              >
                <ExternalLink className="w-4 h-4" /> Ver página de vendas
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const MetricCard = ({ icon: Icon, label, value }: { icon: typeof Eye; label: string; value: string }) => (
  <div className="bg-secondary/50 rounded-lg p-3 space-y-1">
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[11px]">{label}</span>
    </div>
    <p className="text-sm font-semibold text-foreground">{value}</p>
  </div>
);

export default AdCard;
