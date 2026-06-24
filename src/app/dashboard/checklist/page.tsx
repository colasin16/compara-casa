import { seedDefaultChecklist } from "@/app/dashboard/checklist/actions";
import { AddChecklistItemDialog } from "@/components/add-checklist-item-dialog";
import { ChecklistItemRow } from "@/components/checklist-item-row";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { ChecklistItem } from "@/lib/types";
import { getTranslations } from "@/lib/i18n/server";

export default async function ChecklistPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("checklist_items")
    .select("*")
    .order("created_at", { ascending: true })
    .order("name", { ascending: true });

  const items = (data ?? []) as ChecklistItem[];
  const { t } = await getTranslations();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("checklist.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("checklist.subtitle")}
          </p>
        </div>
        <AddChecklistItemDialog />
      </div>

      <div className="flex flex-col gap-3">
        {error ? (
          <p className="text-sm text-destructive">
            {t("checklist.loadError", { message: error.message })}
          </p>
        ) : items.length === 0 ? (
          <Card className="border border-dashed border-border bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-medium text-muted-foreground">
                {t("checklist.emptyTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
              <p>{t("checklist.emptyBody")}</p>
              <form action={seedDefaultChecklist}>
                <button type="submit" className={buttonVariants({ size: "sm" })}>
                  {t("checklist.addStarter")}
                </button>
              </form>
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <ChecklistItemRow key={item.id} item={item} />
          ))
        )}
      </div>
    </main>
  );
}
