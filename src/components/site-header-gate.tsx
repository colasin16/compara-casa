"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children on every route except the dashboard, which provides its
 * own header/sidebar via DashboardShell.
 */
export function SiteHeaderGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return null;
  }

  return <>{children}</>;
}
