import { companyInfo } from "@/config/company"
import type { MetadataRoute } from "next"

export default async function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/planos", "/cobertura", "/suporte", "/conexaotv"]
  const now = new Date()

  return pages.map((page) => ({
    url: `${companyInfo.siteUrl}${page}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1.0 : 0.8,
  }))
}
