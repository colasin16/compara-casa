import { Home } from "lucide-react";
import { ComparisonTable } from "@/components/comparison-table";
import { FeaturesComparison } from "@/components/features-comparison";
import { PointsComparison } from "@/components/points-comparison";
import { PriceComparison } from "@/components/price-comparison";
import { AddHouseDialog } from "@/components/add-house-dialog";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { getComparisonData } from "@/lib/queries";
import { getTranslations } from "@/lib/i18n/server";

export default async function ComparePage() {
  const { criteria, houses, pointsByHouseId, notesByHouseId, features } =
    await getComparisonData();
  const { t } = await getTranslations();

  const hasEnoughHouses = houses.length >= 2;

  return (
    <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("compare.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("compare.subtitle")}</p>
      </div>

      {!hasEnoughHouses ? (
        houses.length === 0 ? (
          <Card className="border border-dashed border-border bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted">
                <Home className="size-7 text-muted-foreground" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <CardTitle className="text-base font-semibold">
                  {t("compare.emptyNoHousesTitle")}
                </CardTitle>
                <p className="max-w-sm text-sm text-muted-foreground">
                  {t("compare.emptyNoHousesBody")}
                </p>
              </div>
              <AddHouseDialog label={t("compare.emptyNoHousesCTA")} />
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-dashed border-border bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted">
                <Home className="size-7 text-muted-foreground" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <CardTitle className="text-base font-semibold">
                  {t("compare.emptyOneHouseTitle")}
                </CardTitle>
                <p className="max-w-sm text-sm text-muted-foreground">
                  {t("compare.emptyOneHouseBody")}
                </p>
              </div>
              <AddHouseDialog label={t("compare.emptyOneHousesCTA")} />
            </CardContent>
          </Card>
        )
      ) : (
        <div className="flex flex-col gap-12">
          <section>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              {t("compare.priceTitle")}
            </h2>
            <PriceComparison houses={houses} />
          </section>

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
