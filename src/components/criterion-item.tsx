"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCriterion } from "@/app/criteria/actions";
import { CriterionForm } from "@/components/criterion-form";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Criterion } from "@/lib/types";
import { useTranslations } from "@/lib/i18n/context";
import { weightColor } from "@/lib/weight-color";

export function CriterionItem({ criterion }: { criterion: Criterion }) {
	const [editing, setEditing] = useState(false);
	const t = useTranslations();
	const weight = Number(criterion.weight);
	const color = weightColor(weight);

	return (
		<>
			<Card
				className="overflow-hidden"
				style={{ backgroundColor: color }}
			>
				<CardContent className="relative p-0">
					<div className="flex h-32 flex-col">
						<span
							aria-hidden
							className="pointer-events-none absolute inset-0 flex items-center justify-center text-9xl font-black leading-none select-none"
							style={{
								color,
								filter: "brightness(0.6) saturate(1.5)",
								opacity: 0.25,
							}}
						>
							{weight}
						</span>

						<div className="relative flex flex-1 items-center justify-center px-3 text-center">
							<span className="text-base font-semibold leading-snug">
								{criterion.name}
							</span>
						</div>

						<div className="relative flex items-center justify-evenly px-2 pt-1.5 pb-0">
							<button
								type="button"
								onClick={() => setEditing(true)}
								title={t("common.edit")}
								className="flex size-7 items-center justify-center rounded transition-opacity hover:opacity-70"
								style={{
									filter: "brightness(0.55) saturate(1.8)",
									color,
								}}
							>
								<Pencil size={20} />
							</button>
							<form action={deleteCriterion}>
								<input
									type="hidden"
									name="id"
									value={criterion.id}
								/>
								<button
									type="submit"
									title={t("common.delete")}
									className="flex size-7 items-center justify-center rounded text-red-600/70 transition-opacity hover:opacity-70 dark:text-red-400/80"
								>
									<Trash2 size={20} />
								</button>
							</form>
						</div>
					</div>
				</CardContent>
			</Card>

			<Dialog open={editing} onOpenChange={setEditing}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t("criteria.addCriterion")}</DialogTitle>
					</DialogHeader>
					<CriterionForm
						mode="edit"
						criterion={{
							id: criterion.id,
							name: criterion.name,
							weight,
						}}
						onDone={() => setEditing(false)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
