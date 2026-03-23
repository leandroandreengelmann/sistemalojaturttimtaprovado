import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";
import { ProductImages } from "@/components/admin/product-images";
import { deleteProduct } from "@/lib/actions/products";
import Link from "next/link";
import { ArrowLeft, Trash } from "@phosphor-icons/react/dist/ssr";

interface Props { params: Promise<{ id: string }> }

export default async function EditarProdutoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }, { data: images }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("id, name, parent_id").eq("active", true).order("name"),
    supabase.from("product_images").select("*").eq("product_id", id).order("sort_order"),
  ]);

  if (!product) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/produtos" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Editar Produto</h1>
            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{product.name}</p>
          </div>
        </div>
        <form action={async () => {
          "use server";
          await deleteProduct(id);
          redirect("/admin/produtos");
        }}>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition-colors"
          >
            <Trash size={14} />
            Excluir
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <ProductForm product={product} categories={categories ?? []} />
        <ProductImages productId={id} images={images ?? []} />
      </div>
    </div>
  );
}
