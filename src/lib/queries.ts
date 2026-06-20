import { createClient } from "@/lib/supabase/server";
import { computeFinalScore } from "@/lib/scoring";
import type { Criterion, House, Rating } from "@/lib/types";

export type HouseWithScore = House & {
  finalScore: number | null;
  rated: number;
  totalCriteria: number;
};

/**
 * Loads the current user's houses together with their weighted final score,
 * computed from the user's criteria weights and per-house ratings.
 */
export async function getHousesWithScores(): Promise<HouseWithScore[]> {
  const supabase = await createClient();

  const [housesRes, criteriaRes, ratingsRes] = await Promise.all([
    supabase.from("houses").select("*").order("created_at", { ascending: true }),
    supabase.from("criteria").select("*"),
    supabase.from("ratings").select("*"),
  ]);

  const houses = (housesRes.data ?? []) as House[];
  const criteria = (criteriaRes.data ?? []) as Criterion[];
  const ratings = (ratingsRes.data ?? []) as Rating[];

  const weightById = new Map(criteria.map((c) => [c.id, Number(c.weight)]));

  return houses
    .map((house) => {
      const houseRatings = ratings.filter((r) => r.house_id === house.id);
      const scored = houseRatings
        .filter((r) => weightById.has(r.criterion_id))
        .map((r) => ({
          weight: weightById.get(r.criterion_id)!,
          score: Number(r.score),
        }));

      const { finalScore } = computeFinalScore(scored);

      return {
        ...house,
        finalScore,
        rated: houseRatings.length,
        totalCriteria: criteria.length,
      };
    })
    .sort((a, b) => {
      // Highest score first; unscored houses sink to the bottom.
      if (a.finalScore === null && b.finalScore === null) return 0;
      if (a.finalScore === null) return 1;
      if (b.finalScore === null) return -1;
      return b.finalScore - a.finalScore;
    });
}
