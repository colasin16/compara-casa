import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Public_Sans, Barlow, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteHeaderGate } from "@/components/site-header-gate";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/lib/i18n/context";
import { getDictionary } from "@/lib/i18n/translate";
import { getLocale } from "@/lib/i18n/server";
import { getSiteUrl, ogLocale, SITE_NAME, THEME_COLOR } from "@/lib/seo";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { metadata } = getDictionary(locale);
  const siteUrl = getSiteUrl();
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(siteUrl),
    applicationName: SITE_NAME,
    title: {
      default: metadata.title,
      template: `%s · ${SITE_NAME}`,
    },
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        es: "/",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: metadata.title,
      description: metadata.description,
      url: "/",
      locale: ogLocale(locale),
      alternateLocale: locale === "es" ? "en_US" : "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
  };
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${publicSans.variable} ${barlow.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider locale={locale} dictionary={dictionary}>
            <SiteHeaderGate>
              <SiteHeader />
            </SiteHeaderGate>
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
