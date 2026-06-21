import Link from "next/link";

import { ForgotPasswordForm } from "@/components/forgot-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "@/lib/i18n/server";

export default async function ForgotPasswordPage() {
  const { t } = await getTranslations();

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t("login.forgotPasswordTitle")}</CardTitle>
          <CardDescription>
            {t("login.forgotPasswordDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ForgotPasswordForm />

          <Link
            href="/login"
            className="text-center text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {t("login.backToSignIn")}
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
