import { cookies } from "next/headers";

import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { createTranslator, getDictionary } from "./translate";

/** Reads the active locale from the cookie (server components / actions). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

/** Returns a translator bound to the active locale for server components. */
export async function getTranslations() {
  const locale = await getLocale();
  return { locale, t: createTranslator(getDictionary(locale)) };
}
