import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteHouse } from "@/app/houses/actions";
import { HouseDetailHeader } from "@/components/house-detail-header";
import { HouseRatings } from "@/components/house-ratings";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import type { Criterion, House, Rating } from "@/lib/types";
import { getTranslations } from "@/lib/i18n/server";

export default async function HouseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [houseRes, criteriaRes, ratingsRes] = await Promise.all([
    supabase.from("houses").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("criteria")
      .select("*")
      .order("weight", { ascending: false })
      .order("name", { ascending: true }),
    supabase.from("ratings").select("*").eq("house_id", id),
  ]);

  const house = houseRes.data as House | null;
  if (!house) notFound();

  const criteria = (criteriaRes.data ?? []) as Criterion[];
  const ratings = (ratingsRes.data ?? []) as Rating[];

  const initialScores: Record<string, number> = Object.fromEntries(
    ratings.map((r) => [r.criterion_id, Number(r.score)]),
  );

  const { t } = await getTranslations();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {t("houseDetail.back")}
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
            {t("houseDetail.deleteHouse")}
          </button>
        </form>
      </div>
    </main>
  );
}
