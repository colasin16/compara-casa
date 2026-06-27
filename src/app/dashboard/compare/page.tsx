import { Home } from "lucide-react";
import { ComparisonTable } from "@/components/comparison-table";
import { EmptyStateCard } from "@/components/empty-state-card";
import { FeaturesComparison } from "@/components/features-comparison";
import { PointsComparison } from "@/components/points-comparison";
import { PriceComparison } from "@/components/price-comparison";
import { AddHouseDialog } from "@/components/add-house-dialog";
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
          <EmptyStateCard
            icon={Home}
            title={t("compare.emptyNoHousesTitle")}
            description={t("compare.emptyNoHousesBody")}
            actions={<AddHouseDialog label={t("compare.emptyNoHousesCTA")} />}
          />
        ) : (
          <EmptyStateCard
            icon={Home}
            title={t("compare.emptyOneHouseTitle")}
            description={t("compare.emptyOneHouseBody")}
            actions={<AddHouseDialog label={t("compare.emptyOneHousesCTA")} />}
          />
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
