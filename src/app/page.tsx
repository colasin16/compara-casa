import { LandingPage } from "@/components/landing/landing-page";
import { getTranslations } from "@/lib/i18n/server";

export default async function Home() {
  const { locale } = await getTranslations();

  return <LandingPage locale={locale} />;
}
