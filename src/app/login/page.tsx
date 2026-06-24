import { signInGuest } from "@/app/auth/actions";
import { AuthForm } from "@/components/auth-form";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
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
        <CardContent className="flex flex-col gap-4">
          {error ? (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <AuthForm />

          <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {t("login.or")}
            <span className="h-px flex-1 bg-border" />
          </div>

          <form action={signInGuest}>
            <SubmitButton
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "w-full",
              })}
            >
              {t("login.continueAsGuest")}
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
