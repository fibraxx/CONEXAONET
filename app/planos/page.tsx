"use client"

import { PlanCard } from "@/components/plan-card"
import { usePlans } from "@/hooks/use-plans"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PlanosPage() {
  const { plans } = usePlans()

  const faqs = [
    {
      question: "Qual plano é ideal para mim?",
      answer:
        "Para uso básico (navegação e redes sociais), recomendamos 40-100 Mb. Para streaming em HD e home office, 200-500 Mb. Para múltiplos usuários e 4K, 600-750 Mb.",
    },
    {
      question: "Há período de fidelidade?",
      answer:
        "Não exigimos fidelidade em nenhum dos nossos planos. Você tem total liberdade para cancelar quando quiser.",
    },
    {
      question: "O que está incluído no plano?",
      answer:
        "Todos os planos incluem: instalação gratuita, equipamentos Wi-Fi em comodato, suporte técnico humanizado, ConexãoNetTV e ConexãoNetFilmes sem taxa de ativação.",
    },
    {
      question: "Qual equipamento Wi-Fi vou receber?",
      answer:
        "Para planos abaixo de 100MB, oferecemos equipamentos com tecnologia Wi-Fi 2.4G. Para planos acima de 100MB, você recebe equipamentos com tecnologia Wi-Fi 5/6G, que oferecem maior velocidade e melhor desempenho.",
    },
    {
      question: "Posso fazer upgrade do meu plano?",
      answer: "Sim! Você pode fazer upgrade a qualquer momento entrando em contato com nosso suporte.",
    },
    {
      question: "Como funciona o Wi-Fi 6?",
      answer:
        "Wi-Fi 6 é a tecnologia mais recente que oferece maior velocidade, menor latência e melhor desempenho com múltiplos dispositivos conectados simultaneamente.",
    },
    {
      question: "O que significa 'mais de 100% da banda contratada'?",
      answer:
        "Garantimos que você receberá sempre mais do que a velocidade contratada. Se você contratar 200 Mb, por exemplo, receberá no mínimo 200 Mb, podendo chegar a velocidades superiores dependendo da disponibilidade da rede.",
    },
    {
      question: "O que são ConexãoNetTV e ConexãoNetFilmes?",
      answer:
        "São serviços de TV por streaming inclusos em todos os planos de internet. ConexãoNetTV oferece 160+ canais ao vivo e ConexãoNetFilmes disponibiliza catálogo de filmes e séries sob demanda, tudo sem custo adicional.",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">Nossos Planos</h1>
          <p className="text-lg text-textMuted">Escolha o plano perfeito para sua necessidade</p>
          <div className="mt-6 mx-auto max-w-2xl rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/20 p-4">
            <p className="text-[#FF6A00] font-semibold text-lg mb-2">📺 Combo Internet + TV</p>
            <p className="text-sm text-white/80">
              Contrate qualquer um de nossos planos e tenha acesso ao melhor entretenimento
            </p>
          </div>
        </div>

        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Perguntas sobre os planos</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-textMuted">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
