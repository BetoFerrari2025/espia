import { ExternalLink, Play, Image, Layers, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Ad, statusLabels } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";

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

const AdCard = ({ ad, index }: AdCardProps) => {
  const TypeIcon = adTypeIcon[ad.adType] || Image;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/ad/${ad.id}`)}
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
  );
};

export default AdCard;
