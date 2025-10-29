export default function PrivacidadePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-4xl font-bold">Política de Privacidade</h1>

        <div className="space-y-6 text-textMuted">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">1. Coleta de Informações</h2>
            <p>
              A ConexãoNet coleta informações pessoais necessárias para a prestação de serviços de internet, incluindo
              nome, endereço, telefone e e-mail.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">2. Uso das Informações</h2>
            <p>
              As informações coletadas são utilizadas exclusivamente para: prestação de serviços, suporte técnico,
              faturamento e comunicação com o cliente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">3. Equipamentos em Comodato</h2>
            <p>
              Os equipamentos fornecidos (ONU e roteador Wi-Fi 6) permanecem como propriedade da ConexãoNet e devem ser
              devolvidos em caso de cancelamento do serviço.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">4. Proteção de Dados</h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado,
              alteração ou divulgação.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">5. Contato</h2>
            <p>
              Para questões sobre privacidade, entre em contato através do e-mail conexaonet.pp@gmail.com ou telefone
              (33) 98410-4073.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
