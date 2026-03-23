import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ProductSectionForm } from "@/components/admin/product-section-form";
import { ProductSectionItems } from "@/components/admin/product-section-items";

interface Props { params: Promise<{ id: string }> }

export default async function EditarSecaoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: section }, { data: itemRows }] = await Promise.all([
    supabase.from("product_sections").select("*").eq("id", id).single(),
    supabase
      .from("product_section_items")
      .select("product_id, sort_order, products(id, name, brand, product_images(url, is_primary))")
      .eq("section_id", id)
      .order("sort_order"),
  ]);

  if (!section) notFound();

  const products = (itemRows ?? []).map((row) => {
    const p = row.products as { id: string; name: string; brand: string | null; product_images: { url: string; is_primary: boolean }[] };
    return {
      id: p.id,
      name: p.name,
      brand: p.brand,
      imageUrl: p.product_images?.find((i) => i.is_primary)?.url,
    };
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/secoes" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Editar Seção</h1>
          <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{section.title}</p>
        </div>
      </div>

      <div className="space-y-5">
        <ProductSectionForm section={section} />
        <ProductSectionItems sectionId={id} rows={section.rows} initial={products} />
      </div>
    </div>
  );
}
