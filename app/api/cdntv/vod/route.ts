import { NextResponse } from "next/server"
import vodData from "@/data/cdntv-vod.json"

export const revalidate = 43200 // 12 hours

export async function GET() {
  try {
    // In a real implementation, you would scrape https://cdn.tv.br/vod/
    // For now, we return the fallback JSON data

    return NextResponse.json(
      { items: vodData.items },
      {
        headers: {
          "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Error fetching VOD:", error)

    // Fallback to local JSON
    return NextResponse.json(
      { items: vodData.items },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
        },
      },
    )
  }
}
