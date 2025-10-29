import ClienteCadastroForm from "@/components/cliente-cadastro-form"

export const metadata = {
  title: "Seja Cliente | ConexãoNet",
  description: "Preencha o formulário e torne-se cliente ConexãoNet. Internet de fibra óptica em Padre Paraíso/MG.",
}

export default function SerClientePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Seja Cliente ConexãoNet</h1>
          <p className="text-lg text-muted-foreground">
            Preencha o formulário abaixo e nossa equipe entrará em contato para finalizar sua assinatura.
          </p>
        </div>
        <ClienteCadastroForm />
      </div>
    </main>
  )
}
