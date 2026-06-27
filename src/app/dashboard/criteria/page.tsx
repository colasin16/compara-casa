import { SlidersHorizontal } from "lucide-react";
import { seedDefaultCriteria } from "@/app/dashboard/criteria/actions";
import { AddCriterionDialog } from "@/components/add-criterion-dialog";
import { CriterionItem } from "@/components/criterion-item";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Criterion } from "@/lib/types";
import { getTranslations } from "@/lib/i18n/server";

export default async function CriteriaPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("criteria")
    .select("*")
    .order("weight", { ascending: false })
    .order("name", { ascending: true });

  const criteria = (data ?? []) as Criterion[];
  const { t } = await getTranslations();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("criteria.title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("criteria.subtitle")}</p>
        </div>
        <AddCriterionDialog />
      </div>

      <div className="flex flex-col gap-3">
        {error ? (
          <p className="text-sm text-destructive">
            {t("criteria.loadError", { message: error.message })}
          </p>
        ) : criteria.length === 0 ? (
          <Card className="border border-dashed border-border bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted">
                <SlidersHorizontal
                  className="size-7 text-muted-foreground"
                  aria-hidden
                />
              </span>
              <div className="flex flex-col gap-1">
                <CardTitle className="text-base font-semibold">
                  {t("criteria.emptyTitle")}
                </CardTitle>
                <p className="max-w-sm text-sm text-muted-foreground">
                  {t("criteria.emptyBody")}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <AddCriterionDialog label={t("criteria.emptyCreateCTA")} />
                <form action={seedDefaultCriteria}>
                  <SubmitButton
                    className={buttonVariants({ size: "sm", variant: "outline" })}
                  >
                    {t("criteria.addStarter")}
                  </SubmitButton>
                </form>
              </div>
            </CardContent>
          </Card>
        ) : (
          criteria.map((criterion) => (
            <CriterionItem key={criterion.id} criterion={criterion} />
          ))
        )}
      </div>
    </main>
  );
}
