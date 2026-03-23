import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/public/product-card";
import { CtaComercialSection } from "@/components/public/home/cta-comercial-section";
import Link from "next/link";
import Image from "next/image";
import { CaretRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return {};
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";
  return {
    title: `${data.name} | Turatti`,
    description: data.description ?? undefined,
    alternates: { canonical: `${base}/categoria/${slug}` },
    openGraph: {
      title: `${data.name} | Turatti`,
      description: data.description ?? undefined,
      url: `${base}/categoria/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*, parent:parent_id(id, name, slug)")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (!category) notFound();

  const [subcatsRes, settingsRes] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, image_url, description")
      .eq("parent_id", category.id)
      .eq("active", true)
      .order("sort_order"),
    supabase.from("settings").select("key, value").eq("key", "whatsapp").maybeSingle(),
  ]);

  // Inclui produtos desta categoria E de todas as suas subcategorias
  const subcatIds = (subcatsRes.data ?? []).map((s) => s.id);
  const allCategoryIds = [category.id, ...subcatIds];

  const productsRes = await supabase
    .from("products")
    .select("id, name, slug, summary, brand, price, price_promo, product_images(url, alt, is_primary, sort_order)")
    .eq("active", true)
    .in("category_id", allCategoryIds)
    .order("created_at", { ascending: false })
    .limit(16);

  const whatsapp = (settingsRes.data?.value as string) ?? "";
  const parent = category.parent as { id: string; name: string; slug: string } | null;

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";

  const breadcrumbItems: { name: string; url: string }[] = [
    { name: "Início", url: base },
    { name: "Catálogo", url: `${base}/loja` },
  ];
  if (parent) breadcrumbItems.push({ name: parent.name, url: `${base}/categoria/${parent.slug}` });
  breadcrumbItems.push({ name: category.name, url: `${base}/categoria/${slug}` });

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Breadcrumb + Header */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
            <CaretRight size={10} weight="bold" />
            <Link href="/loja" className="hover:text-primary transition-colors">Catálogo</Link>
            {parent && (
              <>
                <CaretRight size={10} weight="bold" />
                <Link href={`/categoria/${parent.slug}`} className="hover:text-primary transition-colors">
                  {parent.name}
                </Link>
              </>
            )}
            <CaretRight size={10} weight="bold" />
            <span className="text-gray-600 font-medium">{category.name}</span>
          </nav>

          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-6 bg-primary" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                  {category.name}
                </h1>
              </div>
              {category.description && (
                <p className="text-sm text-gray-500 mt-2 max-w-xl">{category.description}</p>
              )}
            </div>
            {category.image_url && (
              <div className="relative w-24 h-24 shrink-0 hidden sm:block overflow-hidden border border-gray-200">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Subcategorias */}
        {subcatsRes.data && subcatsRes.data.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Subcategorias
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {subcatsRes.data.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/categoria/${sub.slug}`}
                  className="group flex flex-col items-center gap-2 p-3 border border-gray-100 hover:border-primary text-center transition-colors"
                >
                  {sub.image_url ? (
                    <div className="relative w-12 h-12 overflow-hidden">
                      <Image src={sub.image_url} alt={sub.name} fill className="object-cover" sizes="48px" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <div className="w-5 h-5 bg-primary/30" />
                    </div>
                  )}
                  <span className="text-xs font-medium text-gray-700 group-hover:text-primary transition-colors leading-tight">
                    {sub.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Produtos */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Produtos{subcatIds.length > 0 ? " da categoria e subcategorias" : ""} <span className="text-gray-400 font-normal text-sm ml-1">({productsRes.data?.length ?? 0})</span>
          </h2>
          <Link href={`/loja?categoria=${slug}`} className="flex items-center gap-1 text-xs text-primary hover:underline">
            Ver todos
            <ArrowRight size={12} weight="bold" />
          </Link>
        </div>

        {productsRes.data && productsRes.data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productsRes.data.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                summary={product.summary}
                brand={product.brand}
                imageUrl={(product.product_images as { url: string; alt: string | null; is_primary: boolean; sort_order: number }[]).sort((a, b) => (a.is_primary ? -1 : b.is_primary ? 1 : a.sort_order - b.sort_order))[0]?.url}
                imageAlt={(product.product_images as { url: string; alt: string | null }[])[0]?.alt}
                whatsapp={whatsapp}
                price={product.price as number | null}
                price_promo={product.price_promo as number | null}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-gray-200">
            <p className="text-sm text-gray-500">Nenhum produto nesta categoria ainda.</p>
          </div>
        )}

        {/* Bloco ajuda */}
        <div className="mt-12 p-6 border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">Precisa de ajuda para escolher?</p>
            <p className="text-xs text-gray-500 mt-0.5">Nossos especialistas encontram o produto certo para você.</p>
          </div>
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Olá%2C%20preciso%20de%20ajuda%20na%20categoria%20${encodeURIComponent(category.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all shrink-0"
          >
            Falar com Vendedor
          </a>
        </div>
      </div>

      <CtaComercialSection whatsapp={whatsapp} />
    </>
  );
}
