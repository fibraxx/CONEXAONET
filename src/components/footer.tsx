import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { companyInfo } from "@/config/company"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/design-mode/Conex%C3%A3o%20Net%20Logo%20totalmente%20Branco.png"
              alt="ConexãoNet"
              width={180}
              height={40}
              className="mb-4 h-8 w-auto"
            />
            <p className="text-sm text-textMuted">{companyInfo.slogan}</p>
            <p className="mt-4 text-xs text-textMuted">CNPJ: {companyInfo.cnpj}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-textMuted">
              <li>
                <Link href="/planos" className="hover:text-foreground">
                  Planos
                </Link>
              </li>
              <li>
                <Link href="/cobertura" className="hover:text-foreground">
                  Cobertura
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="hover:text-foreground">
                  Suporte
                </Link>
              </li>
              <li>
                <Link href="/filmes" className="hover:text-foreground">
                  ConexãoNet Filmes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm text-textMuted">
              <li>{companyInfo.address.full}</li>
              <li>{companyInfo.contact.phone}</li>
              <li>{companyInfo.contact.email}</li>
              <li className="pt-2">{companyInfo.businessHours.weekdays}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Redes Sociais</h3>
            <div className="flex gap-4">
              <a href={companyInfo.social.facebook} className="text-textMuted hover:text-brand" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={companyInfo.social.instagram} className="text-textMuted hover:text-brand" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={companyInfo.social.youtube} className="text-textMuted hover:text-brand" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-textMuted">
          <p className="mb-2">
            Equipamentos fornecidos em regime de comodato. Consulte nossa{" "}
            <Link href="/privacidade" className="hover:text-foreground">
              Política de Privacidade
            </Link>
            .
          </p>
          <p>© {new Date().getFullYear()} ConexãoNet — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
