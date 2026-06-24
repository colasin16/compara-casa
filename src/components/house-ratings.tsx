"use client";

import { useMemo, useState, useTransition } from "react";
import { rateCriterion } from "@/app/dashboard/houses/actions";
import { Slider } from "@/components/ui/slider";
import { computeFinalScore, formatScore } from "@/lib/scoring";
import type { Criterion } from "@/lib/types";
import { useTranslations } from "@/lib/i18n/context";

type Props = {
  houseId: string;
  criteria: Criterion[];
  initialScores: Record<string, number>;
};

export function HouseRatings({ houseId, criteria, initialScores }: Props) {
  const [scores, setScores] = useState<Record<string, number>>(initialScores);
  const [, startTransition] = useTransition();
  const t = useTranslations();

  const result = useMemo(
    () =>
      computeFinalScore(
        criteria.map((c) => ({
          weight: Number(c.weight),
          score: scores[c.id] ?? 0,
        })),
      ),
    [criteria, scores],
  );

  const rated = criteria.filter((c) => c.id in scores).length;

  function persist(criterionId: string, score: number) {
    const formData = new FormData();
    formData.set("houseId", houseId);
    formData.set("criterionId", criterionId);
    formData.set("score", String(score));
    startTransition(() => {
      void rateCriterion(formData);
    });
  }

  if (criteria.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("ratings.noCriteriaBefore")}
        <a href="/dashboard/criteria" className="underline">
          {t("ratings.noCriteriaLink")}
        </a>
        {t("ratings.noCriteriaAfter")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 rounded-2xl bg-primary/[0.08] px-4 py-4 ring-1 ring-primary/10 sm:px-6 sm:py-5">
        <div className="flex flex-col">
          <span className="font-heading text-4xl font-extrabold text-primary tabular-nums sm:text-5xl">
            {formatScore(result.finalScore)}
            <span className="text-lg font-semibold text-primary/50 sm:text-xl">
              /10
            </span>
          </span>
          <span className="mt-1 text-xs font-medium text-muted-foreground">
            {t("ratings.finalScore")}
          </span>
        </div>
        <div className="ml-auto max-w-[40%] text-right text-xs font-medium text-balance text-muted-foreground">
          {t("ratings.criteriaRated", {
            rated,
            total: criteria.length,
          })}
        </div>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {criteria.map((criterion) => {
          const score = scores[criterion.id] ?? 0;
          return (
            <li key={criterion.id} className="flex flex-col gap-2.5 py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate font-semibold">
                    {criterion.name}
                  </span>
                  <span className="shrink-0 rounded-full bg-muted-foreground/[0.12] px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {t("ratings.weight", { weight: Number(criterion.weight) })}
                  </span>
                </div>
                <span className="shrink-0 font-heading text-sm font-bold tabular-nums">
                  {score}
                </span>
              </div>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[score]}
                onValueChange={(value) =>
                  setScores((prev) => ({
                    ...prev,
                    [criterion.id]: Array.isArray(value) ? value[0] : value,
                  }))
                }
                onValueCommitted={(value) =>
                  persist(
                    criterion.id,
                    Array.isArray(value) ? value[0] : (value as number),
                  )
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
