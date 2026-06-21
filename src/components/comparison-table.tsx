"use client";

import Link from "next/link";
import { formatScore } from "@/lib/scoring";
import { useTranslations } from "@/lib/i18n/context";
import type { ComparisonCriterion, HouseWithScore } from "@/lib/queries";
import { cn } from "@/lib/utils";

type Props = {
  criteria: ComparisonCriterion[];
  houses: HouseWithScore[];
};

/**
 * Returns a Tailwind background + text class pair based on a 0–10 score.
 * Higher scores are greener, lower scores are redder.
 */
function scoreColorClass(score: number): string {
  if (score >= 8) return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
  if (score >= 6) return "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300";
  if (score >= 4) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
  if (score >= 2) return "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300";
  return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
}

export function ComparisonTable({ criteria, houses }: Props) {
  const t = useTranslations();

  if (houses.length === 0 || criteria.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("compare.emptyBodyBefore")}
        <Link href="/criteria" className="underline">
          {t("compare.emptyBodyLink")}
        </Link>
        {t("compare.emptyBodyAfter")}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="sticky left-0 z-10 min-w-[10rem] bg-muted/50 px-4 py-3 text-left font-semibold text-foreground">
              {t("compare.criterionColumn")}
            </th>
            <th className="px-3 py-3 text-center font-semibold text-muted-foreground">
              {t("compare.weightColumn")}
            </th>
            {houses.map((house, index) => (
              <th
                key={house.id}
                className="min-w-[8rem] px-3 py-3 text-center font-semibold text-foreground"
              >
                <Link
                  href={`/houses/${house.id}`}
                  className="group flex flex-col items-center gap-0.5 hover:text-primary"
                >
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="max-w-[7rem] truncate text-xs font-semibold">
                    {house.name}
                  </span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion) => {
            const scores = houses.map(
              (h) => criterion.scoreByHouseId[h.id] ?? null,
            );
            const validScores = scores.filter((s): s is number => s !== null);
            const maxScore =
              validScores.length > 0 ? Math.max(...validScores) : null;

            return (
              <tr
                key={criterion.id}
                className="border-b border-border last:border-0 odd:bg-background even:bg-muted/20"
              >
                <td className="sticky left-0 z-10 bg-inherit px-4 py-3 font-medium text-foreground">
                  {criterion.name}
                </td>
                <td className="px-3 py-3 text-center tabular-nums text-muted-foreground">
                  {Number(criterion.weight)}
                </td>
                {houses.map((house) => {
                  const score = criterion.scoreByHouseId[house.id] ?? null;
                  const isBest =
                    score !== null &&
                    maxScore !== null &&
                    score === maxScore &&
                    validScores.filter((s) => s === maxScore).length === 1;

                  return (
                    <td key={house.id} className="px-3 py-3 text-center">
                      {score === null ? (
                        <span className="text-muted-foreground/50">
                          {t("compare.unrated")}
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "inline-flex min-w-[2.5rem] items-center justify-center rounded-lg px-2 py-0.5 font-heading text-sm font-bold tabular-nums",
                            scoreColorClass(score),
                            isBest &&
                              "ring-2 ring-green-500 dark:ring-green-400",
                          )}
                        >
                          {score}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-border bg-muted/50 font-semibold">
            <td
              className="sticky left-0 z-10 bg-muted/50 px-4 py-3 font-semibold text-foreground"
              colSpan={2}
            >
              {t("compare.finalScore")}
            </td>
            {houses.map((house) => {
              const score = house.finalScore;
              const allFinalScores = houses
                .map((h) => h.finalScore)
                .filter((s): s is number => s !== null);
              const maxFinal =
                allFinalScores.length > 0
                  ? Math.max(...allFinalScores)
                  : null;
              const isBest =
                score !== null &&
                maxFinal !== null &&
                score === maxFinal &&
                allFinalScores.filter((s) => s === maxFinal).length === 1;

              return (
                <td key={house.id} className="px-3 py-3 text-center">
                  {score === null ? (
                    <span className="text-muted-foreground/50">
                      {t("compare.unrated")}
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "inline-flex min-w-[2.5rem] items-center justify-center rounded-lg px-2 py-0.5 font-heading text-sm font-bold tabular-nums",
                        scoreColorClass(score),
                        isBest && "ring-2 ring-green-500 dark:ring-green-400",
                      )}
                    >
                      {formatScore(score)}
                    </span>
                  )}
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
