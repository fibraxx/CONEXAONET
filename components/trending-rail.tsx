"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import type { TrendingItem } from "@/lib/types/cdntv"
import { companyInfo } from "@/config/company"

interface TrendingRailProps {
  title: string
  items: TrendingItem[]
}

export function TrendingRail({ title, items }: TrendingRailProps) {
  const [selectedItem, setSelectedItem] = useState<TrendingItem | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`rail-${title}`)
    if (!container) return

    const scrollAmount = 300
    const newPosition =
      direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

    container.scrollTo({ left: newPosition, behavior: "smooth" })
    setScrollPosition(newPosition)
  }

  const whatsappUrl = `https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent(
    "Olá! Gostaria de saber mais sobre o catálogo ConexãoNetTV.",
  )}`

  if (items.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll("left")} disabled={scrollPosition === 0}>
            <span>←</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll("right")}>
            <span>→</span>
          </Button>
        </div>
      </div>

      <div
        id={`rail-${title}`}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative min-w-[150px] cursor-pointer overflow-hidden rounded-lg border border-border bg-surface transition-all hover:border-brand hover:shadow-lg sm:min-w-[200px]"
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-[2/3] overflow-hidden">
              <Image
                src={
                  item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/abstract-movie-poster.png"
                }
                alt={item.title || item.name || "Título"}
                width={300}
                height={450}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-3">
              <p className="text-sm font-semibold line-clamp-2">{item.title || item.name}</p>
              {item.vote_average > 0 && (
                <div className="mt-1 flex items-center gap-1 text-xs text-brand">
                  <span>⭐</span>
                  <span>{item.vote_average.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          {selectedItem && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedItem.title || selectedItem.name}</SheetTitle>
                <SheetDescription>
                  {selectedItem.release_date || selectedItem.first_air_date
                    ? new Date(selectedItem.release_date || selectedItem.first_air_date || "").getFullYear()
                    : ""}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {selectedItem.poster_path && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${selectedItem.backdrop_path || selectedItem.poster_path}`}
                      alt={selectedItem.title || selectedItem.name || ""}
                      width={500}
                      height={281}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                {selectedItem.vote_average > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-brand text-xl">⭐</span>
                    <span className="text-lg font-semibold">{selectedItem.vote_average.toFixed(1)}</span>
                    <span className="text-sm text-textMuted">/ 10</span>
                  </div>
                )}
                <p className="text-textMuted">{selectedItem.overview}</p>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <span className="mr-2">💬</span>
                      Falar com atendente
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <a href="/planos">Ver planos</a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
