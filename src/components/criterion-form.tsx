"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  createCriterion,
  updateCriterion,
  type CriterionFormState,
} from "@/app/dashboard/criteria/actions";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from "@/lib/i18n/context";

const initialState: CriterionFormState = {};

type Props = {
  mode: "create" | "edit";
  criterion?: { id: string; name: string; weight: number };
  onDone?: () => void;
};

export function CriterionForm({ mode, criterion, onDone }: Props) {
  const action = mode === "create" ? createCriterion : updateCriterion;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [weight, setWeight] = useState(criterion?.weight ?? 5);
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
      {criterion ? <input type="hidden" name="id" value={criterion.id} /> : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`name-${mode}-${criterion?.id ?? "new"}`}>
          {t("criterionForm.name")}
        </Label>
        <Input
          id={`name-${mode}-${criterion?.id ?? "new"}`}
          name="name"
          placeholder={t("criterionForm.namePlaceholder")}
          defaultValue={criterion?.name ?? ""}
          maxLength={60}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label>{t("criterionForm.weight")}</Label>
          <span className="text-sm font-medium tabular-nums">{weight}</span>
        </div>
        <input type="hidden" name="weight" value={weight} />
        <Slider
          min={0}
          max={10}
          step={1}
          value={[weight]}
          onValueChange={(value) =>
            setWeight(Array.isArray(value) ? value[0] : value)
          }
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
          {mode === "create" ? t("criterionForm.add") : t("common.save")}
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
