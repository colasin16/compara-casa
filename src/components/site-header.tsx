import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold">
          🏠 ComparaCasa
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-foreground">
                Houses
              </Link>
              <Link href="/criteria" className="hover:text-foreground">
                Criteria
              </Link>
              <span className="hidden text-xs sm:inline">
                Guest {user.id.slice(0, 8)}
              </span>
              <form action={signOut}>
                <button type="submit" className="hover:text-foreground">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="hover:text-foreground">
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
