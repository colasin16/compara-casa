"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  createChecklistItem,
  updateChecklistItem,
  type ChecklistItemFormState,
} from "@/app/checklist/actions";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/lib/i18n/context";

const initialState: ChecklistItemFormState = {};

type Props = {
  mode: "create" | "edit";
  item?: { id: string; name: string };
  onDone?: () => void;
};

export function ChecklistItemForm({ mode, item, onDone }: Props) {
  const action = mode === "create" ? createChecklistItem : updateChecklistItem;
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations();

  useEffect(() => {
    if (!state.ok) return;
    if (mode === "create") {
      formRef.current?.reset();
    }
    onDone?.();
  }, [state.ok, mode, onDone]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`checklist-name-${mode}-${item?.id ?? "new"}`}>
          {t("checklistItemForm.name")}
        </Label>
        <Input
          id={`checklist-name-${mode}-${item?.id ?? "new"}`}
          name="name"
          placeholder={t("checklistItemForm.namePlaceholder")}
          defaultValue={item?.name ?? ""}
          maxLength={60}
          required
        />
      </div>

      {state.error ? (
        <p className="text-sm text-destructive" aria-live="polite">
          {state.error}
        </p>
      ) : null}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={pending}
          className={buttonVariants({ size: "sm" })}
        >
          {mode === "create" ? t("checklistItemForm.add") : t("common.save")}
        </button>
        {mode === "edit" && onDone ? (
          <button
            type="button"
            onClick={onDone}
            className={buttonVariants({ size: "sm", variant: "ghost" })}
          >
            {t("common.cancel")}
          </button>
        ) : null}
      </div>
    </form>
  );
}
