"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CriterionForm } from "@/components/criterion-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "@/lib/i18n/context";

interface AddCriterionDialogProps {
  label?: string;
}

export function AddCriterionDialog({ label }: AddCriterionDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const triggerLabel = label ?? t("criteria.addCriterion");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <Plus className="size-3.5" aria-hidden />
        {triggerLabel}
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>{t("criteria.addCriterion")}</DialogTitle>
        </DialogHeader>
        <CriterionForm mode="create" onDone={() => setOpen(false)} />
      </DialogPopup>
    </Dialog>
  );
}
