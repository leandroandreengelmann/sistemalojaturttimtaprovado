"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCarousel(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const has_timer = formData.get("has_timer") === "on";
  const active = formData.get("active") !== "off";
  const timer_ends_at = buildTimerEndsAt(formData, has_timer);

  const { data, error } = await supabase
    .from("carousels")
    .insert({ title, has_timer, timer_ends_at, active })
    .select("id")
    .single();

  if (error) return { error: error.message };
  revalidatePath("/admin/carroseis");
  revalidatePath("/");
  return { id: data.id };
}

export async function updateCarousel(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const has_timer = formData.get("has_timer") === "on";
  const active = formData.get("active") !== "off";
  const timer_ends_at = buildTimerEndsAt(formData, has_timer);

  const { error } = await supabase.from("carousels").update({ title, has_timer, timer_ends_at, active }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/carroseis");
  revalidatePath("/");
  return {};
}

export async function deleteCarousel(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("carousels").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/carroseis");
  revalidatePath("/");
  return {};
}

export async function addCarouselProduct(carouselId: string, productId: string) {
  const supabase = await createClient();
  const { data: last } = await supabase
    .from("carousel_products")
    .select("sort_order")
    .eq("carousel_id", carouselId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("carousel_products").insert({
    carousel_id: carouselId,
    product_id: productId,
    sort_order: (last?.sort_order ?? -1) + 1,
  });
  revalidatePath(`/admin/carroseis/${carouselId}`);
  revalidatePath("/");
}

export async function removeCarouselProduct(carouselId: string, productId: string) {
  const supabase = await createClient();
  await supabase
    .from("carousel_products")
    .delete()
    .eq("carousel_id", carouselId)
    .eq("product_id", productId);
  revalidatePath(`/admin/carroseis/${carouselId}`);
  revalidatePath("/");
}

function buildTimerEndsAt(formData: FormData, hasTimer: boolean): string | null {
  if (!hasTimer) return null;
  const days = parseInt(formData.get("timer_days") as string) || 0;
  const hours = parseInt(formData.get("timer_hours") as string) || 0;
  const minutes = parseInt(formData.get("timer_minutes") as string) || 0;
  const totalMs = (days * 86400 + hours * 3600 + minutes * 60) * 1000;
  if (totalMs <= 0) return null;
  return new Date(Date.now() + totalMs).toISOString();
}
