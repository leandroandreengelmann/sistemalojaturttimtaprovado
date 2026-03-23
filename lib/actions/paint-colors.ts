"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPaintColor(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("paint_colors").insert({
    name:        formData.get("name") as string,
    code:        (formData.get("code") as string) || "",
    hex:         (formData.get("hex") as string) || "#000000",
    family:      (formData.get("family") as string) || null,
    collection:  (formData.get("collection") as string) || null,
    brand:       (formData.get("brand") as string) || null,
    description: (formData.get("description") as string) || null,
    sort_order:  Number(formData.get("sort_order") ?? 0),
    active:      formData.get("active") !== "off",
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/cores");
  revalidatePath("/cores");
  revalidatePath("/");
  return {};
}

export async function updatePaintColor(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("paint_colors").update({
    name:        formData.get("name") as string,
    code:        (formData.get("code") as string) || "",
    hex:         (formData.get("hex") as string) || "#000000",
    family:      (formData.get("family") as string) || null,
    collection:  (formData.get("collection") as string) || null,
    brand:       (formData.get("brand") as string) || null,
    description: (formData.get("description") as string) || null,
    sort_order:  Number(formData.get("sort_order") ?? 0),
    active:      formData.get("active") !== "off",
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/cores");
  revalidatePath("/cores");
  revalidatePath("/");
  return {};
}

export async function deletePaintColor(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("paint_colors").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/cores");
  revalidatePath("/cores");
  revalidatePath("/");
  return {};
}
