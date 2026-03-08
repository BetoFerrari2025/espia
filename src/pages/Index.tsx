import { useNavigate, Link } from "react-router-dom";
import { Zap, BarChart3, Search, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const steps = [
    { title: "Acesse o Banco de Anúncios", desc: "Entre na biblioteca mais completa de anúncios atualizados das principais plataformas de mídia paga" },
    { title: "Acesse o Banco de Anúncios", desc: "Entre na biblioteca mais completa de anúncios atualizados das principais plataformas de mídia paga" },
    { title: "Acesse o Banco de Anúncios", desc: "Entre na biblioteca mais completa de anúncios atualizados das principais plataformas de mídia paga" },
    { title: "Acesse o Banco de Anúncios", desc: "Entre na biblioteca mais completa de anúncios atualizados das principais plataformas de mídia paga" },
    { title: "Acesse o Banco de Anúncios", desc: "Entre na biblioteca mais completa de anúncios atualizados das principais plataformas de mídia paga" },
  ];

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

      {/* How it works */}
      <section className="container mx-auto px-4 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-card">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-foreground text-sm">Como Funciona</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-8">
            Do zero aos resultados em{" "}
            <span className="text-gradient-gold">5 Passos Simples</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-display font-semibold text-primary mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
            {/* CTA card */}
            <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="gradient-gold text-primary-foreground font-bold text-base px-8 hover:opacity-90 transition-opacity"
              >
                Começar Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Search, title: "Espionagem Completa", desc: "Acesse anúncios ativos e descubra os criativos que mais convertem" },
            { icon: Target, title: "Funil Completo", desc: "Visualize topo, meio e fundo de funil de cada campanha" },
            { icon: BarChart3, title: "Métricas Detalhadas", desc: "CTR, CPC, conversões e gastos em tempo real" },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
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

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-gold flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-display font-bold text-gradient-gold">AdSpy</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/termos" className="hover:text-foreground transition-colors">Termos de Uso</Link>
            <Link to="/exclusao-dados" className="hover:text-foreground transition-colors">Exclusão de Dados</Link>
            <Link to="/privacidade" className="hover:text-foreground transition-colors">Políticas de Privacidade</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AdSpy. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
