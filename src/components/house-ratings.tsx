"use client";

import { useMemo, useState, useTransition } from "react";
import { rateCriterion } from "@/app/houses/actions";
import { Slider } from "@/components/ui/slider";
import { computeFinalScore, formatScore } from "@/lib/scoring";
import type { Criterion } from "@/lib/types";

type Props = {
  houseId: string;
  criteria: Criterion[];
  initialScores: Record<string, number>;
};

export function HouseRatings({ houseId, criteria, initialScores }: Props) {
  const [scores, setScores] = useState<Record<string, number>>(initialScores);
  const [, startTransition] = useTransition();

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
        You haven&apos;t defined any criteria yet. Add some on the{" "}
        <a href="/criteria" className="underline">
          Criteria
        </a>{" "}
        page first, then come back to score this house.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 rounded-2xl bg-primary/[0.08] px-6 py-5 ring-1 ring-primary/10">
        <div className="flex flex-col">
          <span className="font-heading text-5xl font-extrabold text-primary tabular-nums">
            {formatScore(result.finalScore)}
            <span className="text-xl font-semibold text-primary/50">/10</span>
          </span>
          <span className="mt-1 text-xs font-medium text-muted-foreground">
            Weighted final score
          </span>
        </div>
        <div className="ml-auto text-right text-xs font-medium text-muted-foreground">
          {rated} of {criteria.length} criteria rated
        </div>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {criteria.map((criterion) => {
          const score = scores[criterion.id] ?? 0;
          return (
            <li key={criterion.id} className="flex flex-col gap-2.5 py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{criterion.name}</span>
                  <span className="rounded-full bg-muted-foreground/[0.12] px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    weight {Number(criterion.weight)}
                  </span>
                </div>
                <span className="font-heading text-sm font-bold tabular-nums">
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
