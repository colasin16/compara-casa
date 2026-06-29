/**
 * Supabase Auth Send Email Hook
 *
 * Replaces Supabase's built-in email sending with custom React Email
 * templates delivered via Resend. Supports localized templates based on the
 * user's locale stored in `user_metadata.locale`.
 *
 * Required environment variables (set with `supabase secrets set`):
 *   RESEND_API_KEY          — Resend API key
 *   SEND_EMAIL_HOOK_SECRET  — Webhook secret from Supabase Auth Hooks dashboard
 *   EMAIL_FROM              — Sender address, e.g. "ComparaCasa <noreply@comparacasa.app>"
 *
 * See supabase/functions/.env.example for a template.
 */

import { Resend } from "npm:resend@4.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";

import {
  emailTranslations,
  type EmailLocale,
} from "./_i18n.ts";
import { ConfirmSignupEmail } from "./_templates/confirm-signup.tsx";
import { ResetPasswordEmail } from "./_templates/reset-password.tsx";
import { EmailChangeEmail } from "./_templates/email-change.tsx";

type EmailActionType =
  | "signup"
  | "recovery"
  | "email_change"
  | "invite"
  | "magiclink"
  | "reauthentication";

interface HookPayload {
  user: {
    email: string;
    user_metadata?: {
      locale?: string;
    };
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: EmailActionType;
    site_url: string;
    token_new: string;
    token_hash_new: string;
  };
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

const hookSecretRaw = Deno.env.get("SEND_EMAIL_HOOK_SECRET") ?? "";
// standardwebhooks expects the raw base64 secret without the "v1,whsec_" prefix
const hookSecret = hookSecretRaw.replace(/^v1,whsec_/, "");

const FROM_ADDRESS =
  Deno.env.get("EMAIL_FROM") ?? "ComparaCasa <noreply@comparacasa.app>";

/**
 * Appends token_hash and type search params to a redirect URL while
 * preserving any params already present (e.g. `next` for password reset).
 */
function buildActionUrl(
  redirectTo: string,
  tokenHash: string,
  type: string,
): string {
  try {
    const url = new URL(redirectTo);
    url.searchParams.set("token_hash", tokenHash);
    url.searchParams.set("type", type);
    return url.toString();
  } catch {
    // Fallback for non-absolute URLs
    const sep = redirectTo.includes("?") ? "&" : "?";
    return `${redirectTo}${sep}token_hash=${encodeURIComponent(tokenHash)}&type=${encodeURIComponent(type)}`;
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const payload = await req.text();
  const reqHeaders = Object.fromEntries(req.headers);
  const wh = new Webhook(hookSecret);

  let data: HookPayload;
  try {
    data = wh.verify(payload, reqHeaders) as HookPayload;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response(
      JSON.stringify({ error: { http_code: 401, message: "Unauthorized" } }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  const { user, email_data } = data;
  const { token_hash, redirect_to, email_action_type } = email_data;

  // Resolve locale from user metadata, defaulting to English
  const rawLocale = user.user_metadata?.locale;
  const locale: EmailLocale =
    rawLocale === "es" || rawLocale === "en" ? rawLocale : "en";
  const t = emailTranslations[locale];

  const actionUrl = buildActionUrl(redirect_to, token_hash, email_action_type);

  let subject: string;
  let html: string;

  try {
    switch (email_action_type) {
      case "signup": {
        subject = t.confirmSignup.subject;
        html = await renderAsync(
          React.createElement(ConfirmSignupEmail, {
            brand: t.brand,
            confirmUrl: actionUrl,
            t: t.confirmSignup,
            footer: t.footer,
          }),
        );
        break;
      }

      case "recovery": {
        subject = t.resetPassword.subject;
        html = await renderAsync(
          React.createElement(ResetPasswordEmail, {
            brand: t.brand,
            resetUrl: actionUrl,
            t: t.resetPassword,
            footer: t.footer,
          }),
        );
        break;
      }

      case "email_change": {
        subject = t.emailChange.subject;
        html = await renderAsync(
          React.createElement(EmailChangeEmail, {
            brand: t.brand,
            confirmUrl: actionUrl,
            t: t.emailChange,
            footer: t.footer,
          }),
        );
        break;
      }

      default:
        // Unsupported action types are acknowledged without sending an email.
        // This prevents Supabase from retrying while keeping a no-op response.
        console.warn(`Unhandled email_action_type: ${email_action_type}`);
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
    }

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [user.email],
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Failed to send ${email_action_type} email:`, message);
    return new Response(
      JSON.stringify({ error: { http_code: 500, message } }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
