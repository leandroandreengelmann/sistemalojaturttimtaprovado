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

function parseProductFields(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = toSlug((formData.get("slug") as string) || name);
  const summary = formData.get("summary") as string;
  const description = formData.get("description") as string;
  const category_id = (formData.get("category_id") as string) || null;
  const brand = (formData.get("brand") as string) || null;
  const active = formData.get("active") !== "off";
  const specsRaw = formData.get("specs") as string;
  const specs = specsRaw ? JSON.parse(specsRaw) : [];
  const priceRaw = formData.get("price") as string;
  const price_promoRaw = formData.get("price_promo") as string;
  const price = priceRaw ? parseFloat(priceRaw) : null;
  const price_promo = price_promoRaw ? parseFloat(price_promoRaw) : null;
  return { name, slug, summary, description, category_id, brand, active, specs, price, price_promo };
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const fields = parseProductFields(formData);

  const { data, error } = await supabase
    .from("products")
    .insert(fields)
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/produtos");
  revalidatePath("/");
  revalidatePath("/loja");
  return { id: data.id };
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = parseProductFields(formData);

  const { error } = await supabase
    .from("products")
    .update(fields)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/produtos");
  revalidatePath(`/produto/${fields.slug}`);
  revalidatePath("/");
  revalidatePath("/loja");
  return {};
}

export async function createProductReturnId(formData: FormData): Promise<{ id?: string; error?: string }> {
  const supabase = await createClient();
  const fields = parseProductFields(formData);

  const { data, error } = await supabase
    .from("products")
    .insert(fields)
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/produtos");
  revalidatePath("/");
  revalidatePath("/loja");
  return { id: data.id };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/produtos");
  revalidatePath("/");
  revalidatePath("/loja");
  return {};
}

export async function toggleProductActive(id: string, active: boolean) {
  const supabase = await createClient();
  await supabase.from("products").update({ active }).eq("id", id);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
}

export async function deleteProducts(ids: string[]) {
  if (!ids.length) return;
  const supabase = await createClient();
  await supabase.from("products").delete().in("id", ids);
  revalidatePath("/admin/produtos");
  revalidatePath("/");
  revalidatePath("/loja");
}

export async function addProductImage(productId: string, url: string, isPrimary: boolean) {
  const supabase = await createClient();
  if (isPrimary) {
    await supabase.from("product_images").update({ is_primary: false }).eq("product_id", productId);
  }
  await supabase.from("product_images").insert({ product_id: productId, url, is_primary: isPrimary });
  revalidatePath(`/admin/produtos/${productId}`);
  revalidatePath("/loja");
}

export async function deleteProductImage(imageId: string, productId: string) {
  const supabase = await createClient();
  await supabase.from("product_images").delete().eq("id", imageId);
  revalidatePath(`/admin/produtos/${productId}`);
  revalidatePath("/loja");
}

export async function setProductImagePrimary(imageId: string, productId: string) {
  const supabase = await createClient();
  await supabase.from("product_images").update({ is_primary: false }).eq("product_id", productId);
  await supabase.from("product_images").update({ is_primary: true }).eq("id", imageId);
  revalidatePath(`/admin/produtos/${productId}`);
  revalidatePath("/loja");
}
