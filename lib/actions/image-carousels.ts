"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createImageCarousel(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const active = formData.get("active") !== "off";

  const { data, error } = await supabase
    .from("image_carousels")
    .insert({ title, active })
    .select("id")
    .single();

  if (error) return { error: error.message };
  revalidatePath("/admin/carroseis-imagens");
  revalidatePath("/");
  return { id: data.id };
}

export async function updateImageCarousel(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const active = formData.get("active") !== "off";

  const { error } = await supabase.from("image_carousels").update({ title, active }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/carroseis-imagens");
  revalidatePath("/");
  return {};
}

export async function deleteImageCarousel(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("image_carousels").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/carroseis-imagens");
  revalidatePath("/");
  return {};
}

export async function addImageCarouselItem(carouselId: string, url: string, alt: string) {
  const supabase = await createClient();
  const { data: last } = await supabase
    .from("image_carousel_items")
    .select("sort_order")
    .eq("carousel_id", carouselId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("image_carousel_items").insert({
    carousel_id: carouselId,
    url,
    alt: alt || null,
    sort_order: (last?.sort_order ?? -1) + 1,
  });
  revalidatePath(`/admin/carroseis-imagens/${carouselId}`);
  revalidatePath("/");
}

export async function removeImageCarouselItem(itemId: string, carouselId: string) {
  const supabase = await createClient();
  await supabase.from("image_carousel_items").delete().eq("id", itemId);
  revalidatePath(`/admin/carroseis-imagens/${carouselId}`);
  revalidatePath("/");
}
