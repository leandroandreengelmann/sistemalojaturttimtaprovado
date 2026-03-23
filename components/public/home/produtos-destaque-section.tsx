import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "@/components/public/product-card";

interface Product {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  brand: string | null;
  price?: number | null;
  price_promo?: number | null;
  product_images: { url: string; alt: string | null }[];
}

interface ProdutosDestaqueSectionProps {
  products: Product[];
  whatsapp: string;
  title?: string;
  subtitle?: string;
  showNew?: boolean;
}

export function ProdutosDestaqueSection({
  products,
  whatsapp,
  title = "Produtos em Destaque",
  subtitle = "Conheça os produtos mais procurados pelos nossos clientes",
  showNew = false,
}: ProdutosDestaqueSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              {showNew ? "Recém chegados" : "Mais procurados"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-lg">{subtitle}</p>
          </div>
          <Link
            href="/loja"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver catálogo
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              summary={product.summary}
              brand={product.brand}
              imageUrl={product.product_images[0]?.url}
              imageAlt={product.product_images[0]?.alt}
              whatsapp={whatsapp}
              price={product.price}
              price_promo={product.price_promo}
            />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/loja"
            className="flex items-center justify-center gap-1.5 w-full py-3 border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors rounded-md"
          >
            Ver catálogo completo
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
