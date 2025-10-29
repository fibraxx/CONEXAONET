"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Channel } from "@/lib/types/cdntv"

interface ChannelGridProps {
  channels: Channel[]
}

const genres = ["Todos", "Abertos", "Notícias", "Esportes", "Filmes", "Kids", "Música"]

export function ChannelGrid({ channels }: ChannelGridProps) {
  const [search, setSearch] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("Todos")

  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = channel.name.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = selectedGenre === "Todos" || channel.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted">🔍</span>
          <Input
            type="text"
            placeholder="Buscar canal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-surface p-4 transition-all hover:border-brand hover:shadow-lg"
          >
            <div className="flex h-full items-center justify-center">
              <Image
                src={channel.logo || "/placeholder.svg"}
                alt={channel.name}
                width={120}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background/95 to-transparent p-2 transition-transform group-hover:translate-y-0">
              <p className="text-center text-sm font-medium">{channel.name}</p>
              {channel.genre && <p className="text-center text-xs text-textMuted">{channel.genre}</p>}
            </div>
          </div>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <div className="py-12 text-center text-textMuted">Nenhum canal encontrado com os filtros selecionados.</div>
      )}
    </div>
  )
}
