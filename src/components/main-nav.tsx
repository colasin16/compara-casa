"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { signOut } from "@/app/auth/actions";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const linkClass =
  "rounded-lg px-3 py-2 transition-colors hover:bg-muted-foreground/10 hover:text-foreground";

export function MainNav({
  isLoggedIn,
  guestId,
  email,
}: {
  isLoggedIn: boolean;
  guestId?: string;
  email?: string;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const accountLabel = email ?? t("header.guest", { id: guestId ?? "" });

  const links = isLoggedIn
    ? [
        { href: "/dashboard", label: t("header.houses") },
        { href: "/criteria", label: t("header.criteria") },
        { href: "/checklist", label: t("header.checklist") },
        { href: "/compare", label: t("header.compare") },
      ]
    : [{ href: "/login", label: t("header.logIn") }];

  return (
    <div className="flex items-center gap-1">
      {/* Desktop nav */}
      <nav className="hidden items-center gap-1 text-sm font-semibold text-muted-foreground sm:flex">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass}>
            {link.label}
          </Link>
        ))}
        {isLoggedIn ? (
          <>
            <span className="ml-2 hidden max-w-[12rem] truncate rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground md:inline">
              {accountLabel}
            </span>
            <form action={signOut}>
              <button type="submit" className={linkClass}>
                {t("header.signOut")}
              </button>
            </form>
          </>
        ) : null}
        <LanguageSwitcher />
        <ThemeToggle />
      </nav>

      {/* Mobile nav */}
      <div className="flex items-center gap-1 sm:hidden">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted-foreground/10"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-foreground/20 sm:hidden"
          />
          <nav className="absolute inset-x-0 top-16 z-50 flex flex-col gap-1 border-b border-border/60 bg-background p-4 text-sm font-semibold text-muted-foreground shadow-dropdown sm:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={cn(linkClass, "py-2.5")}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <span className="truncate px-3 py-1 text-xs font-medium text-muted-foreground">
                  {accountLabel}
                </span>
                <form action={signOut} onSubmit={close}>
                  <button
                    type="submit"
                    className={cn(linkClass, "w-full py-2.5 text-left")}
                  >
                    {t("header.signOut")}
                  </button>
                </form>
              </>
            ) : null}
          </nav>
        </>
      ) : null}
    </div>
  );
}
