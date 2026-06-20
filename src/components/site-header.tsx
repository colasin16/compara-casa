import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold">
          🏠 ComparaCasa
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground">
            Houses
          </Link>
          <Link href="/criteria" className="hover:text-foreground">
            Criteria
          </Link>
        </nav>
      </div>
    </header>
  );
}
