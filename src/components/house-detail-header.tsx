"use client";

import { useState } from "react";
import { HouseForm } from "@/components/house-form";
import { buttonVariants } from "@/components/ui/button";
import type { House } from "@/lib/types";

export function HouseDetailHeader({ house }: { house: House }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <HouseForm
          mode="edit"
          house={{
            id: house.id,
            name: house.name,
            address: house.address,
            notes: house.notes,
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
        Edit
      </button>
    </div>
  );
}
