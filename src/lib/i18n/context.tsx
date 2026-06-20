"use client";

import { createContext, useContext, useMemo } from "react";

import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries";
import { createTranslator, type Translator } from "./translate";

type I18nContextValue = {
  locale: Locale;
  t: Translator;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: createTranslator(dictionary) }),
    [locale, dictionary],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}

/** Convenience hook returning just the translator function. */
export function useTranslations(): Translator {
  return useI18n().t;
}
