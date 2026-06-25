import type { MetadataRoute } from "next";

import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/translate";
import { SITE_NAME, THEME_COLOR } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  const { metadata } = getDictionary(defaultLocale);

  return {
    name: metadata.title,
    short_name: SITE_NAME,
    description: metadata.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: THEME_COLOR,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
