import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className }: { className?: string }) {
  return (
    <LoaderCircle
      aria-hidden
      className={cn("size-4 shrink-0 animate-spin", className)}
    />
  );
}

export { Spinner };
