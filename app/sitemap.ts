import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("slug, updated_at").eq("active", true),
    supabase.from("categories").select("slug, updated_at").eq("active", true),
  ]);

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/loja`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/quem-somos`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/nossas-lojas`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/contato`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/privacidade`, lastModified: new Date(), priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
    url: `${base}/produto/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = (categories ?? []).map((c) => ({
    url: `${base}/categoria/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
