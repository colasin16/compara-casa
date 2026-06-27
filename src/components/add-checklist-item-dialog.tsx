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

interface AddChecklistItemDialogProps {
  label?: string;
}

export function AddChecklistItemDialog({ label }: AddChecklistItemDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const triggerLabel = label ?? t("checklist.addItem");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <Plus className="size-3.5" aria-hidden />
        {triggerLabel}
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
