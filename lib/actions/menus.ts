"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMenuItem(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").insert({
    label:      formData.get("label") as string,
    url:        formData.get("url") as string,
    parent_id:  (formData.get("parent_id") as string) || null,
    location:   (formData.get("location") as string) || "header",
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/menus");
  revalidatePath("/");
  return {};
}

export async function updateMenuItem(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").update({
    label:      formData.get("label") as string,
    url:        formData.get("url") as string,
    parent_id:  (formData.get("parent_id") as string) || null,
    location:   (formData.get("location") as string) || "header",
    sort_order: Number(formData.get("sort_order") ?? 0),
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/menus");
  revalidatePath("/");
  return {};
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/menus");
  revalidatePath("/");
  return {};
}

export async function updatePage(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("institutional_pages")
    .select("slug")
    .eq("id", id)
    .maybeSingle();
  const body = formData.get("content") as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let content: any = { body };

  if (existing?.slug === "quem-somos") {
    content = {
      body,
      missao:        (formData.get("missao") as string) || "",
      visao:         (formData.get("visao") as string) || "",
      valores:       (formData.get("valores") as string) || "",
      anos_mercado:  (formData.get("anos_mercado") as string) || "20",
      pilares: [1, 2, 3, 4].map((n) => ({
        title: (formData.get(`pilar_${n}_title`) as string) || "",
        desc:  (formData.get(`pilar_${n}_desc`) as string) || "",
      })),
    };
  }

  const { error } = await supabase.from("institutional_pages").update({
    title:     formData.get("title") as string,
    seo_title: (formData.get("seo_title") as string) || null,
    seo_desc:  (formData.get("seo_desc") as string) || null,
    content,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/paginas");
  if (existing?.slug) revalidatePath(`/${existing.slug}`);
  redirect("/admin/paginas?saved=1");
}

export async function seedInstitutionalPages() {
  const supabase = await createClient();
  const pages = [
    { slug: "quem-somos",    title: "Quem Somos" },
    { slug: "nossas-lojas",  title: "Nossas Lojas" },
    { slug: "contato",       title: "Contato" },
    { slug: "faq",           title: "FAQ" },
    { slug: "privacidade",   title: "Política de Privacidade" },
    { slug: "cookies",       title: "Política de Cookies" },
  ];
  for (const p of pages) {
    await supabase.from("institutional_pages").upsert(p, { onConflict: "slug", ignoreDuplicates: true });
  }
  revalidatePath("/admin/paginas");
}
