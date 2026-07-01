import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

import { getLandingCopy } from "./copy";

type LandingPageProps = {
  locale: Locale;
};

function SectionHeading({
  title,
  description,
  centered = false,
}: {
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("space-y-3", centered && "mx-auto max-w-3xl text-center")}>
      <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="text-lg text-muted-foreground text-pretty">{description}</p>
    </div>
  );
}

function ScreenFrame({
  caption,
  placeholder,
  children,
}: {
  caption: string;
  placeholder: boolean;
  children: React.ReactNode;
}) {
  return (
    <figure className="rounded-3xl border border-border/80 bg-card p-3 shadow-card">
      <div className="rounded-2xl border border-border/70 bg-background p-4">
        <figcaption className="mb-3 flex items-center justify-between gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          <span>{caption}</span>
          {placeholder ? (
            <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[0.65rem]">
              Screenshot placeholder
            </span>
          ) : null}
        </figcaption>
        {children}
      </div>
    </figure>
  );
}

function CriteriaShot() {
  return (
    <div className="space-y-3">
      {["Location", "Natural light", "Price", "Neighborhood"].map((item, index) => (
        <div key={item} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>{item}</span>
            <span>{10 - index * 2}/10</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${92 - index * 16}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HouseShot() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-border/70 bg-muted/30 p-3 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Visit notes</p>
        <ul className="mt-2 space-y-1.5">
          <li>• Quiet street</li>
          <li>• Bright living room</li>
          <li>• Small second bedroom</li>
        </ul>
      </div>
      <div className="rounded-xl border border-border/70 bg-muted/30 p-3 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Pros & cons</p>
        <ul className="mt-2 space-y-1.5">
          <li>+ Large kitchen</li>
          <li>+ Close to metro</li>
          <li>- No elevator</li>
        </ul>
      </div>
    </div>
  );
}

function ComparisonShot() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/70">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/40 text-left text-xs uppercase">
            <th className="px-3 py-2 font-semibold">Property</th>
            <th className="px-3 py-2 font-semibold">Location</th>
            <th className="px-3 py-2 font-semibold">Price</th>
            <th className="px-3 py-2 font-semibold">Final score</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Green Loft", "9.0", "7.0", "8.6"],
            ["Oak Apartment", "7.0", "8.5", "8.1"],
            ["River Flat", "8.0", "6.5", "7.6"],
          ].map(([home, location, price, score], index) => (
            <tr key={home} className="border-t border-border/70 even:bg-muted/20">
              <td className="px-3 py-2 font-medium">
                {index === 0 ? "🥇 " : ""}
                {home}
              </td>
              <td className="px-3 py-2 text-muted-foreground">{location}</td>
              <td className="px-3 py-2 text-muted-foreground">{price}</td>
              <td className="px-3 py-2 font-semibold text-primary">{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MapShot() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/70 bg-[radial-gradient(circle_at_20%_20%,var(--accent),transparent_45%),radial-gradient(circle_at_80%_70%,var(--muted),transparent_55%)] p-4">
      <div className="grid grid-cols-2 gap-3">
        {["A", "B", "C", "D"].map((item) => (
          <div key={item} className="rounded-lg border border-border/70 bg-background/80 p-2 text-xs">
            <p className="font-semibold text-foreground">Home {item}</p>
            <p className="text-muted-foreground">{item === "A" ? "12 min commute" : "Near metro"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalkthroughShot({ kind }: { kind: "criteria" | "house" | "comparison" | "map" }) {
  if (kind === "criteria") return <CriteriaShot />;
  if (kind === "house") return <HouseShot />;
  if (kind === "map") return <MapShot />;
  return <ComparisonShot />;
}

export function LandingPage({ locale }: LandingPageProps) {
  const copy = getLandingCopy(locale);

  return (
    <main className="relative overflow-hidden pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_35%_at_20%_5%,rgba(0,167,111,0.1),transparent_70%),radial-gradient(40%_30%_at_80%_15%,rgba(0,167,111,0.07),transparent_75%)]"
      />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:py-20">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            {copy.badge}
          </span>
          <h1 className="max-w-xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {copy.hero.title}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty">{copy.hero.description}</p>
          <p className="max-w-xl text-sm text-muted-foreground">{copy.hero.audience}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
              {copy.hero.primaryCta}
            </Link>
            <Link href="#how-it-works" className={buttonVariants({ size: "lg", variant: "outline" })}>
              {copy.hero.secondaryCta}
            </Link>
          </div>
        </div>

        <ScreenFrame caption="Comparison page" placeholder={false}>
          <ComparisonShot />
        </ScreenFrame>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading title={copy.problem.title} description={copy.problem.description} />
        <div className="mt-8 grid gap-8 rounded-3xl border border-border/70 bg-card p-6 shadow-card lg:grid-cols-[1.1fr_auto_1fr] lg:items-start">
          <ul className="space-y-2 text-sm text-muted-foreground sm:text-base">
            {copy.problem.questions.map((question) => (
              <li key={question} className="rounded-xl bg-muted/40 px-4 py-2.5">
                {question}
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center justify-center gap-2 text-xs font-semibold uppercase text-muted-foreground lg:flex-col">
            <span>{copy.problem.fails[0]}</span>
            <ArrowRight className="size-4 lg:rotate-90" aria-hidden />
            <span>{copy.problem.fails[1]}</span>
            <ArrowRight className="size-4 lg:rotate-90" aria-hidden />
            <span>{copy.problem.fails[2]}</span>
          </div>
          <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/30 p-5">
            <p className="text-sm font-semibold text-foreground">{copy.problem.failsLabel}</p>
            <p className="text-sm text-muted-foreground">{copy.problem.solutionLine}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading title={copy.solution.title} description={copy.solution.description} centered />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {copy.solution.cards.map((card) => (
            <Card key={card.title} className="h-full rounded-3xl border border-border/70 bg-card/90">
              <CardHeader className="space-y-3">
                <CardTitle>{card.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading title={copy.walkthrough.title} description={copy.walkthrough.description} centered />
        <div className="mt-8 space-y-6">
          {copy.walkthrough.steps.map((step, index) => (
            <article
              key={step.title}
              className="grid gap-5 lg:grid-cols-2 lg:items-center"
            >
              <div className={cn(index % 2 === 1 && "lg:order-2")}>
                <ScreenFrame caption={step.caption} placeholder={step.placeholder}>
                  <WalkthroughShot kind={step.kind} />
                </ScreenFrame>
              </div>
              <div className={cn("space-y-3", index % 2 === 1 && "lg:order-1")}>
                <h3 className="text-2xl font-bold tracking-tight text-balance">{step.title}</h3>
                <p className="text-base text-muted-foreground">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          title={copy.notesVsExcel.title}
          description={copy.notesVsExcel.description}
          centered
        />
        <div className="mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card">
          <table className="w-full min-w-[700px] border-collapse text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">&nbsp;</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">{copy.notesVsExcel.left}</th>
                <th className="px-4 py-3 text-left font-semibold text-primary">{copy.notesVsExcel.right}</th>
              </tr>
            </thead>
            <tbody>
              {copy.notesVsExcel.rows.map((row) => (
                <tr key={row.label} className="border-t border-border/70 odd:bg-background even:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{row.label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.left}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading title={copy.highlights.title} description={copy.highlights.description} centered />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {copy.highlights.items.map((item) => (
            <Card key={item.title} className="h-full rounded-3xl border border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-dashed border-primary/50 bg-primary/7 p-6 sm:p-8">
          <SectionHeading title={copy.roadmap.title} description={copy.roadmap.description} />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {copy.roadmap.items.map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.roadmap.badge}</p>
                <p className="mt-1 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
        <SectionHeading title={copy.faq.title} description="" centered />
        <div className="mt-6 space-y-3">
          {copy.faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-border/70 bg-card p-4 shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold">
                <span>{item.question}</span>
                <ChevronDown
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-in-out group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden
                />
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pt-8 pb-4 sm:px-6">
        <div className="rounded-3xl border border-border/70 bg-card px-6 py-10 text-center shadow-card sm:px-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            {copy.finalCta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">{copy.finalCta.description}</p>
          <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
            {copy.finalCta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
