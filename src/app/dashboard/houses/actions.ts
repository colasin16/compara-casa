"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { houseSchema, housePointsSchema, houseNotesSchema } from "@/lib/validation";

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
    price: formData.get("price"),
    currency: formData.get("currency"),
    address: formData.get("address"),
    link: formData.get("link"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase.from("houses").insert({
    user_id: userId,
    name: parsed.data.name,
    price: parsed.data.price,
    currency: parsed.data.currency,
    address: parsed.data.address || null,
    link: parsed.data.link || null,
    latitude: parsed.data.latitude ?? null,
    longitude: parsed.data.longitude ?? null,
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
    price: formData.get("price"),
    currency: formData.get("currency"),
    address: formData.get("address"),
    link: formData.get("link"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase
    .from("houses")
    .update({
      name: parsed.data.name,
      price: parsed.data.price,
      currency: parsed.data.currency,
      address: parsed.data.address || null,
      link: parsed.data.link || null,
      latitude: parsed.data.latitude ?? null,
      longitude: parsed.data.longitude ?? null,
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/houses/${id}`);
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

  revalidatePath(`/dashboard/houses/${houseId}`);
  revalidatePath("/dashboard");
}

/**
 * Saves whether a house has a single checklist item (upsert on house+item).
 */
export async function checkChecklistItem(formData: FormData) {
  const { supabase, userId } = await requireUserId();
  if (!userId) return;

  const houseId = formData.get("houseId");
  const itemId = formData.get("itemId");
  const rawChecked = formData.get("checked");

  if (
    typeof houseId !== "string" ||
    typeof itemId !== "string" ||
    typeof rawChecked !== "string"
  ) {
    return;
  }

  const checked = rawChecked === "true";

  await supabase.from("house_checks").upsert(
    {
      user_id: userId,
      house_id: houseId,
      item_id: itemId,
      checked,
    },
    { onConflict: "house_id,item_id" },
  );

  revalidatePath(`/dashboard/houses/${houseId}`);
  revalidatePath("/dashboard");
}

export type SaveHousePointsState = { error?: string; ok?: boolean };

/**
 * Replaces the full set of positives/negatives ("pros vs cons") for a house
 * with the supplied ordered snapshot. The client sends every line in display
 * order; `position` is derived from each line's index within its side, so
 * reordering and moving lines between lists persists in a single round trip.
 */
export async function saveHousePoints(
  houseId: string,
  rawPoints: unknown,
): Promise<SaveHousePointsState> {
  const { supabase, userId } = await requireUserId();
  if (!userId) return { error: "You must be signed in." };

  if (typeof houseId !== "string" || houseId.length === 0) {
    return { error: "Missing house id." };
  }

  const parsed = housePointsSchema.safeParse(rawPoints);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }
  const points = parsed.data;

  // Ensure the house belongs to the current user before attaching points.
  const { data: house } = await supabase
    .from("houses")
    .select("id")
    .eq("id", houseId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!house) return { error: "House not found." };

  // Reject duplicate ids in the snapshot to keep positions deterministic.
  const ids = points.map((p) => p.id);
  if (new Set(ids).size !== ids.length) {
    return { error: "Duplicate line ids." };
  }

  // Derive a stable position per side from the incoming order.
  const counters: Record<string, number> = { pro: 0, con: 0 };
  const rows = points.map((p) => ({
    id: p.id,
    user_id: userId,
    house_id: houseId,
    kind: p.kind,
    body: p.body,
    position: counters[p.kind]++,
  }));

  if (rows.length > 0) {
    const { error } = await supabase
      .from("house_points")
      .upsert(rows, { onConflict: "id" });
    if (error) return { error: error.message };
  }

  // Delete any of this house's points that are no longer present.
  const { data: existing, error: existingError } = await supabase
    .from("house_points")
    .select("id")
    .eq("house_id", houseId)
    .eq("user_id", userId);
  if (existingError) return { error: existingError.message };

  const keep = new Set(ids);
  const toDelete = (existing ?? [])
    .map((row) => row.id as string)
    .filter((id) => !keep.has(id));

  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from("house_points")
      .delete()
      .eq("house_id", houseId)
      .eq("user_id", userId)
      .in("id", toDelete);
    if (deleteError) return { error: deleteError.message };
  }

  revalidatePath(`/dashboard/houses/${houseId}`);
  return { ok: true };
}

export type SaveHouseNotesState = { error?: string; ok?: boolean };

/**
 * Replaces the full set of free-form notes for a house with the supplied
 * ordered snapshot. The client sends every note in display order; `position`
 * is derived from each note's index, so reordering persists in one round trip.
 */
export async function saveHouseNotes(
  houseId: string,
  rawNotes: unknown,
): Promise<SaveHouseNotesState> {
  const { supabase, userId } = await requireUserId();
  if (!userId) return { error: "You must be signed in." };

  if (typeof houseId !== "string" || houseId.length === 0) {
    return { error: "Missing house id." };
  }

  const parsed = houseNotesSchema.safeParse(rawNotes);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }
  const notes = parsed.data;

  // Ensure the house belongs to the current user before attaching notes.
  const { data: house } = await supabase
    .from("houses")
    .select("id")
    .eq("id", houseId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!house) return { error: "House not found." };

  // Reject duplicate ids in the snapshot to keep positions deterministic.
  const ids = notes.map((n) => n.id);
  if (new Set(ids).size !== ids.length) {
    return { error: "Duplicate note ids." };
  }

  // Derive a stable position from the incoming order.
  const rows = notes.map((n, index) => ({
    id: n.id,
    user_id: userId,
    house_id: houseId,
    body: n.body,
    position: index,
  }));

  if (rows.length > 0) {
    const { error } = await supabase
      .from("house_notes")
      .upsert(rows, { onConflict: "id" });
    if (error) return { error: error.message };
  }

  // Delete any of this house's notes that are no longer present.
  const { data: existing, error: existingError } = await supabase
    .from("house_notes")
    .select("id")
    .eq("house_id", houseId)
    .eq("user_id", userId);
  if (existingError) return { error: existingError.message };

  const keep = new Set(ids);
  const toDelete = (existing ?? [])
    .map((row) => row.id as string)
    .filter((id) => !keep.has(id));

  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from("house_notes")
      .delete()
      .eq("house_id", houseId)
      .eq("user_id", userId)
      .in("id", toDelete);
    if (deleteError) return { error: deleteError.message };
  }

  revalidatePath(`/dashboard/houses/${houseId}`);
  return { ok: true };
}
