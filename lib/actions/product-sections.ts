"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function buildTimerEndsAt(formData: FormData, hasTimer: boolean): string | null {
  if (!hasTimer) return null;
  const days    = parseInt(formData.get("timer_days")    as string) || 0;
  const hours   = parseInt(formData.get("timer_hours")   as string) || 0;
  const minutes = parseInt(formData.get("timer_minutes") as string) || 0;
  const totalMs = (days * 86400 + hours * 3600 + minutes * 60) * 1000;
  if (totalMs <= 0) return null;
  return new Date(Date.now() + totalMs).toISOString();
}

export async function createProductSection(formData: FormData) {
  const supabase = await createClient();
  const title      = formData.get("title") as string;
  const has_timer  = formData.get("has_timer") === "on";
  const rows       = Math.max(1, parseInt(formData.get("rows") as string) || 1);
  const active     = formData.get("active") !== "off";
  const timer_ends_at = buildTimerEndsAt(formData, has_timer);

  const { data, error } = await supabase
    .from("product_sections")
    .insert({ title, has_timer, timer_ends_at, rows, active })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin/secoes");
  revalidatePath("/");
  redirect(`/admin/secoes/${data.id}`);
}

export async function updateProductSection(id: string, formData: FormData) {
  const supabase = await createClient();
  const title      = formData.get("title") as string;
  const has_timer  = formData.get("has_timer") === "on";
  const rows       = Math.max(1, parseInt(formData.get("rows") as string) || 1);
  const active     = formData.get("active") !== "off";
  const timer_ends_at = buildTimerEndsAt(formData, has_timer);

  await supabase
    .from("product_sections")
    .update({ title, has_timer, timer_ends_at, rows, active })
    .eq("id", id);

  revalidatePath("/admin/secoes");
  revalidatePath("/");
}

export async function deleteProductSection(id: string) {
  const supabase = await createClient();
  await supabase.from("product_sections").delete().eq("id", id);
  revalidatePath("/admin/secoes");
  revalidatePath("/");
  redirect("/admin/secoes");
}

export async function addProductSectionItem(sectionId: string, productId: string) {
  const supabase = await createClient();
  const { data: last } = await supabase
    .from("product_section_items")
    .select("sort_order")
    .eq("section_id", sectionId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("product_section_items").insert({
    section_id: sectionId,
    product_id: productId,
    sort_order: (last?.sort_order ?? -1) + 1,
  });
  revalidatePath(`/admin/secoes/${sectionId}`);
  revalidatePath("/");
}

export async function removeProductSectionItem(sectionId: string, productId: string) {
  const supabase = await createClient();
  await supabase
    .from("product_section_items")
    .delete()
    .eq("section_id", sectionId)
    .eq("product_id", productId);
  revalidatePath(`/admin/secoes/${sectionId}`);
  revalidatePath("/");
}
