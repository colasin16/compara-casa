"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const menuByLocale: Record<Locale, Array<{ name: string; href: string }>> = {
  en: [
    { name: "How it works", href: "#how-it-works" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "FAQs", href: "#faq" },
  ],
  es: [
    { name: "Cómo funciona", href: "#how-it-works" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "FAQs", href: "#faq" },
  ],
};

export function LandingHeader({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = menuByLocale[locale];

  return (
    <nav className="fixed top-0 z-40 w-full px-2">
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl px-4 transition-all duration-300 sm:px-6",
          isScrolled && "max-w-4xl rounded-full border border-border/60 bg-background/80 backdrop-blur-md",
        )}
      >
        <div className="relative flex flex-wrap items-center justify-between gap-4 py-2.5 lg:gap-0">
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Link
              href="/"
              aria-label="home"
              className="flex items-center gap-2 font-heading text-base font-extrabold tracking-tight sm:text-lg"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-base">🏠</span>
              ComparaCasa
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="relative z-20 -m-2.5 -mr-1 block cursor-pointer p-2.5 lg:hidden"
            >
              <Menu
                className={cn(
                  "m-auto size-6 transition-all duration-200",
                  menuOpen && "rotate-180 scale-0 opacity-0",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 transition-all duration-200",
                  menuOpen && "rotate-0 scale-100 opacity-100",
                )}
              />
            </button>
          </div>

          <div className="absolute inset-0 m-auto hidden size-fit lg:block">
            <ul className="flex gap-8 text-sm">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-base text-muted-foreground duration-150 hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              "bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border/60 p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none lg:mb-0 lg:flex lg:w-fit lg:gap-3 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none",
              menuOpen && "block",
            )}
          >
            <div className="lg:hidden">
              <ul className="space-y-6 text-base">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-muted-foreground duration-150 hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 md:w-fit">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }), "rounded-full")}>
                {locale === "es" ? "Empezar" : "Get started"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
