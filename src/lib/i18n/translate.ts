import { dictionaries, type Dictionary } from "./dictionaries";
import type { Locale } from "./config";

type Vars = Record<string, string | number>;

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

/**
 * Resolves a dotted key path (e.g. "dashboard.title") against a dictionary
 * and interpolates `{var}` placeholders.
 */
export function createTranslator(dict: Dictionary) {
  return function t(key: string, vars?: Vars): string {
    const value = key
      .split(".")
      .reduce<unknown>(
        (acc, part) =>
          acc && typeof acc === "object"
            ? (acc as Record<string, unknown>)[part]
            : undefined,
        dict,
      );

    if (typeof value !== "string") {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] Missing translation for key: "${key}"`);
      }
      return key;
    }

    return interpolate(value, vars);
  };
}

export type Translator = ReturnType<typeof createTranslator>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
