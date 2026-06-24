import type { Locale } from "@/lib/i18n/config";

/**
 * Supported currencies. Intentionally limited to a handful of major world
 * currencies so the validation/formatting surface stays small and manageable.
 * The codes here MUST stay in sync with the `currency` check constraint in
 * supabase/migrations/0004_house_price.sql.
 */
export const SUPPORTED_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CHF",
  "CAD",
  "AUD",
  "CNY",
] as const;

export type Currency = (typeof SUPPORTED_CURRENCIES)[number];

export const DEFAULT_CURRENCY: Currency = "EUR";

export function isCurrency(value: unknown): value is Currency {
  return (
    typeof value === "string" &&
    (SUPPORTED_CURRENCIES as readonly string[]).includes(value)
  );
}

/**
 * Formats a numeric amount as a localized currency string, e.g. "€250,000".
 * Falls back to a plain code + amount if the runtime can't format the value.
 */
export function formatPrice(
  amount: number,
  currency: string,
  locale: Locale = "en",
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}
