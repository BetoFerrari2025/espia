import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPage = () => {
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
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Políticas de Privacidade</h1>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">1. Informações que Coletamos</h2>
            <p>Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail e dados de perfil ao criar uma conta. Também coletamos dados de uso da plataforma automaticamente.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">2. Como Usamos suas Informações</h2>
            <p>Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Personalizar sua experiência na plataforma</li>
              <li>Enviar comunicações importantes sobre o serviço</li>
              <li>Garantir a segurança da sua conta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">3. Compartilhamento de Dados</h2>
            <p>Não vendemos seus dados pessoais a terceiros. Podemos compartilhar informações apenas com provedores de serviço essenciais para o funcionamento da plataforma, sempre sob acordos de confidencialidade.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">4. Segurança dos Dados</h2>
            <p>Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">5. Cookies</h2>
            <p>Utilizamos cookies e tecnologias semelhantes para melhorar a experiência de navegação, analisar o tráfego e personalizar conteúdo.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">6. Seus Direitos (LGPD)</h2>
            <p>Conforme a LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Solicitar a portabilidade dos seus dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">7. Contato</h2>
            <p>Para questões sobre privacidade, entre em contato pelo e-mail: <strong>privacidade@adspy.com</strong></p>
          </section>

          <p className="text-xs text-muted-foreground pt-4">Última atualização: Março de 2026</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
