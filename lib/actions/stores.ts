"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createStore(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("stores").insert({
    name:        formData.get("name") as string,
    city:        formData.get("city") as string,
    state:       formData.get("state") as string,
    address:     (formData.get("address") as string) || null,
    phone:       (formData.get("phone") as string) || null,
    whatsapp:    (formData.get("whatsapp") as string) || null,
    email:       (formData.get("email") as string) || null,
    maps_url:    (formData.get("maps_url") as string) || null,
    image_url:   (formData.get("image_url") as string) || null,
    hours:       (formData.get("hours") as string) || null,
    description: (formData.get("description") as string) || null,
    sort_order:  Number(formData.get("sort_order") ?? 0),
    active:      formData.get("active") !== "off",
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/lojas");
  revalidatePath("/nossas-lojas");
  revalidatePath("/");
  return {};
}

export async function updateStore(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("stores").update({
    name:        formData.get("name") as string,
    city:        formData.get("city") as string,
    state:       formData.get("state") as string,
    address:     (formData.get("address") as string) || null,
    phone:       (formData.get("phone") as string) || null,
    whatsapp:    (formData.get("whatsapp") as string) || null,
    email:       (formData.get("email") as string) || null,
    maps_url:    (formData.get("maps_url") as string) || null,
    image_url:   (formData.get("image_url") as string) || null,
    hours:       (formData.get("hours") as string) || null,
    description: (formData.get("description") as string) || null,
    sort_order:  Number(formData.get("sort_order") ?? 0),
    active:      formData.get("active") !== "off",
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/lojas");
  revalidatePath("/nossas-lojas");
  revalidatePath("/");
  return {};
}

export async function deleteStore(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("stores").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/lojas");
  revalidatePath("/nossas-lojas");
  return {};
}
