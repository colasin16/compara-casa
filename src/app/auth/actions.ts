"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Signs the visitor in as an anonymous (guest) user.
 * Temporary auth for fast iteration — replace/augment with real login later.
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
