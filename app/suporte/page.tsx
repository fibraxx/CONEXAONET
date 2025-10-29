"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MessageCircle, FileText, Gauge, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { companyInfo } from "@/config/company"
import { useBusinessHours } from "@/hooks/use-business-hours"

export default function SuportePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  })
  const { isOpen } = useBusinessHours()

  const whatsappUrl = `https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent(companyInfo.contact.whatsappMessage)}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoUrl = `mailto:${companyInfo.contact.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nome: ${formData.name}\nTelefone: ${formData.phone}\n\n${formData.message}`)}`
    window.location.href = mailtoUrl

    const whatsappMessage = `Olá, meu nome é ${formData.name}. ${formData.message}`
    window.open(`https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
  }

  const supportCards = [
    {
      icon: Phone,
      title: "0800-323-1000",
      description: "Ligue gratuitamente de qualquer telefone",
      action: "Ligar agora",
      href: `tel:${companyInfo.contact.phone0800Raw}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: companyInfo.contact.phone,
      action: "Abrir WhatsApp",
      href: whatsappUrl,
      external: true,
    },
    {
      icon: Mail,
      title: "E-mail",
      description: companyInfo.contact.email,
      action: "Enviar e-mail",
      href: `mailto:${companyInfo.contact.email}`,
    },
    {
      icon: ExternalLink,
      title: "Central do Assinante",
      description: "2ª via de boleto, suporte técnico e mais",
      action: "Acessar Central",
      href: companyInfo.supportPortal,
      external: true,
    },
    {
      icon: FileText,
      title: "2ª Via de Boleto",
      description: "Solicite via WhatsApp ou Central",
      action: "Solicitar",
      href: whatsappUrl,
      external: true,
    },
    {
      icon: Gauge,
      title: "Teste de Velocidade",
      description: "Verifique a velocidade da sua internet",
      action: "Testar agora",
      href: "https://fast.com",
      external: true,
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">Suporte & Contato</h1>
          <p className="text-lg text-textMuted">Estamos aqui para ajudar você</p>
          <div className="mt-4">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm ${
                isOpen ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
              {isOpen ? "Aberta agora" : "Fechada"}
            </span>
          </div>
          <p className="mt-2 text-sm text-textMuted">{companyInfo.businessHours.weekdays}</p>
        </div>

        <div className="mb-12 mx-auto max-w-4xl">
          <Card className="rounded-2xl border-2 border-[#FF6A00] bg-gradient-to-br from-[#0C2D5A] to-[#0C2D5A]/80 p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#FF6A00] text-white text-xs font-bold px-3 py-1 rounded-full">
              VIP
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-3">Suporte Técnico VIP 24/7</h2>
              <p className="text-white/90 text-lg mb-2">Para Empresas</p>
              <p className="text-white/70 mb-6">
                Atendimento prioritário, suporte técnico especializado disponível 24 horas por dia, 7 dias por semana.
                Ideal para empresas que precisam de disponibilidade total.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-white rounded-3xl">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Solicitar Suporte VIP
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-3xl bg-transparent"
                >
                  <a href={`mailto:${companyInfo.contact.email}?subject=Suporte VIP para Empresas`}>Mais Informações</a>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {supportCards.map((card, index) => (
            <Card key={index} className="rounded-2xl border-border bg-surface p-6">
              <card.icon className="mb-4 h-10 w-10 text-brand" />
              <h3 className="mb-2 text-xl font-semibold text-foreground">{card.title}</h3>
              <p className="mb-4 text-sm text-textMuted">{card.description}</p>
              <Button asChild variant="outline" className="w-full rounded-3xl bg-transparent">
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                >
                  {card.action}
                </a>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <Card className="rounded-2xl border-border bg-surface p-8">
            <h2 className="mb-6 text-2xl font-bold text-center text-foreground">Siga nas Redes Sociais</h2>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" className="rounded-3xl bg-transparent">
                <a
                  href={companyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Facebook
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-3xl bg-transparent">
                <a
                  href={companyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Instagram
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="rounded-2xl border-border bg-surface p-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Envie uma mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Nome completo
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                  Telefone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                  Assunto
                </label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Como podemos ajudar?"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Descreva sua solicitação..."
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full rounded-3xl">
                Enviar mensagem
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
