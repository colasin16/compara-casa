"use client";

import { useState } from "react";
import { Banknote, ExternalLink, MapPin } from "lucide-react";
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
            link: house.link,
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
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="truncate text-2xl font-bold tracking-tight">
          {house.name}
        </h1>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
          <BadgeDollarSign className="size-4 shrink-0" aria-hidden />
          {formatPrice(Number(house.price), house.currency, locale)}
        </p>
        {house.address ? (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {house.address}
          </p>
        ) : null}
        {house.link ? (
          <a
            href={house.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden />
            {t("houseDetail.visitHousePage")}
          </a>
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
