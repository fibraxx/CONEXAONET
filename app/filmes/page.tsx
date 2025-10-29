import Image from "next/image"
import { Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { companyInfo } from "@/config/company"

export default function FilmesPage() {
  const whatsappUrl = `https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent("Olá, gostaria de saber mais sobre o ConexãoNet Filmes.")}`

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/design-mode/CONE%C3%87%C3%83O-NET-FILMES.png"
              alt="ConexãoNet Filmes"
              width={400}
              height={200}
              className="h-auto w-full max-w-md"
            />
          </div>

          <h1 className="mb-6 text-5xl font-bold">Entretenimento sem limites</h1>

          <p className="mb-8 text-lg text-textMuted">
            Com o ConexãoNet Filmes, você tem acesso a um vasto catálogo de filmes, séries e conteúdo exclusivo.
            Aproveite o melhor do entretenimento com a qualidade e estabilidade da nossa rede de fibra óptica.
          </p>

          <div className="mb-12 grid gap-6 text-left md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <Play className="mb-4 h-10 w-10 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Catálogo Completo</h3>
              <p className="text-textMuted">Milhares de títulos disponíveis para você assistir quando e onde quiser.</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <Play className="mb-4 h-10 w-10 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Qualidade HD/4K</h3>
              <p className="text-textMuted">
                Aproveite seus filmes e séries favoritos com a melhor qualidade de imagem.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <Play className="mb-4 h-10 w-10 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Sem Travamentos</h3>
              <p className="text-textMuted">Nossa rede de fibra óptica garante streaming sem interrupções.</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <Play className="mb-4 h-10 w-10 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Múltiplos Dispositivos</h3>
              <p className="text-textMuted">Assista em TV, computador, tablet ou smartphone simultaneamente.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-gradient-to-br from-brand/10 to-brand/5 p-12">
            <h2 className="mb-4 text-3xl font-bold">Quer saber mais sobre o ConexãoNet Filmes?</h2>
            <p className="mb-6 text-textMuted">
              Fale com um de nossos atendentes e descubra como aproveitar todo o catálogo de entretenimento.
            </p>
            <Button asChild size="lg" className="rounded-3xl px-8">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Falar com atendente
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
