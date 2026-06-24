import Link from "next/link";
import { ComparisonTable } from "@/components/comparison-table";
import { FeaturesComparison } from "@/components/features-comparison";
import { PointsComparison } from "@/components/points-comparison";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getComparisonData } from "@/lib/queries";
import { getTranslations } from "@/lib/i18n/server";

export default async function ComparePage() {
  const { criteria, houses, pointsByHouseId, notesByHouseId, features } =
    await getComparisonData();
  const { t } = await getTranslations();

  const isEmpty = houses.length === 0 || criteria.length === 0;

  return (
    <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("compare.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("compare.subtitle")}</p>
      </div>

      {isEmpty ? (
        <Card className="border border-dashed border-border bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-medium text-muted-foreground">
              {t("compare.emptyTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t("compare.emptyBodyBefore")}
            <Link href="/dashboard/criteria" className="underline">
              {t("compare.emptyBodyLink")}
            </Link>
            {t("compare.emptyBodyAfter")}
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-12">
          <section>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              {t("compare.scoresTitle")}
            </h2>
            <ComparisonTable criteria={criteria} houses={houses} />
          </section>

          <section>
            <h2 className="mb-1 text-lg font-semibold tracking-tight">
              {t("compare.featuresTitle")}
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {t("compare.featuresSubtitle")}
            </p>
            <FeaturesComparison houses={houses} features={features} />
          </section>

          <PointsComparison
            houses={houses}
            pointsByHouseId={pointsByHouseId}
            notesByHouseId={notesByHouseId}
          />
        </div>
      )}
    </main>
  );
}
