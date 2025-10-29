export interface Channel {
  id: string
  name: string
  logo: string
  genre?: string
}

export interface VodItem {
  id: string
  title: string
  poster: string
  kind: "movie" | "tv" | "kids" | "doc"
  year?: number
}

export interface TrendingItem {
  id: number
  title?: string
  name?: string
  poster_path: string
  backdrop_path?: string
  overview: string
  vote_average: number
  release_date?: string
  first_air_date?: string
  genre_ids: number[]
  media_type?: string
}
