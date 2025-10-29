import { companyInfo } from "@/config/company"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${companyInfo.siteUrl}/sitemap.xml`,
    host: companyInfo.siteUrl,
  }
}
