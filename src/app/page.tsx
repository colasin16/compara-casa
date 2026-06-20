import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <div className="flex flex-col items-center gap-4">
        <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          🏠 ComparaCasa
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Score and compare houses your way
        </h1>
        <p className="max-w-xl text-balance text-muted-foreground sm:text-lg">
          Define the aspects that matter to you — location, condition, parking,
          terrace, lighting — give each one a weight, and let ComparaCasa rank
          every house by what <em>you</em> value most.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
          Get started
        </Link>
        <Link
          href="/login"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Log in
        </Link>
      </div>
    </main>
  );
}
