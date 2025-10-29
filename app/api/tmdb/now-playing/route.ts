import { NextResponse } from "next/server"

export const revalidate = 43200 // 12 hours

const TMDB_API_KEY = process.env.TMDB_API_KEY || ""
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET() {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?region=BR&language=pt-BR&api_key=${TMDB_API_KEY}`,
      {
        next: { revalidate: 43200 },
      },
    )

    if (!response.ok) {
      throw new Error("TMDB API request failed")
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching now playing:", error)
    return NextResponse.json({ error: "Failed to fetch now playing movies", results: [] }, { status: 500 })
  }
}
