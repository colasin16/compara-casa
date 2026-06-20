import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { getTranslations } from "@/lib/i18n/server";
import { LanguageSwitcher } from "@/components/language-switcher";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { t } = await getTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-extrabold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-base">
            🏠
          </span>
          ComparaCasa
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 transition-colors hover:bg-muted-foreground/10 hover:text-foreground"
              >
                {t("header.houses")}
              </Link>
              <Link
                href="/criteria"
                className="rounded-lg px-3 py-2 transition-colors hover:bg-muted-foreground/10 hover:text-foreground"
              >
                {t("header.criteria")}
              </Link>
              <span className="ml-2 hidden rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:inline">
                {t("header.guest", { id: user.id.slice(0, 8) })}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-muted-foreground/10 hover:text-foreground"
                >
                  {t("header.signOut")}
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 transition-colors hover:bg-muted-foreground/10 hover:text-foreground"
            >
              {t("header.logIn")}
            </Link>
          )}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
