import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getTranslations } from "@/lib/i18n/server";

export default async function Home() {
  const { t } = await getTranslations();
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-10 overflow-hidden px-6 py-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,167,111,0.08),transparent_70%)]"
      />
      <div className="flex flex-col items-center gap-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
          🏠 {t("home.badge")}
        </span>
        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          {t("home.titleLead")}{" "}
          <span className="text-primary">{t("home.titleHighlight")}</span>
        </h1>
        <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          {t("home.description")}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
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
    </main>
  );
}
