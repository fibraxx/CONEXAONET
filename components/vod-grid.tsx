"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { VodItem } from "@/lib/types/cdntv"
import { companyInfo } from "@/config/company"

interface VodGridProps {
  items: VodItem[]
}

const categories = [
  { id: "all", label: "Todos" },
  { id: "movie", label: "Filmes" },
  { id: "tv", label: "Séries" },
  { id: "kids", label: "Infantil" },
  { id: "doc", label: "Documentários" },
]

export function VodGrid({ items }: VodGridProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.kind === selectedCategory
    return matchesSearch && matchesCategory
  })

  const whatsappUrl = `https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent(
    "Olá! Gostaria de saber mais sobre o catálogo ConexãoNetTV.",
  )}`

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted">🔍</span>
          <Input
            type="text"
            placeholder="Buscar título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg border border-border bg-surface transition-all hover:border-brand hover:shadow-lg"
          >
            <div className="aspect-[2/3] overflow-hidden">
              <Image
                src={item.poster || "/placeholder.svg"}
                alt={item.title}
                width={300}
                height={450}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="mb-2 text-sm font-semibold line-clamp-2">{item.title}</h3>
                <Button asChild size="sm" className="w-full">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <span className="mr-2">💬</span>
                    Falar com atendente
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-12 text-center text-textMuted">Nenhum título encontrado com os filtros selecionados.</div>
      )}
    </div>
  )
}
