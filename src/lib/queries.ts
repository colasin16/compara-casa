import { createClient } from "@/lib/supabase/server";
import { computeFinalScore } from "@/lib/scoring";
import type { Criterion, House, HouseNote, HousePoint, Rating } from "@/lib/types";

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

export type ComparisonCriterion = Criterion & {
  /** score per house_id (undefined when no rating exists) */
  scoreByHouseId: Record<string, number>;
};

/** A house's positives and negatives, each in display (position) order. */
export type HousePointsList = {
  pros: string[];
  cons: string[];
};

export type ComparisonData = {
  /** Criteria sorted by weight descending, then name */
  criteria: ComparisonCriterion[];
  /** Houses sorted by final score descending */
  houses: HouseWithScore[];
  /** Positives/negatives per house_id, in display order */
  pointsByHouseId: Record<string, HousePointsList>;
  /** Free-form notes per house_id, in display order */
  notesByHouseId: Record<string, string[]>;
};

/**
 * Loads everything needed for the comparison table:
 * criteria (with per-house scores), houses (with final scores), and each
 * house's positives/negatives, all sorted for display.
 */
export async function getComparisonData(): Promise<ComparisonData> {
  const supabase = await createClient();

  const [housesRes, criteriaRes, ratingsRes, pointsRes, notesRes] =
    await Promise.all([
      supabase.from("houses").select("*").order("created_at", { ascending: true }),
      supabase
        .from("criteria")
        .select("*")
        .order("weight", { ascending: false })
        .order("name", { ascending: true }),
      supabase.from("ratings").select("*"),
      supabase
        .from("house_points")
        .select("*")
        .order("position", { ascending: true }),
      supabase
        .from("house_notes")
        .select("*")
        .order("position", { ascending: true }),
    ]);

  const houses = (housesRes.data ?? []) as House[];
  const criteria = (criteriaRes.data ?? []) as Criterion[];
  const ratings = (ratingsRes.data ?? []) as Rating[];
  const points = (pointsRes.data ?? []) as HousePoint[];
  const notes = (notesRes.data ?? []) as HouseNote[];

  const weightById = new Map(criteria.map((c) => [c.id, Number(c.weight)]));

  // Build scored houses (same logic as getHousesWithScores)
  const scoredHouses: HouseWithScore[] = houses
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
      if (a.finalScore === null && b.finalScore === null) return 0;
      if (a.finalScore === null) return 1;
      if (b.finalScore === null) return -1;
      return b.finalScore - a.finalScore;
    });

  // Build criteria with per-house score maps
  const comparisonCriteria: ComparisonCriterion[] = criteria.map((c) => {
    const scoreByHouseId: Record<string, number> = {};
    for (const r of ratings) {
      if (r.criterion_id === c.id) {
        scoreByHouseId[r.house_id] = Number(r.score);
      }
    }
    return { ...c, scoreByHouseId };
  });

  // Group positives/negatives per house in display order (points are already
  // sorted by position from the query above).
  const pointsByHouseId: Record<string, HousePointsList> = {};
  for (const house of houses) {
    pointsByHouseId[house.id] = { pros: [], cons: [] };
  }
  for (const point of points) {
    const list = pointsByHouseId[point.house_id];
    if (!list) continue;
    if (point.kind === "con") list.cons.push(point.body);
    else list.pros.push(point.body);
  }

  // Group free-form notes per house in display order (notes are already sorted
  // by position from the query above).
  const notesByHouseId: Record<string, string[]> = {};
  for (const house of houses) {
    notesByHouseId[house.id] = [];
  }
  for (const note of notes) {
    const list = notesByHouseId[note.house_id];
    if (!list) continue;
    list.push(note.body);
  }

  return {
    criteria: comparisonCriteria,
    houses: scoredHouses,
    pointsByHouseId,
    notesByHouseId,
  };
}
