import { signInGuest } from "@/app/auth/actions";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "@/lib/i18n/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const { t } = await getTranslations();

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t("login.title")}</CardTitle>
          <CardDescription>{t("login.description")}</CardDescription>
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
              {t("login.continueAsGuest")}
            </button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
