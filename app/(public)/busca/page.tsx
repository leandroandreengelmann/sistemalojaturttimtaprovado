import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/public/product-card";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Busca: "${q}" | Turatti` : "Busca | Turatti",
    robots: { index: false, follow: true },
  };
}

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; pagina?: string }>;
}) {
  const { q = "", pagina = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pagina));
  const limit = 16;
  const offset = (page - 1) * limit;

  const supabase = await createClient();

  const [settingsRes, productsRes] = await Promise.all([
    supabase.from("settings").select("key, value").eq("key", "whatsapp").maybeSingle(),
    (() => {
      let query = supabase
        .from("products")
        .select("id, name, slug, brand, summary, price, price_promo", { count: "exact" })
        .eq("active", true);
      if (q.trim()) {
        query = query.or(`name.ilike.%${q}%,brand.ilike.%${q}%,summary.ilike.%${q}%`);
      }
      return query.order("name").range(offset, offset + limit - 1);
    })(),
  ]);

  const whatsapp = (settingsRes.data?.value as string) ?? "";
  const { data: products, count } = productsRes;

  const total = count ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="h-1 w-full bg-primary" />

      <section className="border-b border-gray-100 bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form method="GET" action="/busca" className="flex gap-0 max-w-xl">
            <input
              name="q"
              defaultValue={q}
              placeholder="Buscar produtos, marcas, códigos..."
              autoFocus
              className="flex-1 px-4 py-3 text-sm border border-gray-200 border-r-0 focus:border-primary focus:outline-none bg-white rounded-l-md"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-primary text-white hover:bg-primary/90 transition-colors rounded-r-md"
            >
              <MagnifyingGlass size={18} weight="bold" />
            </button>
          </form>

          {q && (
            <p className="text-xs text-gray-500 mt-3">
              {total === 0
                ? `Nenhum resultado para "${q}"`
                : `${total} resultado${total !== 1 ? "s" : ""} para "${q}"`}
            </p>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!q.trim() ? (
            <div className="text-center py-20">
              <MagnifyingGlass size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">Digite algo para buscar produtos.</p>
            </div>
          ) : products && products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    brand={product.brand}
                    summary={product.summary ?? null}
                    whatsapp={whatsapp}
                    price={product.price as number | null}
                    price_promo={product.price_promo as number | null}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {page > 1 && (
                    <Link
                      href={`/busca?q=${encodeURIComponent(q)}&pagina=${page - 1}`}
                      className="px-4 py-2 border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
                    >
                      Anterior
                    </Link>
                  )}
                  <span className="px-4 py-2 text-xs text-gray-500">
                    {page} / {totalPages}
                  </span>
                  {page < totalPages && (
                    <Link
                      href={`/busca?q=${encodeURIComponent(q)}&pagina=${page + 1}`}
                      className="px-4 py-2 border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
                    >
                      Próxima
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <MagnifyingGlass size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-900 font-semibold mb-2">
                Nenhum resultado para &ldquo;{q}&rdquo;
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Tente usar termos mais genéricos ou verifique a ortografia.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/loja"
                  className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors rounded-md"
                >
                  Ver catálogo completo
                </Link>
                <Link
                  href="/contato"
                  className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-md"
                >
                  Falar com consultor
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
