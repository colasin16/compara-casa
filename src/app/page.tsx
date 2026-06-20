import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getTranslations } from "@/lib/i18n/server";

export default async function Home() {
  const { t } = await getTranslations();
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden px-4 py-16 text-center sm:gap-10 sm:px-6 sm:py-24">
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
    </main>
  );
}
