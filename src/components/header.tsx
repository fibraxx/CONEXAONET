"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { companyInfo } from "@/config/company"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Planos", href: "/planos" },
    { name: "Cobertura", href: "/cobertura" },
    { name: "Suporte", href: "/suporte" },
    { name: "Filmes", href: "/filmes" },
  ]

  const whatsappUrl = `https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent(companyInfo.contact.whatsappMessage)}`

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/design-mode/Conex%C3%A3o%20Net%20Logo%20Branca%20com%20C%20Laranja.png"
            alt="ConexãoNet"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="rounded-3xl">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Assinar
            </a>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="w-full rounded-3xl">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Assinar
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
