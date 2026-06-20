import { z } from "zod";

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

export const DEFAULT_CRITERIA: { name: string; weight: number }[] = [
  { name: "Location", weight: 9 },
  { name: "Price", weight: 9 },
  { name: "Condition", weight: 8 },
  { name: "Lighting / Orientation", weight: 7 },
  { name: "Parking", weight: 6 },
  { name: "Terrace", weight: 5 },
];
