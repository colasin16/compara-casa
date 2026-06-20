import type { NextConfig } from "next";

// Allow Next/Image to load house cover images served from Supabase Storage.
// The hostname is derived from the configured Supabase URL so it follows the
// project across environments. Signed cover URLs are rendered `unoptimized`,
// but this pattern keeps the host explicitly allow-listed.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
