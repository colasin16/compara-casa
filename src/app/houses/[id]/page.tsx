import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteHouse } from "@/app/houses/actions";
import { HouseDetailHeader } from "@/components/house-detail-header";
import { HouseRatings } from "@/components/house-ratings";
import { ProsCons } from "@/components/pros-cons";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import type { Criterion, House, HousePoint, Rating } from "@/lib/types";

export default async function HouseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [houseRes, criteriaRes, ratingsRes, pointsRes] = await Promise.all([
    supabase.from("houses").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("criteria")
      .select("*")
      .order("weight", { ascending: false })
      .order("name", { ascending: true }),
    supabase.from("ratings").select("*").eq("house_id", id),
    supabase
      .from("house_points")
      .select("*")
      .eq("house_id", id)
      .order("position", { ascending: true }),
  ]);

  const house = houseRes.data as House | null;
  if (!house) notFound();

  const criteria = (criteriaRes.data ?? []) as Criterion[];
  const ratings = (ratingsRes.data ?? []) as Rating[];
  const points = (pointsRes.data ?? []) as HousePoint[];

  const initialScores: Record<string, number> = Object.fromEntries(
    ratings.map((r) => [r.criterion_id, Number(r.score)]),
  );

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to houses
        </Link>
      </div>

      <HouseDetailHeader house={house} />

      <div className="mt-8">
        <HouseRatings
          houseId={house.id}
          criteria={criteria}
          initialScores={initialScores}
        />
      </div>

      <section className="mt-10 border-t pt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Positives vs. negatives
          </h2>
          <p className="text-sm text-muted-foreground">
            Note what counts for or against this house. Drag a line to reorder
            it, or drag it across to the other list.
          </p>
        </div>
        <ProsCons houseId={house.id} initialPoints={points} />
      </section>

      <div className="mt-10 border-t pt-6">
        <form action={deleteHouse}>
          <input type="hidden" name="id" value={house.id} />
          <button
            type="submit"
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "text-destructive",
            })}
          >
            Delete this house
          </button>
        </form>
      </div>
    </main>
  );
}
