"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const slug = toSlug(formData.get("slug") as string || name);
  const description = (formData.get("description") as string) || null;
  const parent_id = (formData.get("parent_id") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const sort_order = Number(formData.get("sort_order") ?? 0);
  const active = formData.get("active") !== "off";

  const { error } = await supabase
    .from("categories")
    .insert({ name, slug, description, parent_id, image_url, sort_order, active });

  if (error) return { error: error.message };
  revalidatePath("/admin/categorias");
  revalidatePath("/");
  return {};
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const slug = toSlug(formData.get("slug") as string || name);
  const description = (formData.get("description") as string) || null;
  const parent_id = (formData.get("parent_id") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const sort_order = Number(formData.get("sort_order") ?? 0);
  const active = formData.get("active") !== "off";

  const { error } = await supabase
    .from("categories")
    .update({ name, slug, description, parent_id, image_url, sort_order, active })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/categorias");
  revalidatePath("/");
  return {};
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/categorias");
  revalidatePath("/");
  return {};
}
