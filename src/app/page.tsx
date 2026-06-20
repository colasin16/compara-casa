import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-10 overflow-hidden px-6 py-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,167,111,0.08),transparent_70%)]"
      />
      <div className="flex flex-col items-center gap-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
          🏠 ComparaCasa
        </span>
        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          Score and compare houses{" "}
          <span className="text-primary">your way</span>
        </h1>
        <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
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
