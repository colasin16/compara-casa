"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { useTranslations } from "@/lib/i18n/context";

export function ThemeToggle() {
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={t("header.toggleTheme")}
      title={t("header.toggleTheme")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted-foreground/10"
    >
      <Sun className="hidden size-5 dark:block" />
      <Moon className="size-5 dark:hidden" />
    </button>
  );
}
