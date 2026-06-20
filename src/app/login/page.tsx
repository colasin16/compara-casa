import { signInGuest } from "@/app/auth/actions";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome to ComparaCasa</CardTitle>
          <CardDescription>
            Jump straight in as a guest. Your houses and criteria are saved to
            this session — you can add a permanent login later.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {error ? (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <form action={signInGuest}>
            <button
              type="submit"
              className={buttonVariants({ size: "lg", className: "w-full" })}
            >
              Continue as guest
            </button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
