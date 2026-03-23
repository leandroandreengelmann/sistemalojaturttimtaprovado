"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createColorSection(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("color_sections")
    .insert({
      title:       formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      sort_order:  Number(formData.get("sort_order") ?? 0),
      active:      formData.get("active") !== "off",
    })
    .select("id")
    .single();
  if (error) return { error: error.message };
  revalidatePath("/admin/secoes-cores");
  revalidatePath("/admin/home");
  revalidatePath("/");
  return { id: data.id };
}

export async function updateColorSection(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("color_sections")
    .update({
      title:       formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      sort_order:  Number(formData.get("sort_order") ?? 0),
      active:      formData.get("active") !== "off",
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/secoes-cores");
  revalidatePath("/admin/home");
  revalidatePath("/");
  return {};
}

export async function deleteColorSection(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("color_sections").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/secoes-cores");
  revalidatePath("/admin/home");
  revalidatePath("/");
  return {};
}

export async function addColorToSection(sectionId: string, colorId: string) {
  const supabase = await createClient();
  const { data: last } = await supabase
    .from("color_section_items")
    .select("sort_order")
    .eq("section_id", sectionId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("color_section_items").insert({
    section_id: sectionId,
    color_id:   colorId,
    sort_order: (last?.sort_order ?? -1) + 1,
  });
  if (error) return { error: error.message };
  revalidatePath(`/admin/secoes-cores/${sectionId}`);
  revalidatePath("/");
  return {};
}

export async function removeColorFromSection(sectionId: string, colorId: string) {
  const supabase = await createClient();
  await supabase
    .from("color_section_items")
    .delete()
    .eq("section_id", sectionId)
    .eq("color_id", colorId);
  revalidatePath(`/admin/secoes-cores/${sectionId}`);
  revalidatePath("/");
}
