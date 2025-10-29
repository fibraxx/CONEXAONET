"use client"

import { useState, useEffect } from "react"

interface Plan {
  id: string
  name: string
  speed: string
  price: number
  features: string[]
  popular?: boolean
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    // Default plans data
    const defaultPlans: Plan[] = [
      {
        id: "1",
        name: "Básico",
        speed: "40 Mb",
        price: 59.9,
        features: [
          "Mais de 100% da banda contratada",
          "ConexãoNetTV + ConexãoNetFilmes inclusos",
          "Wi-Fi 2.4G em comodato",
          "Instalação gratuita",
          "Suporte técnico",
        ],
      },
      {
        id: "2",
        name: "Intermediário",
        speed: "200 Mb",
        price: 79.9,
        features: [
          "Mais de 100% da banda contratada",
          "ConexãoNetTV + ConexãoNetFilmes inclusos",
          "Wi-Fi 5/6G em comodato",
          "Instalação gratuita",
          "Suporte técnico prioritário",
        ],
        popular: true,
      },
      {
        id: "3",
        name: "Avançado",
        speed: "500 Mb",
        price: 99.9,
        features: [
          "Mais de 100% da banda contratada",
          "ConexãoNetTV + ConexãoNetFilmes inclusos",
          "Wi-Fi 5/6G em comodato",
          "Instalação gratuita",
          "Suporte técnico VIP",
        ],
      },
      {
        id: "4",
        name: "Ultra",
        speed: "750 Mb",
        price: 129.9,
        features: [
          "Mais de 100% da banda contratada",
          "ConexãoNetTV + ConexãoNetFilmes inclusos",
          "Wi-Fi 5/6G em comodato",
          "Instalação gratuita",
          "Suporte técnico VIP 24/7",
        ],
      },
    ]

    setPlans(defaultPlans)
  }, [])

  return { plans }
}
