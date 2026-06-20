"use client";

import { useState } from "react";
import { deleteCriterion } from "@/app/criteria/actions";
import { CriterionForm } from "@/components/criterion-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Criterion } from "@/lib/types";

export function CriterionItem({ criterion }: { criterion: Criterion }) {
  const [editing, setEditing] = useState(false);

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
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold tabular-nums text-primary"
                title="Weight"
              >
                {Number(criterion.weight)}
              </span>
              <span className="font-medium">{criterion.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Edit
              </button>
              <form action={deleteCriterion}>
                <input type="hidden" name="id" value={criterion.id} />
                <button
                  type="submit"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-destructive",
                  })}
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
