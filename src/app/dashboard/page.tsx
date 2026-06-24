import Link from "next/link";
import { AddHouseDialog } from "@/components/add-house-dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getHousesWithScores } from "@/lib/queries";
import { formatScore } from "@/lib/scoring";
import { formatPrice } from "@/lib/currency";
import { getTranslations } from "@/lib/i18n/server";

export default async function DashboardPage() {
  const houses = await getHousesWithScores();
  const { t, locale } = await getTranslations();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("dashboard.title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>
        <AddHouseDialog />
      </div>

      <div className="flex flex-col gap-3">
        {houses.length === 0 ? (
          <Card className="border border-dashed border-border bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-medium text-muted-foreground">
                {t("dashboard.emptyTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {t("dashboard.emptyBodyBefore")}
              <Link href="/dashboard/criteria" className="underline">
                {t("dashboard.emptyBodyLink")}
              </Link>
              {t("dashboard.emptyBodyAfter")}
            </CardContent>
          </Card>
        ) : (
          houses.map((house, index) => (
            <Link
              key={house.id}
              href={`/dashboard/houses/${house.id}`}
              className="group"
            >
              <Card className="transition-shadow group-hover:shadow-dropdown">
                <CardContent className="flex items-center gap-4 py-1">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-sm font-bold text-muted-foreground tabular-nums">
                    {index + 1}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-semibold">{house.name}</span>
                    <span className="truncate text-xs font-semibold text-primary">
                      {formatPrice(Number(house.price), house.currency, locale)}
                    </span>
                    {house.address ? (
                      <span className="truncate text-xs text-muted-foreground">
                        {house.address}
                      </span>
                    ) : null}
                    <span className="text-xs text-muted-foreground">
                      {t("dashboard.criteriaRated", {
                        rated: house.rated,
                        total: house.totalCriteria,
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-heading text-3xl font-extrabold text-primary tabular-nums">
                      {formatScore(house.finalScore)}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {t("dashboard.score")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
