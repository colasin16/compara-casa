"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteHouse } from "@/app/dashboard/houses/actions";
import { buttonVariants } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogHeader,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitButton } from "@/components/ui/submit-button";
import { useTranslations } from "@/lib/i18n/context";

export function DeleteHouseDialog({ houseId }: { houseId: string }) {
	const [open, setOpen] = useState(false);
	const t = useTranslations();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				className={buttonVariants({
					size: "sm",
					variant: "ghost",
					className: "text-destructive",
				})}
			>
				{t("houseDetail.deleteHouse")}
			</DialogTrigger>
			<DialogPopup>
				<DialogHeader>
					<DialogTitle>{t("houseDetail.deleteConfirmTitle")}</DialogTitle>
					<DialogDescription>
						{t("houseDetail.deleteConfirmDescription")}
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-end gap-2">
					<DialogClose
						className={buttonVariants({ size: "sm", variant: "outline" })}
					>
						{t("common.cancel")}
					</DialogClose>
					<form action={deleteHouse}>
						<input type="hidden" name="id" value={houseId} />
						<SubmitButton
							icon={<Trash2 className="size-3.5" aria-hidden />}
							className={buttonVariants({
								size: "sm",
								variant: "destructive",
							})}
						>
							{t("houseDetail.deleteConfirm")}
						</SubmitButton>
					</form>
				</div>
			</DialogPopup>
		</Dialog>
	);
}
