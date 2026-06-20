"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { criterionSchema, DEFAULT_CRITERIA } from "@/lib/validation";
import { getLocale } from "@/lib/i18n/server";

export type CriterionFormState = { error?: string; ok?: boolean };

async function requireUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, userId: user?.id ?? null };
}

export async function createCriterion(
  _prev: CriterionFormState,
  formData: FormData,
): Promise<CriterionFormState> {
  const { supabase, userId } = await requireUserId();
  if (!userId) return { error: "You must be signed in." };

  const parsed = criterionSchema.safeParse({
    name: formData.get("name"),
    weight: formData.get("weight"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase.from("criteria").insert({
    user_id: userId,
    name: parsed.data.name,
    weight: parsed.data.weight,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "You already have a criterion with that name." };
    }
    return { error: error.message };
  }

  revalidatePath("/criteria");
  return { ok: true };
}

export async function updateCriterion(
  _prev: CriterionFormState,
  formData: FormData,
): Promise<CriterionFormState> {
  const { supabase, userId } = await requireUserId();
  if (!userId) return { error: "You must be signed in." };

  const id = formData.get("id");
  if (typeof id !== "string" || id.length === 0) {
    return { error: "Missing criterion id." };
  }

  const parsed = criterionSchema.safeParse({
    name: formData.get("name"),
    weight: formData.get("weight"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase
    .from("criteria")
    .update({ name: parsed.data.name, weight: parsed.data.weight })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    if (error.code === "23505") {
      return { error: "You already have a criterion with that name." };
    }
    return { error: error.message };
  }

  revalidatePath("/criteria");
  return { ok: true };
}

export async function deleteCriterion(formData: FormData) {
  const { supabase, userId } = await requireUserId();
  if (!userId) return;

  const id = formData.get("id");
  if (typeof id !== "string" || id.length === 0) return;

  await supabase.from("criteria").delete().eq("id", id).eq("user_id", userId);
  revalidatePath("/criteria");
}

export async function seedDefaultCriteria() {
  const { supabase, userId } = await requireUserId();
  if (!userId) return;

  const locale = await getLocale();
  const rows = DEFAULT_CRITERIA[locale].map((c) => ({ ...c, user_id: userId }));
  // Ignore duplicates so re-running is safe.
  await supabase
    .from("criteria")
    .upsert(rows, { onConflict: "user_id,name", ignoreDuplicates: true });

  revalidatePath("/criteria");
}
