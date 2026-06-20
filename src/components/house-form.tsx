"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  createHouse,
  updateHouse,
  type HouseFormState,
} from "@/app/houses/actions";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/lib/i18n/context";

const initialState: HouseFormState = {};

type Props = {
  mode: "create" | "edit";
  house?: { id: string; name: string; address: string | null; notes: string | null };
  onDone?: () => void;
};

export function HouseForm({ mode, house, onDone }: Props) {
  const action = mode === "create" ? createHouse : updateHouse;
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations();

  useEffect(() => {
    if (!state.ok) return;
    if (mode === "create") formRef.current?.reset();
    onDone?.();
  }, [state.ok, mode, onDone]);

  const uid = `${mode}-${house?.id ?? "new"}`;

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      {house ? <input type="hidden" name="id" value={house.id} /> : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`name-${uid}`}>{t("houseForm.name")}</Label>
        <Input
          id={`name-${uid}`}
          name="name"
          placeholder={t("houseForm.namePlaceholder")}
          defaultValue={house?.name ?? ""}
          maxLength={80}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`address-${uid}`}>{t("houseForm.address")}</Label>
        <Input
          id={`address-${uid}`}
          name="address"
          placeholder={t("houseForm.addressPlaceholder")}
          defaultValue={house?.address ?? ""}
          maxLength={200}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`notes-${uid}`}>{t("houseForm.notes")}</Label>
        <Input
          id={`notes-${uid}`}
          name="notes"
          placeholder={t("houseForm.notesPlaceholder")}
          defaultValue={house?.notes ?? ""}
          maxLength={1000}
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
          {mode === "create" ? t("houseForm.add") : t("common.save")}
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
