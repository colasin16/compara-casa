"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  createHouse,
  updateHouse,
  type HouseFormState,
} from "@/app/dashboard/houses/actions";
import { AddressAutocomplete } from "@/components/address-autocomplete";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY } from "@/lib/currency";
import { useTranslations } from "@/lib/i18n/context";

const initialState: HouseFormState = {};

type Props = {
  mode: "create" | "edit";
  house?: {
    id: string;
    name: string;
    price: number;
    currency: string;
    address: string | null;
    notes: string | null;
    latitude: number | null;
    longitude: number | null;
  };
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
        <Label htmlFor={`price-${uid}`}>{t("houseForm.price")}</Label>
        <div className="flex gap-2">
          <Input
            id={`price-${uid}`}
            name="price"
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            placeholder={t("houseForm.pricePlaceholder")}
            defaultValue={
              house && house.price > 0 ? String(house.price) : ""
            }
            className="flex-1"
            required
          />
          <select
            id={`currency-${uid}`}
            name="currency"
            aria-label={t("houseForm.currency")}
            defaultValue={house?.currency ?? DEFAULT_CURRENCY}
            className="h-10 shrink-0 rounded-lg border border-input bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow,border-color] hover:border-foreground/60 focus-visible:border-foreground md:text-sm"
          >
            {SUPPORTED_CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`address-${uid}`}>{t("houseForm.address")}</Label>
        <AddressAutocomplete
          id={`address-${uid}`}
          placeholder={t("houseForm.addressPlaceholder")}
          defaultValue={house?.address ?? ""}
          defaultLatitude={house?.latitude ?? null}
          defaultLongitude={house?.longitude ?? null}
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
          aria-busy={pending}
          className={buttonVariants({ size: "sm" })}
        >
          {pending ? <Spinner className="size-3.5" /> : null}
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
