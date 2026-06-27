import { Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface EmptyStateCardProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  actions?: ReactNode;
}

export function EmptyStateCard({
  icon: Icon,
  title,
  description,
  actions,
}: EmptyStateCardProps) {
  return (
    <Card className="overflow-hidden border border-dashed border-primary/25 bg-linear-to-br from-primary/[0.08] via-background to-muted/50 shadow-none">
      <CardContent className="relative flex flex-col items-center gap-5 px-6 py-12 text-center sm:px-10">
        <Sparkles
          className="absolute right-5 top-5 size-4 text-primary/30"
          aria-hidden
        />
        <Sparkles
          className="absolute bottom-5 left-5 size-3 text-primary/20"
          aria-hidden
        />
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/[0.07]">
          <Icon className="size-8" aria-hidden />
        </span>
        <div className="flex flex-col gap-1.5">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="max-w-md text-sm text-muted-foreground">
            {description}
          </div>
        </div>
        {actions ? (
          <div className="flex flex-wrap justify-center gap-3">{actions}</div>
        ) : null}
      </CardContent>
    </Card>
  );
}
