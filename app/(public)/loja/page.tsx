import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/public/product-card";
import { CatalogFilters } from "@/components/public/catalog/catalog-filters";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";
  const page = Number(params.pagina ?? 1);
  return {
    title: "Catálogo de Produtos | Turatti",
    description:
      "Catálogo completo de tintas, ferragens e materiais de construção. Filtre por categoria ou marca e solicite orçamento pelo WhatsApp.",
    ...(page > 1 ? { alternates: { canonical: `${base}/loja` } } : {}),
  };
}

interface SearchParams {
  categoria?: string;
  marca?: string;
  ordem?: string;
  busca?: string;
  pagina?: string;
}

const PER_PAGE = 16;

async function getCatalogData(params: SearchParams) {
  const supabase = await createClient();
  const page = Math.max(1, Number(params.pagina ?? 1));
  const from = (page - 1) * PER_PAGE;
  const to = from + PER_PAGE - 1;

  let query = supabase
    .from("products")
    .select(
      "id, name, slug, summary, brand, price, price_promo, product_images(url, alt, is_primary, sort_order), categories(id, name, slug)",
      { count: "exact" }
    )
    .eq("active", true);

  if (params.categoria) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", params.categoria)
      .maybeSingle();
    if (cat) {
      // Inclui também produtos das subcategorias
      const { data: children } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", cat.id);
      const ids = [cat.id, ...(children ?? []).map((c) => c.id)];
      query = query.in("category_id", ids);
    }
  }

  if (params.marca) query = query.ilike("brand", params.marca);
  if (params.busca) query = query.ilike("name", `%${params.busca}%`);

  switch (params.ordem) {
    case "az":   query = query.order("name", { ascending: true });  break;
    case "za":   query = query.order("name", { ascending: false }); break;
    default:     query = query.order("created_at", { ascending: false });
  }

  const { data: products, count } = await query.range(from, to);

  const [categoriesRes, settingsRes] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, parent_id")
      .eq("active", true)
      .order("sort_order"),
    supabase.from("settings").select("key, value").eq("key", "whatsapp").maybeSingle(),
  ]);

  return {
    products: products ?? [],
    total: count ?? 0,
    categories: categoriesRes.data ?? [],
    whatsapp: (settingsRes.data?.value as string) ?? "",
    page,
    totalPages: Math.ceil((count ?? 0) / PER_PAGE),
  };
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { products, total, categories, whatsapp, page, totalPages } =
    await getCatalogData(params);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Catálogo de Produtos</h1>
        <p className="text-gray-500 text-sm mt-1">
          {total > 0 ? `${total} produto${total !== 1 ? "s" : ""} encontrado${total !== 1 ? "s" : ""}` : "Nenhum produto encontrado"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar de filtros */}
        <aside className="w-full lg:w-56 shrink-0">
          <CatalogFilters categories={categories} current={params} />
        </aside>

        {/* Grid de produtos */}
        <div className="flex-1 min-w-0">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <MagnifyingGlass size={40} className="text-gray-300 mb-4" />
              <p className="text-sm font-medium text-gray-700 mb-1">Nenhum produto encontrado</p>
              <p className="text-xs text-gray-400">Tente outros filtros ou termos de busca.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
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

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`?${new URLSearchParams({ ...params, pagina: String(p) })}`}
                      className={`w-9 h-9 flex items-center justify-center text-sm font-medium border transition-colors rounded-md ${
                        p === page
                          ? "bg-primary text-white border-primary"
                          : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {p}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
