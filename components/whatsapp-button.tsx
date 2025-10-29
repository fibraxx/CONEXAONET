"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { companyInfo } from "@/config/company"

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent(companyInfo.contact.whatsappMessage)}`

  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full p-0 shadow-lg hover:scale-110 transition-transform"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
        <MessageCircle className="h-6 w-6" />
      </a>
    </Button>
  )
}
