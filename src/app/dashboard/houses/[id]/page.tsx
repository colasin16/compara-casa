import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { deleteHouse } from "@/app/dashboard/houses/actions";
import { HouseDetailHeader } from "@/components/house-detail-header";
import { HouseNotes } from "@/components/house-notes";
import { HouseRatings } from "@/components/house-ratings";
import { ProsCons } from "@/components/pros-cons";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { createClient } from "@/lib/supabase/server";
import type {
	Criterion,
	House,
	HouseNote,
	HousePoint,
	Rating,
} from "@/lib/types";
import { getTranslations } from "@/lib/i18n/server";

export default async function HouseDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	const [houseRes, criteriaRes, ratingsRes, pointsRes, notesRes] =
		await Promise.all([
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
			supabase
				.from("house_notes")
				.select("*")
				.eq("house_id", id)
				.order("position", { ascending: true }),
		]);

	const house = houseRes.data as House | null;
	if (!house) notFound();

	const criteria = (criteriaRes.data ?? []) as Criterion[];
	const ratings = (ratingsRes.data ?? []) as Rating[];
	const points = (pointsRes.data ?? []) as HousePoint[];
	const notes = (notesRes.data ?? []) as HouseNote[];

	const initialScores: Record<string, number> = Object.fromEntries(
		ratings.map((r) => [r.criterion_id, Number(r.score)]),
	);

	const { t } = await getTranslations();

	return (
		<main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
			<div className="mb-6">
				<Link
					href="/dashboard"
					className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
				>
					<ChevronLeft className="size-4" aria-hidden />
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

			<section className="mt-10 border-t pt-8">
				<div className="mb-4">
					<h2 className="text-lg font-semibold tracking-tight">
						{t("prosCons.sectionTitle")}
					</h2>
					<p className="text-sm text-muted-foreground">
						{t("prosCons.sectionDescription")}
					</p>
				</div>
				<ProsCons houseId={house.id} initialPoints={points} />
			</section>

			<section className="mt-10 border-t pt-8">
				<div className="mb-4">
					<h2 className="text-lg font-semibold tracking-tight">
						{t("houseNotes.sectionTitle")}
					</h2>
					<p className="text-sm text-muted-foreground">
						{t("houseNotes.sectionDescription")}
					</p>
				</div>
				<HouseNotes houseId={house.id} initialNotes={notes} />
			</section>

			<div className="mt-10 border-t pt-6">
				<form action={deleteHouse}>
					<input type="hidden" name="id" value={house.id} />
					<SubmitButton
						className={buttonVariants({
							size: "sm",
							variant: "ghost",
							className: "text-destructive",
						})}
					>
						{t("houseDetail.deleteHouse")}
					</SubmitButton>
				</form>
			</div>
		</main>
	);
}
