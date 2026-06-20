export type ScoredCriterion = {
  weight: number;
  score: number;
};

export type ScoreResult = {
  /** Weighted average normalized to 0-10, or null when it cannot be computed. */
  finalScore: number | null;
  /** Number of criteria that contributed to the score (rated, weight > 0). */
  contributing: number;
};

/**
 * Computes a house's final score as a weighted average of its rated criteria,
 * normalized to the 0-10 range.
 *
 * Rules:
 * - Criteria with no rating are ignored (excluded from numerator and denominator).
 * - Criteria with weight 0 do not influence the result.
 * - If the total weight of contributing criteria is 0, returns null.
 */
export function computeFinalScore(items: ScoredCriterion[]): ScoreResult {
  let weightedSum = 0;
  let totalWeight = 0;
  let contributing = 0;

  for (const { weight, score } of items) {
    if (weight <= 0) continue;
    weightedSum += score * weight;
    totalWeight += weight;
    contributing += 1;
  }

  if (totalWeight === 0) {
    return { finalScore: null, contributing: 0 };
  }

  return { finalScore: weightedSum / totalWeight, contributing };
}

/** Formats a 0–10 score for display, e.g. 7.3, or "—" when null. */
export function formatScore(score: number | null): string {
  if (score === null) return "—";
  return (Math.round(score * 10) / 10).toFixed(1);
}
