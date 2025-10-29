"use client"

import { ArrowRight, Wifi, Wrench, Headphones, Zap, CreditCard, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlanCard } from "@/components/plan-card"
import { usePlans } from "@/hooks/use-plans"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { waCTAs } from "@/lib/whatsapp"

export default function HomePage() {
  const { plans } = usePlans()
  const whatsappUrl = waCTAs.generic()

  const differentials = [
    {
      icon: Wifi,
      title: "Wi-Fi 6 incluso",
      description: "Equipamentos de última geração em comodato",
    },
    {
      icon: Wrench,
      title: "Instalação grátis",
      description: "Sem custos de instalação ou ativação",
    },
    {
      icon: Headphones,
      title: "Suporte humanizado",
      description: "Atendimento próximo e personalizado",
    },
    {
      icon: Zap,
      title: "Rede estável",
      description: "Fibra óptica FTTH de alta qualidade",
    },
    {
      icon: CreditCard,
      title: "Pagamento flexível",
      description: "PIX, boleto e outras formas de pagamento",
    },
    {
      icon: Tv,
      title: "ConexãoNetTV + ConexãoNetFilmes",
      description: "160+ canais ao vivo e catálogo de filmes inclusos",
    },
  ]

  const testimonials = [
    {
      name: "Maria S.",
      text: "Melhor internet que já tive! Suporte sempre disponível e atencioso.",
      rating: 5,
    },
    {
      name: "João P.",
      text: "Instalação rápida e internet estável. Recomendo!",
      rating: 5,
    },
    {
      name: "Ana C.",
      text: "Excelente custo-benefício. Não fico mais sem internet.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "Há taxa de instalação?",
      answer: "Não! A instalação é totalmente gratuita para todos os planos.",
    },
    {
      question: "Os equipamentos são meus?",
      answer: "Os equipamentos (ONU e roteador Wi-Fi 6) são fornecidos em regime de comodato, sem custo adicional.",
    },
    {
      question: "Posso levar para outra casa?",
      answer: "Sim, desde que o novo endereço esteja dentro da nossa área de cobertura. Consulte disponibilidade.",
    },
    {
      question: "Como funciona o Wi-Fi 6?",
      answer:
        "Wi-Fi 6 é a tecnologia mais recente, oferecendo maior velocidade, capacidade e eficiência para conectar múltiplos dispositivos simultaneamente.",
    },
    {
      question: "Como falo com o suporte?",
      answer: "Você pode entrar em contato via WhatsApp, telefone ou através da nossa página de Suporte.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden border-b border-border pt-24 pb-20"
        style={{
          background: "radial-gradient(1200px 600px at 20% -10%, rgba(20, 62, 110, 0.2), transparent), #0F1218",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 rounded-full bg-[#FF6A00]/10 px-4 py-1.5 text-[#FF6A00] border border-[#FF6A00]/20">
              Internet de fibra óptica em Padre Paraíso
            </Badge>

            <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Fibra óptica de verdade em <span className="text-[#FF6A00]">Padre Paraíso</span>
            </h1>

            <p className="mb-8 text-pretty text-lg text-textMuted md:text-xl">
              Planos de 40 Mb a 750 Mb com Wi-Fi 6 em comodato e instalação gratuita.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-3xl px-8 bg-[#FF6A00] hover:bg-[#E65F00] text-white">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Assinar no WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-3xl px-8 bg-[#0C2D5A] hover:bg-[#081F3F] text-white border-0"
              >
                <a href="#planos">Ver Planos</a>
              </Button>
            </div>

            <div className="mt-12 grid gap-6 text-sm sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <Headphones className="h-8 w-8 text-[#FF6A00]" />
                <span className="text-muted-foreground">Atendimento humano</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Zap className="h-8 w-8 text-[#FF6A00]" />
                <span className="text-muted-foreground">Rede estável</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Wrench className="h-8 w-8 text-[#FF6A00]" />
                <span className="text-muted-foreground">Suporte rápido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Escolha seu plano</h2>
            <p className="text-lg text-textMuted">Planos residenciais com a melhor velocidade para sua casa</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <ul className="inline-flex flex-col gap-2 text-left text-sm text-textMuted">
              <li>• Instalação gratuita</li>
              <li>• Equipamentos em comodato</li>
              <li>• Suporte técnico humanizado</li>
              <li>• ONU/roteador Wi-Fi 6</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="border-b border-border bg-[#121827] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Por que escolher a ConexãoNet?</h2>
            <p className="text-lg text-white/80">Diferenciais que fazem a diferença no seu dia a dia</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {differentials.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#223049] bg-[#0F1218] p-6 transition-all hover:border-[#FF6A00]"
              >
                <item.icon className="mb-4 h-10 w-10 text-[#FF6A00]" />
                <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">O que nossos clientes dizem</h2>
            <p className="text-lg text-white/80">Depoimentos de quem já é ConexãoNet</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl border border-[#223049] bg-[#121827] p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-[#FF6A00]">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-4 text-white">{testimonial.text}</p>
                <p className="font-semibold text-white">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border bg-[#121827] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-white">Perguntas frequentes</h2>
              <p className="text-lg text-white/80">Tire suas dúvidas sobre nossos serviços</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-white">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-white/70">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#223049] bg-gradient-to-br from-[#FF6A00]/10 to-[#0C2D5A]/10 p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Pronto para ter a melhor internet?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Entre em contato agora e assine o plano ideal para você
            </p>
            <Button asChild size="lg" className="rounded-3xl px-8 bg-[#FF6A00] hover:bg-[#E65F00] text-white">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Falar com atendente
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
