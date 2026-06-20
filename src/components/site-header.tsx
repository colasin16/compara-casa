import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MainNav } from "@/components/main-nav";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-base font-extrabold tracking-tight sm:text-lg"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-base">
            🏠
          </span>
          ComparaCasa
        </Link>
        <MainNav isLoggedIn={!!user} guestId={user?.id.slice(0, 8)} />
      </div>
    </header>
  );
}
