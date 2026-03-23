import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductGallery } from "@/components/public/product/product-gallery";
import { ProductCta } from "@/components/public/product/product-cta";
import { ProductSpecs } from "@/components/public/product/product-specs";
import { ProductCard } from "@/components/public/product-card";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      categories(id, name, slug, parent:parent_id(id, name, slug)),
      product_images(id, url, alt, is_primary, sort_order)
    `)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (!product) return null;

  // Busca relacionados separadamente para evitar ambiguidade de FK
  const { data: relations } = await supabase
    .from("product_relations")
    .select("related_product_id")
    .eq("product_id", product.id);

  const relatedIds = (relations ?? []).map((r) => r.related_product_id);

  const related =
    relatedIds.length > 0
      ? await supabase
          .from("products")
          .select("id, name, slug, summary, brand, price, price_promo, product_images(url, alt, is_primary, sort_order)")
          .in("id", relatedIds)
          .eq("active", true)
          .limit(4)
      : { data: [] };

  return { ...product, relatedProducts: related.data ?? [] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("name, summary, brand, product_images(url, is_primary, sort_order)")
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return {};

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";
  const images = [...((data.product_images as { url: string; is_primary: boolean; sort_order: number }[]) ?? [])]
    .sort((a, b) => (a.is_primary ? -1 : b.is_primary ? 1 : a.sort_order - b.sort_order));
  const primaryImage = images[0]?.url;

  return {
    title: `${data.name} | Turatti`,
    description: data.summary ?? undefined,
    alternates: { canonical: `${base}/produto/${slug}` },
    openGraph: {
      title: `${data.name} | Turatti`,
      description: data.summary ?? undefined,
      url: `${base}/produto/${slug}`,
      ...(primaryImage ? { images: [{ url: primaryImage, alt: data.name }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("settings")
    .select("key, value")
    .eq("key", "whatsapp")
    .maybeSingle();

  const whatsapp = (settings?.value as string) ?? "";

  const images = [...(product.product_images as {
    id: string; url: string; alt: string | null; is_primary: boolean; sort_order: number
  }[])].filter((img) => !!img.url).sort((a, b) => (a.is_primary ? -1 : b.is_primary ? 1 : a.sort_order - b.sort_order));

  const category = product.categories as { id: string; name: string; slug: string; parent: { id: string; name: string; slug: string } | null } | null;

  const related = (product.relatedProducts as {
    id: string; name: string; slug: string; summary: string | null; brand: string | null;
    price: number | null; price_promo: number | null;
    product_images: { url: string; alt: string | null; is_primary: boolean; sort_order: number }[];
  }[]);

  const specs = (product.specs ?? []) as { key: string; value: string }[];

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";

  const breadcrumbItems: { name: string; url: string }[] = [
    { name: "Início", url: base },
    { name: "Catálogo", url: `${base}/loja` },
  ];
  if (category?.parent) breadcrumbItems.push({ name: category.parent.name, url: `${base}/categoria/${category.parent.slug}` });
  if (category) breadcrumbItems.push({ name: category.name, url: `${base}/categoria/${category.slug}` });
  breadcrumbItems.push({ name: product.name, url: `${base}/produto/${product.slug}` });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary ?? undefined,
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    url: `${base}/produto/${product.slug}`,
    ...(images.length > 0 ? { image: images.map((img) => img.url) } : {}),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BRL",
      seller: { "@type": "Organization", name: "Turatti" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">Início</Link>
        <CaretRight size={10} weight="bold" />
        <Link href="/loja" className="hover:text-primary transition-colors">Catálogo</Link>
        {category?.parent && (
          <>
            <CaretRight size={10} weight="bold" />
            <Link href={`/categoria/${category.parent.slug}`} className="hover:text-primary transition-colors">
              {category.parent.name}
            </Link>
          </>
        )}
        {category && (
          <>
            <CaretRight size={10} weight="bold" />
            <Link href={`/categoria/${category.slug}`} className="hover:text-primary transition-colors">
              {category.name}
            </Link>
          </>
        )}
        <CaretRight size={10} weight="bold" />
        <span className="text-gray-600 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        {/* Galeria */}
        <ProductGallery images={images} productName={product.name} />

        {/* Info + CTAs */}
        <div>

          {/* Brand */}
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              {product.brand}
            </p>
          )}

          {/* Nome */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            {product.name}
          </h1>

          {/* Resumo */}
          {product.summary && (
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.summary}</p>
          )}

          {/* CTA */}
          <ProductCta
            productName={product.name}
            productSlug={product.slug}
            whatsapp={whatsapp}
            price={product.price as number | null}
            price_promo={product.price_promo as number | null}
          />
        </div>
      </div>

      {/* Descrição + Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        <div className="lg:col-span-2">
          {product.description && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Descrição do Produto
              </h2>
              <div
                className="prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
        <div>
          {specs.length > 0 && <ProductSpecs specs={specs} />}
        </div>
      </div>

      {/* CTA repetido */}
      <div className="border border-primary/20 bg-primary/5 p-6 lg:p-8 mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Interesse neste produto?</p>
            <p className="text-sm text-gray-500">Fale com nosso time e solicite um orçamento.</p>
          </div>
          <ProductCta
            productName={product.name}
            productSlug={product.slug}
            whatsapp={whatsapp}
            compact
          />
        </div>
      </div>

      {/* Produtos relacionados */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((r) => (
              <ProductCard
                key={r.id}
                id={r.id}
                name={r.name}
                slug={r.slug}
                summary={r.summary}
                brand={r.brand}
                imageUrl={r.product_images.sort((a, b) => (a.is_primary ? -1 : b.is_primary ? 1 : a.sort_order - b.sort_order))[0]?.url}
                imageAlt={r.product_images[0]?.alt}
                whatsapp={whatsapp}
                price={r.price}
                price_promo={r.price_promo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
