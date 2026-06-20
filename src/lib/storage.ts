import type { SupabaseClient } from "@supabase/supabase-js";

/** Private Storage bucket holding optional per-house cover images. */
export const COVER_BUCKET = "house-covers";

/** Lifetime of generated signed cover URLs, in seconds. */
const SIGNED_URL_TTL = 60 * 60; // 1 hour

/**
 * Resolves a single stored cover path into a short-lived signed URL.
 * Returns null when there is no path or the URL could not be created.
 */
export async function resolveCoverUrl(
  supabase: SupabaseClient,
  path: string | null,
): Promise<string | null> {
  if (!path) return null;
  const { data } = await supabase.storage
    .from(COVER_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  return data?.signedUrl ?? null;
}

/**
 * Resolves many stored cover paths in a single round trip, returning a map of
 * path → signed URL. Paths that fail to sign are simply omitted.
 */
export async function resolveCoverUrls(
  supabase: SupabaseClient,
  paths: string[],
): Promise<Map<string, string>> {
  const unique = Array.from(new Set(paths.filter((p): p is string => !!p)));
  const result = new Map<string, string>();
  if (unique.length === 0) return result;

  const { data } = await supabase.storage
    .from(COVER_BUCKET)
    .createSignedUrls(unique, SIGNED_URL_TTL);

  for (const entry of data ?? []) {
    if (entry.path && entry.signedUrl) {
      result.set(entry.path, entry.signedUrl);
    }
  }
  return result;
}
