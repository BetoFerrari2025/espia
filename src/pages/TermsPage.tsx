import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-gradient-gold">AdSpy</span>
          </div>
          <Button variant="ghost" onClick={() => navigate(-1 as any)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Termos de Uso</h1>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar a plataforma AdSpy, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">2. Descrição do Serviço</h2>
            <p>O AdSpy é uma plataforma de espionagem e análise de anúncios de mídia paga, permitindo que os usuários visualizem e analisem anúncios públicos veiculados em plataformas como Facebook e Instagram.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">3. Uso Permitido</h2>
            <p>Você concorda em utilizar o serviço apenas para fins legais e de acordo com todas as leis e regulamentos aplicáveis. É proibido utilizar as informações obtidas para práticas ilegais, difamatórias ou que violem direitos de terceiros.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">4. Conta do Usuário</h2>
            <p>Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">5. Propriedade Intelectual</h2>
            <p>Todo o conteúdo, design e funcionalidades da plataforma são de propriedade do AdSpy e protegidos por leis de propriedade intelectual.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">6. Limitação de Responsabilidade</h2>
            <p>O AdSpy não se responsabiliza por decisões tomadas com base nas informações obtidas através da plataforma. Os dados são fornecidos "como estão" sem garantias de precisão absoluta.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">7. Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.</p>
          </section>

          <p className="text-xs text-muted-foreground pt-4">Última atualização: Março de 2026</p>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
