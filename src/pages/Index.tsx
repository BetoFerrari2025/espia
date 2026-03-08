import { useNavigate } from "react-router-dom";
import { Zap, BarChart3, Search, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-gradient-gold">AdSpy</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")} className="text-muted-foreground hover:text-foreground">
              Entrar
            </Button>
            <Button onClick={() => navigate("/login")} className="gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-primary">🔥 Biblioteca de Anúncios Escalados</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground max-w-3xl mx-auto leading-tight">
          Espie os anúncios que estão{" "}
          <span className="text-gradient-gold">escalando no Facebook</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Descubra funis completos, URLs de vendas, criativos e métricas dos anúncios mais lucrativos do mercado.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="gradient-gold text-primary-foreground font-semibold text-base h-12 px-8 hover:opacity-90 transition-opacity animate-pulse-gold"
          >
            Acessar Biblioteca <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Search, title: "Espionagem Completa", desc: "Acesse anúncios ativos e descubra os criativos que mais convertem" },
            { icon: Target, title: "Funil Completo", desc: "Visualize topo, meio e fundo de funil de cada campanha" },
            { icon: BarChart3, title: "Métricas Detalhadas", desc: "CTR, CPC, conversões e gastos em tempo real" },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
