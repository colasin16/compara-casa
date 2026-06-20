import { seedDefaultCriteria } from "@/app/criteria/actions";
import { CriterionForm } from "@/components/criterion-form";
import { CriterionItem } from "@/components/criterion-item";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Criterion } from "@/lib/types";

export default async function CriteriaPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("criteria")
    .select("*")
    .order("weight", { ascending: false })
    .order("name", { ascending: true });

  const criteria = (data ?? []) as Criterion[];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Your criteria</h1>
        <p className="text-sm text-muted-foreground">
          Define the aspects you care about and how much each one matters
          (weight 0–10). These are reused to score every house.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_320px] md:items-start">
        <div className="flex flex-col gap-3">
          {error ? (
            <p className="text-sm text-destructive">
              Couldn&apos;t load criteria: {error.message}
            </p>
          ) : criteria.length === 0 ? (
            <Card className="border border-dashed border-border bg-transparent shadow-none">
              <CardHeader>
                <CardTitle className="text-base font-medium text-muted-foreground">
                  No criteria yet
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
                <p>
                  Start from a common set of house-hunting criteria, then tweak
                  the weights to match what matters to you.
                </p>
                <form action={seedDefaultCriteria}>
                  <button type="submit" className={buttonVariants({ size: "sm" })}>
                    Add starter criteria
                  </button>
                </form>
              </CardContent>
            </Card>
          ) : (
            criteria.map((criterion) => (
              <CriterionItem key={criterion.id} criterion={criterion} />
            ))
          )}
        </div>

        <Card className="md:sticky md:top-20">
          <CardHeader>
            <CardTitle className="text-base">Add a criterion</CardTitle>
          </CardHeader>
          <CardContent>
            <CriterionForm mode="create" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
