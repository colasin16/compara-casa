import type { Locale } from "@/lib/i18n/config";

/** Display name / brand used across metadata, manifest and structured data. */
export const SITE_NAME = "ComparaCasa";

/** Brand primary colour (matches `--primary` in globals.css). */
export const THEME_COLOR = "#00a76f";

/**
 * Resolves the canonical site origin (no trailing slash) used to build absolute
 * URLs for metadata, sitemap and robots. Prefers an explicit
 * `NEXT_PUBLIC_SITE_URL`, then the Vercel-provided host, and finally localhost
 * for local development.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

/** Maps an app locale to its Open Graph `og:locale` value. */
export function ogLocale(locale: Locale): string {
  return locale === "es" ? "es_ES" : "en_US";
}
