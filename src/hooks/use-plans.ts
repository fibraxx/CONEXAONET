"use client"

import { useState, useEffect } from "react"
import plansData from "@/data/plans.json"

export interface Plan {
  id: string
  speed: string
  price: string
  badge: string | null
  features: string[]
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    setPlans(plansData.plans)
  }, [])

  return { plans }
}
