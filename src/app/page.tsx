import Link from "next/link";
import { ListChecks, Scale, Table2, ThumbsUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/translate";
import { getSiteUrl, SITE_NAME } from "@/lib/seo";

export default async function Home() {
  const { t, locale } = await getTranslations();
  const { metadata } = getDictionary(locale);
  const siteUrl = getSiteUrl();

  const steps = [
    {
      title: t("home.howItWorks.step1Title"),
      desc: t("home.howItWorks.step1Desc"),
    },
    {
      title: t("home.howItWorks.step2Title"),
      desc: t("home.howItWorks.step2Desc"),
    },
    {
      title: t("home.howItWorks.step3Title"),
      desc: t("home.howItWorks.step3Desc"),
    },
  ];

  const features = [
    {
      icon: Scale,
      title: t("home.features.weightedTitle"),
      desc: t("home.features.weightedDesc"),
    },
    {
      icon: ListChecks,
      title: t("home.features.checklistTitle"),
      desc: t("home.features.checklistDesc"),
    },
    {
      icon: ThumbsUp,
      title: t("home.features.prosConsTitle"),
      desc: t("home.features.prosConsDesc"),
    },
    {
      icon: Table2,
      title: t("home.features.compareTitle"),
      desc: t("home.features.compareDesc"),
    },
  ];

  const faqs = [
    { q: t("home.faq.q1"), a: t("home.faq.a1") },
    { q: t("home.faq.q2"), a: t("home.faq.a2") },
    { q: t("home.faq.q3"), a: t("home.faq.a3") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        url: siteUrl,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        description: metadata.description,
        inLanguage: ["en", "es"],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="relative flex flex-1 flex-col items-center overflow-hidden px-4 pb-20 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative flex w-full flex-col items-center justify-center gap-8 py-16 text-center sm:gap-10 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,167,111,0.08),transparent_70%)]"
        />
        <div className="flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            🏠 {t("home.badge")}
          </span>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("home.titleLead")}{" "}
            <span className="text-primary">{t("home.titleHighlight")}</span>
          </h1>
          <p className="max-w-xl text-balance text-sm text-muted-foreground sm:text-lg">
            {t("home.description")}
          </p>
        </div>

        <div className="flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
            {t("home.getStarted")}
          </Link>
          <Link
            href="/login"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {t("home.logIn")}
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-4xl py-12 sm:py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {t("home.howItWorks.title")}
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section className="w-full max-w-4xl py-12 sm:py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {t("home.features.title")}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardHeader>
                <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-3xl py-12 sm:py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {t("home.faq.title")}
        </h2>
        <dl className="mt-8 flex flex-col gap-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="flex flex-col gap-2">
              <dt className="text-base font-semibold">{faq.q}</dt>
              <dd className="text-sm text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
