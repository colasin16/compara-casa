"use client";

import { useActionState } from "react";

import { requestPasswordReset, type AuthFormState } from "@/app/auth/actions";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/lib/i18n/context";

const initialState: AuthFormState = {};

export function ForgotPasswordForm() {
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(
    requestPasswordReset,
    initialState,
  );

  if (state.emailSent) {
    return (
      <p
        className="rounded-md bg-primary/10 px-3 py-2 text-sm text-foreground"
        aria-live="polite"
      >
        {t("login.resetEmailSent")}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{t("login.email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("login.emailPlaceholder")}
          required
        />
      </div>

      {state.error ? (
        <p
          className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          aria-live="polite"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={buttonVariants({ size: "lg", className: "w-full" })}
      >
        {t("login.sendResetLink")}
      </button>
    </form>
  );
}
