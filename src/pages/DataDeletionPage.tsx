import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const DataDeletionPage = () => {
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
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Exclusão de Dados</h1>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">1. Seu Direito à Exclusão</h2>
            <p>Em conformidade com a LGPD (Lei Geral de Proteção de Dados) e GDPR, você tem o direito de solicitar a exclusão completa de seus dados pessoais armazenados em nossa plataforma.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">2. Como Solicitar a Exclusão</h2>
            <p>Para solicitar a exclusão dos seus dados, você pode:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enviar um e-mail para <strong>privacidade@adspy.com</strong> com o assunto "Exclusão de Dados"</li>
              <li>Utilizar a opção "Excluir minha conta" nas configurações do seu perfil</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">3. Dados que Serão Excluídos</h2>
            <p>Ao solicitar a exclusão, removeremos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dados de perfil (nome, e-mail, avatar)</li>
              <li>Histórico de pesquisas e favoritos</li>
              <li>Dados de autenticação</li>
              <li>Qualquer informação pessoal associada à sua conta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">4. Prazo para Exclusão</h2>
            <p>Após a solicitação, seus dados serão completamente excluídos em até 30 dias úteis. Você receberá uma confirmação por e-mail quando o processo for concluído.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground">5. Dados Retidos por Obrigação Legal</h2>
            <p>Alguns dados podem ser retidos por períodos específicos conforme exigido por lei, como registros de transações financeiras.</p>
          </section>

          <p className="text-xs text-muted-foreground pt-4">Última atualização: Março de 2026</p>
        </div>
      </main>
    </div>
  );
};

export default DataDeletionPage;
