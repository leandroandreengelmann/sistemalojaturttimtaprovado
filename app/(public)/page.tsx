import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/public/home/hero-section";

export const dynamic = "force-dynamic";
import { DiferenciaisSection } from "@/components/public/home/diferenciais-section";
import { CategoriasSection } from "@/components/public/home/categorias-section";
import { BannerIntermediario } from "@/components/public/home/banner-intermediario";
import { QuemSomosSection } from "@/components/public/home/quem-somos-section";
import { NossasLojasSection } from "@/components/public/home/nossas-lojas-section";
import { CtaComercialSection } from "@/components/public/home/cta-comercial-section";
import { CarouselSection } from "@/components/public/home/carousel-section";
import { BrandsSection } from "@/components/public/home/brands-section";
import { ProductSectionDisplay } from "@/components/public/home/product-section-display";
import { ImageCarouselSection } from "@/components/public/home/image-carousel-section";
import { CoresTintasSection } from "@/components/public/home/cores-section";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("key, value")
    .in("key", ["seo_title", "seo_description", "site_name"]);

  const s = Object.fromEntries((data ?? []).map((r) => [r.key, r.value as string]));
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";
  const title = s.seo_title ?? s.site_name ?? "Turatti | Qualidade e tradição em cada produto";
  const description =
    s.seo_description ??
    "Catálogo completo de produtos com atendimento consultivo especializado. Solicite orçamento pelo WhatsApp.";

  return {
    title,
    description,
    alternates: { canonical: base },
    openGraph: {
      title,
      description,
      url: base,
    },
  };
}

async function getHomeData() {
  const supabase = await createClient();

  const [
    heroBannerRes,
    stripBannerRes,
    categoriesRes,
    storesRes,
    settingsRes,
    sectionsRes,
    brandsRes,
    productSectionsRes,
    imageCarouselsRes,
  ] = await Promise.all([
    supabase
      .from("banners")
      .select("*")
      .eq("active", true)
      .eq("position", "hero")
      .order("sort_order")
      .limit(1)
      .maybeSingle(),
    supabase
      .from("banners")
      .select("*")
      .eq("active", true)
      .eq("position", "intermediario")
      .order("sort_order")
      .limit(1)
      .maybeSingle(),
    supabase
      .from("categories")
      .select("id, name, slug, description, image_url")
      .eq("active", true)
      .is("parent_id", null)
      .order("sort_order")
      .limit(8),
    supabase
      .from("stores")
      .select("id, name, city, state, address, phone, whatsapp")
      .eq("active", true)
      .order("sort_order")
      .limit(6),
    supabase
      .from("settings")
      .select("key, value")
      .in("key", [
        "whatsapp", "site_tagline", "site_name", "instagram", "facebook", "email",
        "diferenciais", "diferenciais_size", "diferenciais_carousel_cols",
        "quem_somos_badge", "quem_somos_titulo", "quem_somos_texto", "quem_somos_bullets", "quem_somos_anos", "quem_somos_imagem",
        "cta_badge", "cta_titulo", "cta_subtitulo",
      ]),
    supabase
      .from("home_sections")
      .select("id, type, reference_id, active")
      .eq("active", true)
      .order("sort_order"),
    supabase
      .from("brands")
      .select("id, name, logo_url, website_url")
      .eq("active", true)
      .order("sort_order"),
    supabase
      .from("home_sections")
      .select("reference_id")
      .eq("type", "product_section")
      .eq("active", true),
    supabase
      .from("home_sections")
      .select("reference_id")
      .eq("type", "image_carousel")
      .eq("active", true),
  ]);

  const rawSettings = Object.fromEntries((settingsRes.data ?? []).map((s) => [s.key, s.value]));
  const str = (k: string) => typeof rawSettings[k] === "string" ? rawSettings[k] as string : undefined;

  const settings = {
    whatsapp:  str("whatsapp")  ?? "",
    siteName:  str("site_name") ?? "Turatti",
    instagram: str("instagram") ?? "",
    facebook:  str("facebook")  ?? "",
    email:     str("email")     ?? "",
    tagline:   str("site_tagline") ?? "Qualidade e tradição em cada produto",
    diferenciais: Array.isArray(rawSettings["diferenciais"]) ? rawSettings["diferenciais"] as { icon: string; title: string; desc: string }[] : null,
    diferenciaisSize: (str("diferenciais_size") ?? "compact") as "compact" | "medium" | "large",
    diferenciaisCarouselCols: (str("diferenciais_carousel_cols") === "2" ? 2 : 1) as 1 | 2,
    quemSomos: {
      badge:    str("quem_somos_badge"),
      titulo:   str("quem_somos_titulo"),
      texto:    str("quem_somos_texto"),
      bullets:  Array.isArray(rawSettings["quem_somos_bullets"]) ? rawSettings["quem_somos_bullets"] as string[] : undefined,
      anos:     str("quem_somos_anos"),
      imageUrl: str("quem_somos_imagem"),
    },
    cta: {
      badge:     str("cta_badge"),
      titulo:    str("cta_titulo"),
      subtitulo: str("cta_subtitulo"),
    },
  };

  // Carrega carrosséis referenciados pelas seções
  const carouselIds = (sectionsRes.data ?? [])
    .filter((s) => s.type === "carousel" && s.reference_id)
    .map((s) => s.reference_id as string);

  const carouselsData: Record<string, { title: string; has_timer: boolean | null; timer_ends_at: string | null; products: { id: string; name: string; slug: string; summary: string | null; brand: string | null; imageUrl?: string; imageAlt?: string | null }[] }> = {};

  if (carouselIds.length > 0) {
    const { data: carousels } = await supabase
      .from("carousels")
      .select("id, title, has_timer, timer_ends_at")
      .in("id", carouselIds);

    await Promise.all(
      (carousels ?? []).map(async (c) => {
        const { data: cpRows } = await supabase
          .from("carousel_products")
          .select("sort_order, products(id, name, slug, summary, brand, price, price_promo, product_images(url, alt, is_primary, sort_order))")
          .eq("carousel_id", c.id)
          .order("sort_order");

        const products = (cpRows ?? []).map((row) => {
          const p = row.products as { id: string; name: string; slug: string; summary: string | null; brand: string | null; price: number | null; price_promo: number | null; product_images: { url: string; alt: string | null; is_primary: boolean; sort_order: number }[] };
          const imgs = [...(p.product_images ?? [])].sort((a, b) => a.is_primary ? -1 : b.is_primary ? 1 : a.sort_order - b.sort_order);
          return { id: p.id, name: p.name, slug: p.slug, summary: p.summary, brand: p.brand, price: p.price, price_promo: p.price_promo, imageUrl: imgs[0]?.url, imageAlt: imgs[0]?.alt };
        });

        carouselsData[c.id] = { title: c.title, has_timer: c.has_timer, timer_ends_at: c.timer_ends_at, products };
      })
    );
  }

  // Carrega product_sections referenciadas pelas seções
  const productSectionIds = (productSectionsRes.data ?? [])
    .filter((s) => s.reference_id)
    .map((s) => s.reference_id as string);

  const productSectionsData: Record<string, { title: string; has_timer: boolean; timer_ends_at: string | null; rows: number; products: { id: string; name: string; slug: string; summary: string | null; brand: string | null; imageUrl?: string; imageAlt?: string | null }[] }> = {};

  if (productSectionIds.length > 0) {
    const { data: pSections } = await supabase
      .from("product_sections")
      .select("id, title, has_timer, timer_ends_at, rows")
      .in("id", productSectionIds);

    await Promise.all(
      (pSections ?? []).map(async (ps) => {
        const { data: itemRows } = await supabase
          .from("product_section_items")
          .select("sort_order, products(id, name, slug, summary, brand, price, price_promo, product_images(url, alt, is_primary, sort_order))")
          .eq("section_id", ps.id)
          .order("sort_order")
          .limit(ps.rows * 4);

        const products = (itemRows ?? []).map((row) => {
          const p = row.products as { id: string; name: string; slug: string; summary: string | null; brand: string | null; price: number | null; price_promo: number | null; product_images: { url: string; alt: string | null; is_primary: boolean; sort_order: number }[] };
          const imgs = [...(p.product_images ?? [])].sort((a, b) => a.is_primary ? -1 : b.is_primary ? 1 : a.sort_order - b.sort_order);
          return { id: p.id, name: p.name, slug: p.slug, summary: p.summary, brand: p.brand, price: p.price, price_promo: p.price_promo, imageUrl: imgs[0]?.url, imageAlt: imgs[0]?.alt };
        });

        productSectionsData[ps.id] = { title: ps.title, has_timer: ps.has_timer ?? false, timer_ends_at: ps.timer_ends_at, rows: ps.rows ?? 1, products };
      })
    );
  }

  // Carrega image_carousels referenciados pelas seções
  const imageCarouselIds = (imageCarouselsRes.data ?? [])
    .filter((s) => s.reference_id)
    .map((s) => s.reference_id as string);

  const imageCarouselsData: Record<string, { items: { id: string; url: string; alt: string | null }[] }> = {};

  if (imageCarouselIds.length > 0) {
    const { data: iCarousels } = await supabase
      .from("image_carousels")
      .select("id")
      .in("id", imageCarouselIds)
      .eq("active", true);

    await Promise.all(
      (iCarousels ?? []).map(async (c) => {
        const { data: itemRows } = await supabase
          .from("image_carousel_items")
          .select("id, url, alt")
          .eq("carousel_id", c.id)
          .order("sort_order");

        imageCarouselsData[c.id] = { items: itemRows ?? [] };
      })
    );
  }

  // Carrega color_sections referenciadas pelas seções
  const colorSectionIds = (sectionsRes.data ?? [])
    .filter((s) => s.type === "cores_tintas" && s.reference_id)
    .map((s) => s.reference_id as string);

  const colorSectionsData: Record<string, { title: string; colors: { id: string; name: string; hex: string; code: string; family: string | null }[] }> = {};

  if (colorSectionIds.length > 0) {
    const { data: cSections } = await supabase
      .from("color_sections")
      .select("id, title")
      .in("id", colorSectionIds)
      .eq("active", true);

    await Promise.all(
      (cSections ?? []).map(async (cs) => {
        const { data: itemRows } = await supabase
          .from("color_section_items")
          .select("sort_order, paint_colors(id, name, hex, code, family)")
          .eq("section_id", cs.id)
          .order("sort_order");

        const colors = (itemRows ?? []).map((row) =>
          row.paint_colors as { id: string; name: string; hex: string; code: string; family: string | null }
        );

        colorSectionsData[cs.id] = { title: cs.title, colors };
      })
    );
  }

  return {
    heroBanner: heroBannerRes.data,
    stripBanner: stripBannerRes.data,
    categories: categoriesRes.data ?? [],
    stores: storesRes.data ?? [],
    sections: sectionsRes.data ?? [],
    carouselsData,
    productSectionsData,
    imageCarouselsData,
    colorSectionsData,
    brands: brandsRes.data ?? [],
    settings,
  };
}

export default async function HomePage() {
  const {
    heroBanner,
    stripBanner,
    categories,
    stores,
    sections,
    carouselsData,
    productSectionsData,
    imageCarouselsData,
    colorSectionsData,
    brands,
    settings,
  } = await getHomeData();

  const { whatsapp, siteName, instagram, facebook, email, tagline, diferenciais, diferenciaisSize, diferenciaisCarouselCols, quemSomos, cta } = settings;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";

  const sameAs: string[] = [];
  if (instagram) sameAs.push(instagram);
  if (facebook) sameAs.push(facebook);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: base,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(whatsapp ? { telephone: whatsapp } : {}),
    ...(email ? { email } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {sections.map((section) => {
        switch (section.type) {
          case "hero":
            return (
              <HeroSection
                key={section.id}
                title={heroBanner?.title ?? tagline}
                subtitle={heroBanner?.subtitle ?? undefined}
                imageUrl={heroBanner?.image_url ?? undefined}
                whatsapp={whatsapp}
              />
            );

          case "diferenciais":
            return <DiferenciaisSection key={section.id} items={diferenciais} size={diferenciaisSize} carouselCols={diferenciaisCarouselCols} />;

          case "categorias":
            return <CategoriasSection key={section.id} categories={categories} />;

          case "banner_strip":
            return stripBanner ? (
              <BannerIntermediario
                key={section.id}
                title={stripBanner.title}
                subtitle={stripBanner.subtitle}
                imageUrl={stripBanner.image_url}
                ctaText={stripBanner.cta_text}
                ctaUrl={stripBanner.cta_url}
              />
            ) : null;

          case "carousel": {
            if (!section.reference_id) return null;
            const c = carouselsData[section.reference_id];
            if (!c) return null;
            return (
              <CarouselSection
                key={section.id}
                title={c.title}
                products={c.products}
                whatsapp={whatsapp}
                hasTimer={c.has_timer ?? false}
                timerEndsAt={c.timer_ends_at}
              />
            );
          }

          case "image_carousel": {
            if (!section.reference_id) return null;
            const ic = imageCarouselsData[section.reference_id];
            if (!ic || ic.items.length < 4) return null;
            return <ImageCarouselSection key={section.id} items={ic.items} />;
          }

          case "product_section": {
            if (!section.reference_id) return null;
            const ps = productSectionsData[section.reference_id];
            if (!ps) return null;
            return (
              <ProductSectionDisplay
                key={section.id}
                title={ps.title}
                products={ps.products}
                whatsapp={whatsapp}
                hasTimer={ps.has_timer}
                timerEndsAt={ps.timer_ends_at}
              />
            );
          }

          case "cores_tintas": {
            if (!section.reference_id) return null;
            const cs = colorSectionsData[section.reference_id];
            if (!cs || cs.colors.length === 0) return null;
            return <CoresTintasSection key={section.id} title={cs.title} colors={cs.colors} />;
          }

          case "brands":
            return <BrandsSection key={section.id} brands={brands} />;

          case "quem_somos":
            return <QuemSomosSection key={section.id} {...quemSomos} />;

          case "nossas_lojas":
            return <NossasLojasSection key={section.id} stores={stores} />;

          case "cta_comercial":
            return <CtaComercialSection key={section.id} whatsapp={whatsapp} {...cta} />;

          default:
            return null;
        }
      })}
    </>
  );
}
