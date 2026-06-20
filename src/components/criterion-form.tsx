"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
	createCriterion,
	updateCriterion,
	type CriterionFormState,
} from "@/app/criteria/actions";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/lib/i18n/context";
import { weightColor } from "@/lib/weight-color";

const initialState: CriterionFormState = {};

type Props = {
	mode: "create" | "edit";
	criterion?: { id: string; name: string; weight: number };
	onDone?: () => void;
};

export function CriterionForm({ mode, criterion, onDone }: Props) {
	const action = mode === "create" ? createCriterion : updateCriterion;
	const [state, formAction, pending] = useActionState(action, initialState);
	const [weight, setWeight] = useState(criterion?.weight ?? 5);
	const formRef = useRef<HTMLFormElement>(null);
	const t = useTranslations();

	useEffect(() => {
		if (!state.ok) return;
		if (mode === "create") {
			formRef.current?.reset();
		}
		onDone?.();
	}, [state.ok, mode, onDone]);

	return (
		<form ref={formRef} action={formAction} className="flex flex-col gap-3">
			{criterion ? (
				<input type="hidden" name="id" value={criterion.id} />
			) : null}

			<div className="flex flex-col gap-1.5">
				<Label htmlFor={`name-${mode}-${criterion?.id ?? "new"}`}>
					{t("criterionForm.name")}
				</Label>
				<Input
					id={`name-${mode}-${criterion?.id ?? "new"}`}
					name="name"
					placeholder={t("criterionForm.namePlaceholder")}
					defaultValue={criterion?.name ?? ""}
					maxLength={60}
					required
				/>
			</div>

			<div className="flex flex-col gap-1.5">
				<div className="flex items-center justify-between">
					<Label>{t("criterionForm.weight")}</Label>
					<span className="text-sm font-medium tabular-nums">
						{weight}
					</span>
				</div>
				<input type="hidden" name="weight" value={weight} />
				<div className="flex gap-2">
					{Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
						<button
							key={n}
							type="button"
							onClick={() => setWeight(n)}
							style={{ backgroundColor: weightColor(n) }}
							className={`flex h-8 min-w-0 flex-1 items-center justify-center rounded text-xs font-semibold transition-all ${
								weight === n
									? "ring-2 ring-green-700 ring-offset-1 scale-110"
									: "opacity-80 hover:opacity-100"
							}`}
						>
							{n}
						</button>
					))}
				</div>
			</div>

			{state.error ? (
				<p className="text-sm text-destructive" aria-live="polite">
					{state.error}
				</p>
			) : null}

			<div className="flex items-center gap-2">
				<button
					type="submit"
					disabled={pending}
					className={buttonVariants({ size: "sm" })}
				>
					{mode === "create"
						? t("criterionForm.add")
						: t("common.save")}
				</button>
				{mode === "edit" && onDone ? (
					<button
						type="button"
						onClick={onDone}
						className={buttonVariants({
							size: "sm",
							variant: "ghost",
						})}
					>
						{t("common.cancel")}
					</button>
				) : null}
			</div>
		</form>
	);
}
