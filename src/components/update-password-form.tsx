"use client";

import { useActionState } from "react";

import { updatePassword, type AuthFormState } from "@/app/auth/actions";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/lib/i18n/context";

const initialState: AuthFormState = {};

export function UpdatePasswordForm() {
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(
    updatePassword,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">{t("login.newPassword")}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder={t("login.passwordPlaceholder")}
          minLength={6}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">{t("login.confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder={t("login.confirmPasswordPlaceholder")}
          minLength={6}
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
        {t("login.savePassword")}
      </button>
    </form>
  );
}
