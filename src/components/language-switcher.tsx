"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { useI18n, useTranslations } from "@/lib/i18n/context";
import { locales, type Locale } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/actions";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useI18n();
  const t = useTranslations();
  const [pending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label={t("header.selectLanguage")}
      data-pending={pending ? "" : undefined}
      className="ml-1 inline-flex items-center rounded-lg bg-muted p-0.5 text-xs font-bold data-pending:opacity-60"
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => change(code)}
          aria-pressed={code === locale}
          className={cn(
            "rounded-md px-2 py-1 uppercase transition-colors",
            code === locale
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
