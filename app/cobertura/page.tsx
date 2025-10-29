"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { companyInfo } from "@/config/company"
import { waLink } from "@/lib/whatsapp"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-2xl border border-border bg-surface">
      <p className="text-textMuted">Carregando mapa...</p>
    </div>
  ),
})

const neighborhoods = [
  "Bela Vista",
  "Bom Jesus",
  "Caldeirões",
  "Centro",
  "Coronel Olinto Vieira",
  "DNER",
  "João de Lino",
  "Pantanal",
  "Valmira Farias",
  "Vila Oeste",
  "Vila Vieira",
]

export default function CoberturaPage() {
  const [cep, setCep] = useState("")
  const [checkResult, setCheckResult] = useState<"available" | "unavailable" | null>(null)

  const handleCheckCoverage = () => {
    const cleanCep = cep.replace(/\D/g, "")

    // CEPs de Padre Paraíso: 39818-000 a 39818-999
    if (cleanCep.startsWith("39818")) {
      setCheckResult("available")
    } else {
      setCheckResult("unavailable")
    }
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 8) value = value.slice(0, 8)
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5)
    }
    setCep(value)
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">Área de Cobertura</h1>
          <p className="text-lg text-textMuted">Verifique se a ConexãoNet está disponível no seu endereço</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-2xl border border-border bg-surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <h2 className="text-xl font-semibold">Verificar disponibilidade</h2>
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite seu CEP (ex: 39818-000)"
                value={cep}
                onChange={handleCepChange}
                className="flex-1"
                maxLength={9}
              />
              <Button
                onClick={handleCheckCoverage}
                className="rounded-3xl"
                disabled={cep.replace(/\D/g, "").length !== 8}
              >
                <span className="mr-2">🔍</span>
                Verificar
              </Button>
            </div>

            {checkResult === "available" && (
              <div className="mt-4 rounded-lg border border-brand/20 bg-brand/10 p-4">
                <p className="mb-3 font-semibold text-brand">✅ Ótima notícia! Atendemos sua região!</p>
                <p className="mb-3 text-sm text-textMuted">
                  A ConexãoNet está disponível no seu endereço. Entre em contato para contratar.
                </p>
                <Button asChild className="rounded-3xl">
                  <a
                    href={waLink(
                      "Olá! Vi que vocês atendem minha região (CEP: " +
                        cep +
                        "). Gostaria de contratar um plano de internet.",
                      "cobertura-disponivel",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2">💬</span>
                    Contratar agora
                  </a>
                </Button>
              </div>
            )}

            {checkResult === "unavailable" && (
              <div className="mt-4 rounded-lg border border-border bg-background p-4">
                <p className="mb-3 font-semibold text-textMuted">Ainda não chegamos no seu endereço</p>
                <p className="mb-3 text-sm text-textMuted">
                  Estamos expandindo nossa rede! Deixe seu contato que avisaremos quando chegarmos na sua região.
                </p>
                <Button asChild variant="outline" className="rounded-3xl bg-transparent">
                  <a
                    href={waLink(
                      "Olá! Gostaria de saber quando a ConexãoNet chegará no meu endereço (CEP: " + cep + ").",
                      "cobertura-indisponivel",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2">💬</span>
                    Falar com atendente
                  </a>
                </Button>
              </div>
            )}
          </div>

          <div className="mb-8 rounded-2xl border border-border bg-surface p-6">
            <h3 className="mb-4 text-xl font-semibold">Bairros Atendidos em Padre Paraíso/MG</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {neighborhoods.map((neighborhood) => (
                <div
                  key={neighborhood}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2"
                >
                  <span className="text-brand">✓</span>
                  <span className="text-sm">{neighborhood}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-textMuted">
              Atendemos todos os bairros de Padre Paraíso com internet de fibra óptica de alta qualidade.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-border bg-surface p-6">
            <h3 className="mb-4 text-xl font-semibold">Área de Cobertura</h3>
            <div className="space-y-3 text-textMuted">
              <p>
                <strong className="text-foreground">Atendemos em toda a região de Padre Paraíso/MG</strong>
              </p>
              <p>
                📮 <strong>CEP:</strong> 39818-000
              </p>
              <p className="text-sm">
                Está em dúvida se atendemos seu endereço? Use o verificador acima ou entre em contato conosco pelo
                WhatsApp.
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-border bg-surface p-2">
            <MapComponent />
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="mb-4 text-xl font-semibold">Nossa localização</h3>
            <p className="mb-2 text-textMuted">{companyInfo.address.full}</p>
            <p className="text-sm text-textMuted">
              Atendemos principalmente a região central de Padre Paraíso e bairros adjacentes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
