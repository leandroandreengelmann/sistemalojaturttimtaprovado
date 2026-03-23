import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { ProdutosTable } from "@/components/admin/produtos-table";

export default async function ProdutosPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, brand, active, categories(name), product_images(url, is_primary)")
    .order("created_at", { ascending: false });

  const list = (products ?? []).map((p) => ({
    ...p,
    categories: p.categories as { name: string } | null,
    product_images: (p.product_images as { url: string; is_primary: boolean }[]),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Produtos</h1>
          <p className="text-xs text-gray-500 mt-0.5">{list.length} produtos cadastrados</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors rounded-md"
        >
          <Plus size={16} weight="bold" />
          Novo produto
        </Link>
      </div>

      <ProdutosTable products={list} />
    </div>
  );
}
