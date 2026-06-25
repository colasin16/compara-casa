import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          es: `${siteUrl}/`,
        },
      },
    },
    {
      url: `${siteUrl}/login`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
