"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createBrand(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const logo_url = (formData.get("logo_url") as string) || null;
  const website_url = (formData.get("website_url") as string) || null;
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") !== "off";

  const { error } = await supabase.from("brands").insert({ name, logo_url, website_url, sort_order, active });
  if (error) return { error: error.message };
  revalidatePath("/admin/marcas");
  revalidatePath("/");
  return {};
}

export async function updateBrand(id: string, formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const logo_url = (formData.get("logo_url") as string) || null;
  const website_url = (formData.get("website_url") as string) || null;
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") !== "off";

  const { error } = await supabase.from("brands").update({ name, logo_url, website_url, sort_order, active }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/marcas");
  revalidatePath("/");
  return {};
}

export async function deleteBrand(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("brands").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/marcas");
  revalidatePath("/");
  return {};
}
