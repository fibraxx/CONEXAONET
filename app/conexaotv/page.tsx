import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChannelGrid } from "@/components/channel-grid"
import { VodGrid } from "@/components/vod-grid"
import { TrendingRail } from "@/components/trending-rail"
import { companyInfo } from "@/config/company"
import channelsData from "@/data/cdntv-channels.json"
import vodData from "@/data/cdntv-vod.json"
import type { TrendingItem } from "@/lib/types/cdntv"

async function getTMDBData(): Promise<{
  trendingMovies: TrendingItem[]
  trendingTV: TrendingItem[]
  nowPlaying: TrendingItem[]
}> {
  // Check if TMDB API key is configured
  if (!process.env.TMDB_API_KEY) {
    return { trendingMovies: [], trendingTV: [], nowPlaying: [] }
  }

  try {
    const baseUrl = "https://api.themoviedb.org/3"
    const apiKey = process.env.TMDB_API_KEY

    const [moviesRes, tvRes, nowPlayingRes] = await Promise.all([
      fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}&language=pt-BR`).catch(() => null),
      fetch(`${baseUrl}/trending/tv/week?api_key=${apiKey}&language=pt-BR`).catch(() => null),
      fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=pt-BR&region=BR`).catch(() => null),
    ])

    const [moviesData, tvData, nowPlayingData] = await Promise.all([
      moviesRes?.ok ? moviesRes.json() : { results: [] },
      tvRes?.ok ? tvRes.json() : { results: [] },
      nowPlayingRes?.ok ? nowPlayingRes.json() : { results: [] },
    ])

    return {
      trendingMovies: moviesData.results || [],
      trendingTV: tvData.results || [],
      nowPlaying: nowPlayingData.results || [],
    }
  } catch (error) {
    console.error("[v0] Error fetching TMDB data:", error)
    return { trendingMovies: [], trendingTV: [], nowPlaying: [] }
  }
}

export default async function ConexaoTVPage() {
  const channels = channelsData.channels
  const vodItems = vodData.items

  const { trendingMovies, trendingTV, nowPlaying } = await getTMDBData()

  const whatsappUrl = `https://wa.me/${companyInfo.contact.phoneRaw}?text=${encodeURIComponent(
    "Olá! Quero assinar a ConexãoNetTV!",
  )}`

  return (
    <div className="min-h-screen">
      <div className="bg-brand/10 border-b border-brand/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-brand">ℹ️</span>
            <span>
              Precisa de 2ª via, boleto ou suporte técnico?{" "}
              <a
                href={companyInfo.supportPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand hover:underline"
              >
                Acesse a Central do Assinante
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-surface pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 rounded-full bg-brand/10 px-4 py-1.5 text-brand">Entretenimento completo</Badge>

            <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              ConexãoNetTV — Canais, filmes e séries fornecidos pela CDNTV
            </h1>

            <p className="mb-8 text-pretty text-lg text-textMuted md:text-xl">
              Mais de 160 canais* e centenas de títulos on-demand para toda a família.
            </p>

            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-3xl px-6 bg-black text-white hover:bg-black/90 border-black"
              >
                <a href={companyInfo.tvApps.android} target="_blank" rel="noopener noreferrer">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396" />
                  </svg>
                  Google Play
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-3xl px-6 bg-black text-white hover:bg-black/90 border-black"
              >
                <a href={companyInfo.tvApps.ios} target="_blank" rel="noopener noreferrer">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  App Store
                </a>
              </Button>
              <Button asChild size="lg" className="rounded-3xl px-6">
                <a href={companyInfo.tvApps.web} target="_blank" rel="noopener noreferrer">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Acessar Web
                </a>
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-3xl px-8">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Quero assinar a ConexãoNetTV
                  <span className="ml-2">→</span>
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-3xl px-8 bg-transparent">
                <a href="/cobertura">Consultar cobertura</a>
              </Button>
            </div>

            <div className="mt-12 grid gap-6 text-sm sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">📺</span>
                <span className="text-textMuted">160+ canais ao vivo</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">🎬</span>
                <span className="text-textMuted">Catálogo sob demanda</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">📈</span>
                <span className="text-textMuted">Conteúdo atualizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Guide Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Guia de Canais</h2>
            <p className="text-lg text-textMuted">Navegue pelos canais disponíveis</p>
          </div>

          <ChannelGrid channels={channels} />
        </div>
      </section>

      {/* VOD Catalog Section */}
      <section className="border-b border-border bg-surface py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Catálogo sob Demanda</h2>
            <p className="text-lg text-textMuted">Assista quando e onde quiser</p>
          </div>

          <VodGrid items={vodItems} />
        </div>
      </section>

      {(trendingMovies.length > 0 || trendingTV.length > 0 || nowPlaying.length > 0) && (
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold">Em Alta Agora</h2>
              <p className="text-lg text-textMuted">Os títulos mais populares do momento</p>
            </div>

            <div className="space-y-12">
              {trendingMovies.length > 0 && <TrendingRail title="Filmes em alta" items={trendingMovies.slice(0, 10)} />}
              {trendingTV.length > 0 && <TrendingRail title="Séries em alta" items={trendingTV.slice(0, 10)} />}
              {nowPlaying.length > 0 && <TrendingRail title="Nos cinemas (BR)" items={nowPlaying.slice(0, 10)} />}
            </div>
          </div>
        </section>
      )}

      {/* Combo Banner */}
      <section className="border-b border-border bg-surface py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-gradient-to-br from-brand/10 to-brand/5 p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Combo Internet + TV</h2>
            <p className="mb-8 text-lg text-textMuted">
              Contrate qualquer um de nossos planos e tenha acesso ao melhor entretenimento
            </p>
            <Button asChild size="lg" className="rounded-3xl px-8">
              <a href="/planos">
                Ver planos disponíveis
                <span className="ml-2">→</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-4 text-center text-sm text-textMuted">
            <p>
              * A CDNTV informa oferta com mais de 160 canais para provedores parceiros; disponibilidade varia por
              negociação local.
            </p>
            <p>Catálogo sujeito a disponibilidade de programadoras e região.</p>
            <p>Marcas e logotipos pertencem aos respectivos detentores.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
