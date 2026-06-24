"use client";

import { useState } from "react";
import { deleteCriterion } from "@/app/dashboard/criteria/actions";
import { CriterionForm } from "@/components/criterion-form";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { Card, CardContent } from "@/components/ui/card";
import type { Criterion } from "@/lib/types";
import { useTranslations } from "@/lib/i18n/context";

export function CriterionItem({ criterion }: { criterion: Criterion }) {
  const [editing, setEditing] = useState(false);
  const t = useTranslations();

  return (
    <Card>
      <CardContent className="py-4">
        {editing ? (
          <CriterionForm
            mode="edit"
            criterion={{
              id: criterion.id,
              name: criterion.name,
              weight: Number(criterion.weight),
            }}
            onDone={() => setEditing(false)}
          />
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold tabular-nums text-primary"
                title={t("criterionForm.weightTitle")}
              >
                {Number(criterion.weight)}
              </span>
              <span className="truncate font-medium">{criterion.name}</span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                {t("common.edit")}
              </button>
              <form action={deleteCriterion}>
                <input type="hidden" name="id" value={criterion.id} />
                <SubmitButton
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-destructive",
                  })}
                >
                  {t("common.delete")}
                </SubmitButton>
              </form>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
