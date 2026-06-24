import { z } from "zod";

import type { Locale } from "@/lib/i18n/config";

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address");

const passwordField = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(72, "Password must be 72 characters or fewer");

export const authSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type AuthInput = z.infer<typeof authSchema>;

export const signUpSchema = z
  .object({
    email: emailField,
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export const emailOnlySchema = z.object({ email: emailField });

export const updatePasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

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

export const checklistItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(60, "Name must be 60 characters or fewer"),
});

export type ChecklistItemInput = z.infer<typeof checklistItemSchema>;

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

export const houseNoteSchema = z.object({
  id: z.string().uuid(),
  body: z
    .string()
    .trim()
    .min(1, "A note cannot be empty")
    .max(1000, "A note must be 1000 characters or fewer"),
});

export const houseNotesSchema = z
  .array(houseNoteSchema)
  .max(200, "Too many notes");

export type HouseNoteInput = z.infer<typeof houseNoteSchema>;

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

export const DEFAULT_CHECKLIST: Record<Locale, { name: string }[]> = {
  en: [
    { name: "Lift" },
    { name: "Storage room" },
    { name: "Parking space" },
    { name: "Air conditioning" },
    { name: "Heating" },
    { name: "Balcony / Terrace" },
    { name: "Built-in wardrobes" },
    { name: "Communal pool" },
  ],
  es: [
    { name: "Ascensor" },
    { name: "Trastero" },
    { name: "Plaza de garaje" },
    { name: "Aire acondicionado" },
    { name: "Calefacción" },
    { name: "Balcón / Terraza" },
    { name: "Armarios empotrados" },
    { name: "Piscina comunitaria" },
  ],
};
