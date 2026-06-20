"use client";

import { useActionState, useState } from "react";

import {
  signUpWithEmail,
  signInWithEmail,
  type AuthFormState,
} from "@/app/auth/actions";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const initialState: AuthFormState = {};

type Mode = "signIn" | "signUp";

export function AuthForm() {
  const t = useTranslations();
  const [mode, setMode] = useState<Mode>("signIn");
  const action = mode === "signIn" ? signInWithEmail : signUpWithEmail;
  const [state, formAction, pending] = useActionState(action, initialState);

  if (state.emailSent) {
    return (
      <p
        className="rounded-md bg-primary/10 px-3 py-2 text-sm text-foreground"
        aria-live="polite"
      >
        {t("login.emailSent")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-sm font-semibold">
        {(["signIn", "signUp"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-pressed={mode === value}
            className={cn(
              "rounded-md px-3 py-1.5 transition-colors",
              mode === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {value === "signIn" ? t("login.signIn") : t("login.signUp")}
          </button>
        ))}
      </div>

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

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">{t("login.password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={
              mode === "signIn" ? "current-password" : "new-password"
            }
            placeholder={t("login.passwordPlaceholder")}
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
          {mode === "signIn" ? t("login.signIn") : t("login.createAccount")}
        </button>
      </form>
    </div>
  );
}
