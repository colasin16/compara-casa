"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";
import type { ComparisonFeature, HouseWithScore } from "@/lib/queries";

type Props = {
	houses: HouseWithScore[];
	features: ComparisonFeature[];
};

/** Side-by-side table of which features each house has. */
export function FeaturesComparison({ houses, features }: Props) {
	const t = useTranslations();

	if (features.length === 0) {
		return (
			<p className="text-sm text-muted-foreground">
				{t("compare.featuresEmptyBefore")}
				<Link href="/dashboard/checklist" className="underline">
					{t("compare.featuresEmptyLink")}
				</Link>
				{t("compare.featuresEmptyAfter")}
			</p>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr className="border-b border-border bg-[color-mix(in_srgb,var(--muted)_50%,var(--background))]">
						<th className="sticky left-0 z-10 min-w-[10rem] bg-[color-mix(in_srgb,var(--muted)_50%,var(--background))] px-4 py-3 text-left font-semibold text-foreground">
							{t("compare.featureColumn")}
						</th>
						{houses.map((house, index) => (
							<th
								key={house.id}
								className="min-w-[8rem] px-3 py-3 text-center font-semibold text-foreground"
							>
								<Link
									href={`/dashboard/houses/${house.id}`}
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
					{features.map((feature) => (
						<tr
							key={feature.id}
							className="border-b border-border last:border-0 odd:bg-background even:bg-[color-mix(in_srgb,var(--muted)_20%,var(--background))]"
						>
							<td className="sticky left-0 z-10 bg-inherit px-4 py-3 font-medium text-foreground">
								{feature.name}
							</td>
							{houses.map((house) => {
								const has =
									feature.checkedByHouseId[house.id] ?? false;
								return (
									<td
										key={house.id}
										className="px-3 py-3 text-center"
									>
										{has ? (
											<span
												title={t("compare.featureHas")}
												className="inline-flex size-7 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
											>
												<Check
													className="size-4"
													aria-hidden
												/>
												<span className="sr-only">
													{t("compare.featureHas")}
												</span>
											</span>
										) : (
											<span
												title={t(
													"compare.featureMissing",
												)}
												className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground/60"
											>
												<X
													className="size-4"
													aria-hidden
												/>
												<span className="sr-only">
													{t("compare.featureMissing")}
												</span>
											</span>
										)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
