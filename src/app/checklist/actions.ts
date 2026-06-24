"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { checklistItemSchema, DEFAULT_CHECKLIST } from "@/lib/validation";
import { getLocale } from "@/lib/i18n/server";

export type ChecklistItemFormState = { error?: string; ok?: boolean };

async function requireUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, userId: user?.id ?? null };
}

export async function createChecklistItem(
  _prev: ChecklistItemFormState,
  formData: FormData,
): Promise<ChecklistItemFormState> {
  const { supabase, userId } = await requireUserId();
  if (!userId) return { error: "You must be signed in." };

  const parsed = checklistItemSchema.safeParse({
    name: formData.get("name"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase.from("checklist_items").insert({
    user_id: userId,
    name: parsed.data.name,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "You already have a checklist item with that name." };
    }
    return { error: error.message };
  }

  revalidatePath("/checklist");
  return { ok: true };
}

export async function updateChecklistItem(
  _prev: ChecklistItemFormState,
  formData: FormData,
): Promise<ChecklistItemFormState> {
  const { supabase, userId } = await requireUserId();
  if (!userId) return { error: "You must be signed in." };

  const id = formData.get("id");
  if (typeof id !== "string" || id.length === 0) {
    return { error: "Missing checklist item id." };
  }

  const parsed = checklistItemSchema.safeParse({
    name: formData.get("name"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase
    .from("checklist_items")
    .update({ name: parsed.data.name })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    if (error.code === "23505") {
      return { error: "You already have a checklist item with that name." };
    }
    return { error: error.message };
  }

  revalidatePath("/checklist");
  return { ok: true };
}

export async function deleteChecklistItem(formData: FormData) {
  const { supabase, userId } = await requireUserId();
  if (!userId) return;

  const id = formData.get("id");
  if (typeof id !== "string" || id.length === 0) return;

  await supabase
    .from("checklist_items")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  revalidatePath("/checklist");
}

export async function seedDefaultChecklist() {
  const { supabase, userId } = await requireUserId();
  if (!userId) return;

  const locale = await getLocale();
  const rows = DEFAULT_CHECKLIST[locale].map((c) => ({ ...c, user_id: userId }));
  // Ignore duplicates so re-running is safe.
  await supabase
    .from("checklist_items")
    .upsert(rows, { onConflict: "user_id,name", ignoreDuplicates: true });

  revalidatePath("/checklist");
}
