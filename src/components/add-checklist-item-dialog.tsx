"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ChecklistItemForm } from "@/components/checklist-item-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "@/lib/i18n/context";

export function AddChecklistItemDialog() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <Plus className="size-3.5" aria-hidden />
        {t("checklist.addItem")}
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>{t("checklist.addItem")}</DialogTitle>
        </DialogHeader>
        <ChecklistItemForm mode="create" onDone={() => setOpen(false)} />
      </DialogPopup>
    </Dialog>
  );
}
