import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { companyInfo } from "@/config/company"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL(companyInfo.siteUrl),
  title: "ConexãoNet — Fibra Óptica",
  description: "Internet rápida, estável e com atendimento humano.",
  keywords: "internet fibra óptica, Padre Paraíso, MG, internet rápida, Wi-Fi 6",
  openGraph: {
    url: companyInfo.siteUrl,
    siteName: "ConexãoNet — Fibra Óptica",
    title: "ConexãoNet — Fibra Óptica",
    description: "Internet rápida, estável e com atendimento humano.",
    type: "website",
    locale: "pt_BR",
  },
  alternates: {
    canonical: "/",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.name,
    url: companyInfo.siteUrl,
    telephone: "+55-800-323-1000",
    email: companyInfo.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Araçuaí, 128",
      addressLocality: "Padre Paraíso",
      addressRegion: "MG",
      postalCode: "",
      addressCountry: "BR",
    },
    sameAs: [companyInfo.social.facebook, companyInfo.social.instagram],
  }

  return (
    <html lang="pt-BR" className={`dark ${inter.variable} ${poppins.variable}`}>
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Conex%C3%A3o%20Net%20Logo%20C%20Laranja-zPaJlfHQn1ZBT1RM1Byqk8dALIniwf.png"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
