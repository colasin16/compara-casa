"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { houseSchema } from "@/lib/validation";

export type HouseFormState = { error?: string; ok?: boolean };

async function requireUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, userId: user?.id ?? null };
}

export async function createHouse(
  _prev: HouseFormState,
  formData: FormData,
): Promise<HouseFormState> {
  const { supabase, userId } = await requireUserId();
  if (!userId) return { error: "You must be signed in." };

  const parsed = houseSchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    notes: formData.get("notes"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase.from("houses").insert({
    user_id: userId,
    name: parsed.data.name,
    address: parsed.data.address || null,
    notes: parsed.data.notes || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { ok: true };
}

export async function updateHouse(
  _prev: HouseFormState,
  formData: FormData,
): Promise<HouseFormState> {
  const { supabase, userId } = await requireUserId();
  if (!userId) return { error: "You must be signed in." };

  const id = formData.get("id");
  if (typeof id !== "string" || id.length === 0) {
    return { error: "Missing house id." };
  }

  const parsed = houseSchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    notes: formData.get("notes"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase
    .from("houses")
    .update({
      name: parsed.data.name,
      address: parsed.data.address || null,
      notes: parsed.data.notes || null,
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/houses/${id}`);
  return { ok: true };
}

export async function deleteHouse(formData: FormData) {
  const { supabase, userId } = await requireUserId();
  if (!userId) return;

  const id = formData.get("id");
  if (typeof id !== "string" || id.length === 0) return;

  await supabase.from("houses").delete().eq("id", id).eq("user_id", userId);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

/**
 * Saves a single criterion score for a house (upsert on house+criterion).
 * Scores are clamped to the 0–10 range.
 */
export async function rateCriterion(formData: FormData) {
  const { supabase, userId } = await requireUserId();
  if (!userId) return;

  const houseId = formData.get("houseId");
  const criterionId = formData.get("criterionId");
  const rawScore = formData.get("score");

  if (
    typeof houseId !== "string" ||
    typeof criterionId !== "string" ||
    typeof rawScore !== "string"
  ) {
    return;
  }

  const score = Math.min(10, Math.max(0, Number(rawScore)));
  if (Number.isNaN(score)) return;

  await supabase.from("ratings").upsert(
    {
      user_id: userId,
      house_id: houseId,
      criterion_id: criterionId,
      score,
    },
    { onConflict: "house_id,criterion_id" },
  );

  revalidatePath(`/houses/${houseId}`);
  revalidatePath("/dashboard");
}
