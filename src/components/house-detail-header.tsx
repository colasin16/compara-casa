"use client";

import { useState } from "react";
import { HouseForm } from "@/components/house-form";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/currency";
import type { House } from "@/lib/types";
import { useLocale, useTranslations } from "@/lib/i18n/context";

export function HouseDetailHeader({ house }: { house: House }) {
  const [editing, setEditing] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  if (editing) {
    return (
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <HouseForm
          mode="edit"
          house={{
            id: house.id,
            name: house.name,
            price: house.price,
            currency: house.currency,
            address: house.address,
            notes: house.notes,
            latitude: house.latitude,
            longitude: house.longitude,
          }}
          onDone={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 flex-col">
        <h1 className="truncate text-2xl font-bold tracking-tight">
          {house.name}
        </h1>
        <p className="text-sm font-semibold text-primary">
          {formatPrice(Number(house.price), house.currency, locale)}
        </p>
        {house.address ? (
          <p className="text-sm text-muted-foreground">{house.address}</p>
        ) : null}
        {house.notes ? (
          <p className="mt-2 text-sm text-muted-foreground">{house.notes}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => setEditing(true)}
        className={buttonVariants({ size: "sm", variant: "outline" })}
      >
        {t("common.edit")}
      </button>
    </div>
  );
}
