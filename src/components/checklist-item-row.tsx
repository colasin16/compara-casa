"use client";

import { useState } from "react";
import { ListChecks } from "lucide-react";
import { deleteChecklistItem } from "@/app/checklist/actions";
import { ChecklistItemForm } from "@/components/checklist-item-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ChecklistItem } from "@/lib/types";
import { useTranslations } from "@/lib/i18n/context";

export function ChecklistItemRow({ item }: { item: ChecklistItem }) {
  const [editing, setEditing] = useState(false);
  const t = useTranslations();

  return (
    <Card>
      <CardContent className="py-4">
        {editing ? (
          <ChecklistItemForm
            mode="edit"
            item={{ id: item.id, name: item.name }}
            onDone={() => setEditing(false)}
          />
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ListChecks className="size-4" aria-hidden />
              </span>
              <span className="truncate font-medium">{item.name}</span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                {t("common.edit")}
              </button>
              <form action={deleteChecklistItem}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-destructive",
                  })}
                >
                  {t("common.delete")}
                </button>
              </form>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
