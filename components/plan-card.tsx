import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { waCTAs } from "@/lib/whatsapp"

interface Plan {
  id: string
  name: string
  speed: string
  price: number
  features: string[]
  popular?: boolean
  recommended?: boolean
}

interface PlanCardProps {
  plan: Plan
}

export function PlanCard({ plan }: PlanCardProps) {
  const getWhatsAppUrl = () => {
    switch (plan.id) {
      case "40mb":
        return waCTAs.plan40()
      case "100mb":
        return waCTAs.plan100()
      case "200mb":
        return waCTAs.plan200()
      case "500mb":
        return waCTAs.plan500()
      case "600mb":
        return waCTAs.plan600()
      case "750mb":
        return waCTAs.plan750()
      default:
        return waCTAs.generic()
    }
  }

  const whatsappUrl = getWhatsAppUrl()

  return (
    <Card
      className={`relative ${plan.popular ? "border-[#FF6A00] shadow-[0_0_0_1px_#FF6A00]" : ""} ${plan.recommended ? "border-[#0C2D5A]" : ""}`}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6A00] text-white border-0">
          Mais escolhido
        </Badge>
      )}
      {plan.recommended && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-transparent border-[#0C2D5A] text-[#0C2D5A]">
          Recomendado
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription className="text-3xl font-bold text-foreground">
          R$ {plan.price}
          <span className="text-base font-normal text-muted-foreground">/mês</span>
        </CardDescription>
        <p className="text-sm text-muted-foreground">{plan.speed}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 shrink-0 text-[#FF6A00]" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className={`w-full rounded-3xl ${plan.popular || plan.recommended ? "bg-[#FF6A00] hover:bg-[#E65F00] text-white" : "bg-[#0C2D5A] hover:bg-[#081F3F] text-white"}`}
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Assinar agora
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
