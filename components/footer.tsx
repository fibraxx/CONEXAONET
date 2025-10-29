import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"
import { companyInfo } from "@/config/company"
import { waCTAs } from "@/lib/whatsapp"

export function Footer() {
  const whatsappUrl = waCTAs.generic()

  return (
    <footer className="border-t border-border bg-[#081F3F]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 text-white">
          <div>
            <Image
              src="/images/design-mode/Conex%C3%A3o%20Net%20Logo%20totalmente%20Branco(1).png"
              alt="ConexãoNet"
              width={180}
              height={40}
              className="mb-4 h-8 w-auto"
            />
            <p className="text-sm text-white/70">{companyInfo.slogan}</p>
            <p className="mt-4 text-xs text-white/70">CNPJ: {companyInfo.cnpj}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/planos" className="hover:text-[#FF6A00] transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link href="/cobertura" className="hover:text-[#FF6A00] transition-colors">
                  Cobertura
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="hover:text-[#FF6A00] transition-colors">
                  Suporte
                </Link>
              </li>
              <li>
                <Link href="/conexaotv" className="hover:text-[#FF6A00] transition-colors">
                  ConexãoNetTV
                </Link>
              </li>
              <li>
                <a
                  href={companyInfo.supportPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#FF6A00] transition-colors"
                >
                  Central do Assinante
                  <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">ConexãoNetTV</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={companyInfo.tvApps.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#FF6A00] transition-colors"
                >
                  <span className="text-xs">↗</span>
                  Acessar Web
                </a>
              </li>
              <li>
                <a
                  href={companyInfo.tvApps.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#FF6A00] transition-colors"
                >
                  <span className="text-xs">↗</span>
                  App Android
                </a>
              </li>
              <li>
                <a
                  href={companyInfo.tvApps.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#FF6A00] transition-colors"
                >
                  <span className="text-xs">↗</span>
                  App iOS
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Contato</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span className="text-base">📍</span>
                <span>{companyInfo.address.full}</span>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.contact.phone0800Raw}`}
                  className="flex items-center gap-2 hover:text-[#FF6A00] transition-colors"
                >
                  <span className="text-base">📞</span>
                  {companyInfo.contact.phone0800}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#FF6A00] transition-colors"
                >
                  <span className="text-base">📞</span>
                  {companyInfo.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="flex items-center gap-2 hover:text-[#FF6A00] transition-colors"
                >
                  <span className="text-base">✉️</span>
                  {companyInfo.contact.email}
                </a>
              </li>
              <li className="pt-2">{companyInfo.businessHours.weekdays}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#FF6A00] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#FF6A00] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/70">
          <p className="mb-2">
            Equipamentos fornecidos em regime de comodato. Consulte nossa{" "}
            <Link href="/privacidade" className="hover:text-[#FF6A00] transition-colors">
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
