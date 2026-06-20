import { z } from "zod";

import type { Locale } from "@/lib/i18n/config";

export const criterionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(60, "Name must be 60 characters or fewer"),
  weight: z.coerce
    .number()
    .min(0, "Weight must be between 0 and 10")
    .max(10, "Weight must be between 0 and 10"),
});

export type CriterionInput = z.infer<typeof criterionSchema>;

export const houseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(80, "Name must be 80 characters or fewer"),
  address: z
    .string()
    .trim()
    .max(200, "Address must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be 1000 characters or fewer")
    .optional()
    .or(z.literal("")),
});

export type HouseInput = z.infer<typeof houseSchema>;

export const housePointSchema = z.object({
  id: z.string().uuid(),
  kind: z.enum(["pro", "con"]),
  body: z
    .string()
    .trim()
    .min(1, "A line cannot be empty")
    .max(300, "A line must be 300 characters or fewer"),
});

export const housePointsSchema = z
  .array(housePointSchema)
  .max(200, "Too many lines");

export type HousePointInput = z.infer<typeof housePointSchema>;

// ---------------------------------------------------------------------------
// Cover image upload constraints. Enforced server-side; the client may mirror
// them for a nicer UX but must never be trusted as the source of truth.
// ---------------------------------------------------------------------------
export const COVER_IMAGE_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export const COVER_IMAGE_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type CoverImageError = "noFile" | "invalidType" | "tooLarge";

/**
 * Validates an uploaded cover image's MIME type and size. Returns `null` when
 * the file is acceptable, or a stable error code the UI can localize.
 */
export function validateCoverImage(file: File | null): CoverImageError | null {
  if (!file || file.size === 0) return "noFile";
  if (
    !(COVER_IMAGE_ALLOWED_TYPES as readonly string[]).includes(file.type)
  ) {
    return "invalidType";
  }
  if (file.size > COVER_IMAGE_MAX_BYTES) return "tooLarge";
  return null;
}


export const DEFAULT_CRITERIA: Record<
  Locale,
  { name: string; weight: number }[]
> = {
  en: [
    { name: "Location", weight: 9 },
    { name: "Price", weight: 9 },
    { name: "Condition", weight: 8 },
    { name: "Lighting / Orientation", weight: 7 },
    { name: "Parking", weight: 6 },
    { name: "Terrace", weight: 5 },
  ],
  es: [
    { name: "Ubicación", weight: 9 },
    { name: "Precio", weight: 9 },
    { name: "Estado", weight: 8 },
    { name: "Iluminación / Orientación", weight: 7 },
    { name: "Parking", weight: 6 },
    { name: "Terraza", weight: 5 },
  ],
};
