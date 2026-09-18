import { MetadataRoute } from "next";
import { BUSINESS_CONFIG } from "@/components/businessConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/*",
        "/dashboard",
        "/login",
        "/private",
        "/api",
        "/api/*",
        "/_next/",
        "/static/",
      ],
    },
    sitemap: `${BUSINESS_CONFIG.websiteUrl}/sitemap.xml`,
  };
}
