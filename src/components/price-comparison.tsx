"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import { useLocale } from "@/lib/i18n/context";
import type { HouseWithScore } from "@/lib/queries";

type Props = {
	houses: HouseWithScore[];
};

/**
 * A dead-simple horizontal bar showing each house's name and price side by
 * side, in the same order as the score table. It is meant to be the very
 * first thing seen on the comparison screen for an at-a-glance price compare.
 */
export function PriceComparison({ houses }: Props) {
	const locale = useLocale();

	if (houses.length === 0) return null;

	return (
		<div className="flex gap-3 overflow-x-auto pb-1">
			{houses.map((house, index) => (
				<Link
					key={house.id}
					href={`/dashboard/houses/${house.id}`}
					className="group flex min-w-[10rem] flex-1 flex-col items-center gap-1 rounded-xl border border-border bg-card px-4 py-3 text-center transition-shadow hover:shadow-dropdown"
				>
					<span className="flex items-center gap-1.5">
						<span className="inline-flex size-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
							{index + 1}
						</span>
						<span className="max-w-[8rem] truncate text-sm font-semibold text-foreground group-hover:text-primary">
							{house.name}
						</span>
					</span>
					<span className="font-heading text-lg font-extrabold tabular-nums text-primary">
						{formatPrice(Number(house.price), house.currency, locale)}
					</span>
				</Link>
			))}
		</div>
	);
}
