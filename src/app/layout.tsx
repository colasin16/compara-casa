import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Public_Sans, Barlow, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DashboardShell } from "@/components/dashboard-shell";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/lib/i18n/context";
import { getDictionary } from "@/lib/i18n/translate";
import { getLocale } from "@/lib/i18n/server";
import { createClient } from "@/lib/supabase/server";

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
  const dictionary = getDictionary(await getLocale());
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
            {user ? (
              <DashboardShell
                email={user.email}
                guestId={user.id.slice(0, 8)}
              >
                {children}
              </DashboardShell>
            ) : (
              <>
                <SiteHeader />
                {children}
              </>
            )}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
