import { NextResponse } from "next/server"
import channelsData from "@/data/cdntv-channels.json"

export const revalidate = 43200 // 12 hours

export async function GET() {
  try {
    // In a real implementation, you would scrape https://cdn.tv.br/cdntv/
    // For now, we return the fallback JSON data

    return NextResponse.json(
      { channels: channelsData.channels },
      {
        headers: {
          "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Error fetching channels:", error)

    // Fallback to local JSON
    return NextResponse.json(
      { channels: channelsData.channels },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
        },
      },
    )
  }
}
