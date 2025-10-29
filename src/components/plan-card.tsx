import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { companyInfo } from "@/config/company"
import type { Plan } from "@/hooks/use-plans"

interface PlanCardProps {
  plan: Plan
}

export function PlanCard({ plan }: PlanCardProps) {
  const whatsappUrl = `https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent(`Olá, gostaria de assinar o plano de ${plan.speed} Mb.`)}`

  return (
    <Card className="relative overflow-hidden rounded-2xl border-border bg-surface p-6 transition-all hover:border-brand">
      {plan.badge && <Badge className="absolute right-4 top-4 bg-brand text-white">{plan.badge}</Badge>}

      <div className="mb-4">
        <div className="text-4xl font-bold text-brand">{plan.speed} Mb</div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-bold">R$ {plan.price}</span>
          <span className="text-textMuted">/mês</span>
        </div>
      </div>

      <ul className="mb-6 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
            <span className="text-textMuted">{feature}</span>
          </li>
        ))}
      </ul>

      <Button asChild className="w-full rounded-3xl">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          Assinar Plano
        </a>
      </Button>
    </Card>
  )
}
