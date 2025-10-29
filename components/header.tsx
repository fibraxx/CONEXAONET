"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { companyInfo } from "@/config/company"
import { waCTAs } from "@/lib/whatsapp"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Planos", href: "/planos" },
    { name: "Cobertura", href: "/cobertura" },
    { name: "Seja Cliente", href: "/ser-cliente" },
    { name: "Suporte", href: "/suporte" },
    { name: "Filmes", href: "/conexaotv" },
    {
      name: "Central do Assinante",
      href: companyInfo.supportPortal,
      external: true,
    },
  ]

  const whatsappUrl = waCTAs.generic()

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-gradient-to-r from-[#081F3F] to-[#0C2D5A] backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/design-mode/Conex%C3%A3o%20Net%20Logo%20Branca%20com%20C%20Laranja(1).png"
            alt="ConexãoNet"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) =>
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.name}
                <span className="text-xs">↗</span>
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ),
          )}
          <Button asChild className="rounded-3xl bg-[#FF6A00] hover:bg-[#E65F00] text-white">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Assinar no WhatsApp
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="icon" variant="ghost" className="rounded-full" aria-label="Ligar para 0800">
            <a href={`tel:${companyInfo.contact.phone0800Raw}`}>
              <span className="text-xl">📞</span>
            </a>
          </Button>
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  <span className="text-xs">↗</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ),
            )}
            <Button asChild className="w-full rounded-3xl bg-[#FF6A00] hover:bg-[#E65F00] text-white">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Assinar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
