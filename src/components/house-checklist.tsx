"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { checkChecklistItem } from "@/app/houses/actions";
import type { ChecklistItem } from "@/lib/types";
import { useTranslations } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

type Props = {
  houseId: string;
  items: ChecklistItem[];
  initialChecked: Record<string, boolean>;
};

export function HouseChecklist({ houseId, items, initialChecked }: Props) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    initialChecked,
  );
  const [, startTransition] = useTransition();
  const t = useTranslations();

  const checkedCount = items.filter((item) => checked[item.id]).length;

  function toggle(itemId: string, next: boolean) {
    setChecked((prev) => ({ ...prev, [itemId]: next }));
    const formData = new FormData();
    formData.set("houseId", houseId);
    formData.set("itemId", itemId);
    formData.set("checked", String(next));
    startTransition(() => {
      void checkChecklistItem(formData);
    });
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("houseChecklist.noItemsBefore")}
        <a href="/checklist" className="underline">
          {t("houseChecklist.noItemsLink")}
        </a>
        {t("houseChecklist.noItemsAfter")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs font-medium text-muted-foreground">
        {t("houseChecklist.checkedCount", {
          checked: checkedCount,
          total: items.length,
        })}
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {items.map((item) => {
          const isChecked = checked[item.id] ?? false;
          return (
            <li key={item.id} className="py-1.5">
              <label className="flex cursor-pointer items-center gap-3 py-1.5">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={(event) => toggle(item.id, event.target.checked)}
                />
                <span
                  aria-hidden
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
                    isChecked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-transparent",
                  )}
                >
                  <Check className="size-3.5" />
                </span>
                <span
                  className={cn(
                    "truncate text-sm font-medium",
                    !isChecked && "text-muted-foreground",
                  )}
                >
                  {item.name}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
