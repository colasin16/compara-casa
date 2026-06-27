"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { HouseForm } from "@/components/house-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "@/lib/i18n/context";

interface AddHouseDialogProps {
  label?: string;
}

export function AddHouseDialog({ label }: AddHouseDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const triggerLabel = label ?? t("dashboard.addHouse");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <Plus className="size-3.5" aria-hidden />
        {triggerLabel}
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>{t("dashboard.addHouse")}</DialogTitle>
        </DialogHeader>
        <HouseForm mode="create" onDone={() => setOpen(false)} />
      </DialogPopup>
    </Dialog>
  );
}
