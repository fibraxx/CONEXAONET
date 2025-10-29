"use client"

import { useState, useEffect } from "react"
import { companyInfo } from "@/config/company"

export function useBusinessHours() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date()
      const currentDay = now.getDay()
      const currentHour = now.getHours()

      const todaySchedule = companyInfo.businessHours.schedule.find((s) => s.day === currentDay)

      if (!todaySchedule) {
        setIsOpen(false)
        return
      }

      const isWithinHours = todaySchedule.periods.some(
        (period) => currentHour >= period.start && currentHour < period.end,
      )

      setIsOpen(isWithinHours)
    }

    checkBusinessHours()
    const interval = setInterval(checkBusinessHours, 60000)

    return () => clearInterval(interval)
  }, [])

  return { isOpen }
}
