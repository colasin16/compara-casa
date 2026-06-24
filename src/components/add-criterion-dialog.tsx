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

export function AddCriterionDialog() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <Plus className="size-3.5" aria-hidden />
        {t("criteria.addCriterion")}
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
