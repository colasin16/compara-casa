"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  authSchema,
  emailOnlySchema,
  signUpSchema,
  updatePasswordSchema,
} from "@/lib/validation";

export type AuthFormState = {
  error?: string;
  /** Set when a confirmation email has been sent (sign-up pending verification). */
  emailSent?: boolean;
};

/** Builds the absolute base URL for auth redirect links from the request headers. */
async function getOrigin() {
  const headerList = await headers();
  const origin = headerList.get("origin");
  if (origin) return origin;

  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : undefined;
}

/**
 * Signs an existing user in with their email and password.
 * On success the visitor is redirected to their dashboard.
 */
export async function signInWithEmail(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid credentials" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

/**
 * Registers a new user with their email and password.
 * If the project requires email confirmation, no session is returned and the
 * caller is told to check their inbox; otherwise the user is signed in directly.
 */
export async function signUpWithEmail(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid details" };
  }

  const supabase = await createClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: origin ? { emailRedirectTo: `${origin}/auth/confirm` } : undefined,
  });

  if (error) {
    return { error: error.message };
  }

  // When email confirmation is enabled, Supabase returns a user without a
  // session until the link is clicked.
  if (data.session) {
    redirect("/dashboard");
  }

  return { emailSent: true };
}

/**
 * Signs the visitor in as an anonymous (guest) user.
 * Temporary auth for fast iteration — kept alongside email login.
 * Requires "Anonymous sign-ins" to be enabled in the Supabase project settings.
 */
export async function signInGuest() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInAnonymously();

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/**
 * Sends a password-reset email. The link points at the confirm route, which
 * verifies the recovery OTP and forwards the user to the update-password page.
 * Always reports success to avoid leaking which emails are registered.
 */
export async function requestPasswordReset(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = emailOnlySchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email" };
  }

  const supabase = await createClient();
  const origin = await getOrigin();

  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    origin
      ? { redirectTo: `${origin}/auth/confirm?next=/auth/update-password` }
      : undefined,
  );

  if (error) {
    return { error: error.message };
  }

  return { emailSent: true };
}

/**
 * Sets a new password for the user. Requires an active recovery session, which
 * is established by the confirm route after the user clicks the reset email.
 */
export async function updatePassword(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid password" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
