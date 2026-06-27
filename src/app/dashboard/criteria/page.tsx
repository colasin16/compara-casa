import { SlidersHorizontal } from "lucide-react";
import { seedDefaultCriteria } from "@/app/dashboard/criteria/actions";
import { AddCriterionDialog } from "@/components/add-criterion-dialog";
import { CriterionItem } from "@/components/criterion-item";
import { EmptyStateCard } from "@/components/empty-state-card";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
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
  const hasCriteria = criteria.length > 0;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("criteria.title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("criteria.subtitle")}</p>
        </div>
        {hasCriteria ? <AddCriterionDialog /> : null}
      </div>

      <div className="flex flex-col gap-3">
        {error ? (
          <p className="text-sm text-destructive">
            {t("criteria.loadError", { message: error.message })}
          </p>
        ) : !hasCriteria ? (
          <EmptyStateCard
            icon={SlidersHorizontal}
            title={t("criteria.emptyTitle")}
            description={t("criteria.emptyBody")}
            actions={
              <>
                <AddCriterionDialog label={t("criteria.emptyCreateCTA")} />
                <form action={seedDefaultCriteria}>
                  <SubmitButton
                    className={buttonVariants({ size: "sm", variant: "outline" })}
                  >
                    {t("criteria.addStarter")}
                  </SubmitButton>
                </form>
              </>
            }
          />
        ) : (
          criteria.map((criterion) => (
            <CriterionItem key={criterion.id} criterion={criterion} />
          ))
        )}
      </div>
    </main>
  );
}
