"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createBanner(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("banners").insert({
    title:            (formData.get("title") as string) || null,
    subtitle:         (formData.get("subtitle") as string) || null,
    image_url:        formData.get("image_url") as string,
    image_mobile_url: (formData.get("image_mobile_url") as string) || null,
    cta_text:         (formData.get("cta_text") as string) || null,
    cta_url:          (formData.get("cta_url") as string) || null,
    position:         (formData.get("position") as string) || "hero",
    sort_order:       Number(formData.get("sort_order") ?? 0),
    active:           formData.get("active") !== "off",
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return {};
}

export async function updateBanner(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("banners").update({
    title:            (formData.get("title") as string) || null,
    subtitle:         (formData.get("subtitle") as string) || null,
    image_url:        formData.get("image_url") as string,
    image_mobile_url: (formData.get("image_mobile_url") as string) || null,
    cta_text:         (formData.get("cta_text") as string) || null,
    cta_url:          (formData.get("cta_url") as string) || null,
    position:         (formData.get("position") as string) || "hero",
    sort_order:       Number(formData.get("sort_order") ?? 0),
    active:           formData.get("active") !== "off",
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return {};
}

export async function deleteBanner(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("banners").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return {};
}
