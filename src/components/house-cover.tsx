"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  removeHouseCover,
  uploadHouseCover,
  type HouseCoverState,
} from "@/app/houses/actions";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n/context";
import {
  COVER_IMAGE_ALLOWED_TYPES,
  type CoverImageError,
} from "@/lib/validation";

const ERROR_KEYS: Record<CoverImageError, string> = {
  noFile: "houseCover.errorNoFile",
  invalidType: "houseCover.errorInvalidType",
  tooLarge: "houseCover.errorTooLarge",
};

export function HouseCover({
  houseId,
  houseName,
  initialCoverUrl,
}: {
  houseId: string;
  houseName: string;
  initialCoverUrl: string | null;
}) {
  const t = useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(initialCoverUrl);
  const [pending, startTransition] = useTransition();

  function reportError(result: HouseCoverState) {
    if (result.errorCode) {
      toast.error(t(ERROR_KEYS[result.errorCode]));
    } else if (result.error) {
      toast.error(t("houseCover.errorGeneric", { error: result.error }));
    }
  }

  function handleFile(file: File) {
    const formData = new FormData();
    formData.set("houseId", houseId);
    formData.set("file", file);
    startTransition(async () => {
      const result = await uploadHouseCover(formData);
      if (result.ok) {
        // Reflect the new image immediately via a local preview; the
        // server-revalidated signed URL flows in on the next load.
        setCoverUrl(URL.createObjectURL(file));
      } else {
        reportError(result);
      }
    });
  }

  function handleRemove() {
    const formData = new FormData();
    formData.set("houseId", houseId);
    startTransition(async () => {
      const result = await removeHouseCover(formData);
      if (result.ok) {
        setCoverUrl(null);
      } else {
        reportError(result);
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept={COVER_IMAGE_ALLOWED_TYPES.join(",")}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          // Reset so selecting the same file again still fires onChange.
          event.target.value = "";
          if (file) handleFile(file);
        }}
      />

      {coverUrl ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={coverUrl}
            alt={t("houseCover.alt", { name: houseName })}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            unoptimized
          />
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus />
          {pending
            ? t("houseCover.uploading")
            : coverUrl
              ? t("houseCover.replace")
              : t("houseCover.add")}
        </Button>
        {coverUrl ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive"
            disabled={pending}
            onClick={handleRemove}
          >
            <Trash2 />
            {t("houseCover.remove")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
