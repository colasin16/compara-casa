import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Handles the email confirmation link sent by Supabase Auth.
 * The link carries a `token_hash` and `type`; we verify the OTP to establish a
 * session, then forward the user on. Requires the Supabase email templates to
 * point at `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      redirect(next);
    }

    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/login?error=Invalid%20or%20expired%20confirmation%20link");
}
