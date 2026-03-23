import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Trash } from "@phosphor-icons/react/dist/ssr";
import { CarouselForm } from "@/components/admin/carousel-form";
import { CarouselProducts } from "@/components/admin/carousel-products";
import { deleteCarousel } from "@/lib/actions/carousels";

interface Props { params: Promise<{ id: string }> }

export default async function EditarCarrosselPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: carousel }, { data: cpRows }] = await Promise.all([
    supabase.from("carousels").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("carousel_products")
      .select("product_id, sort_order, products(id, name, brand, product_images(url, is_primary))")
      .eq("carousel_id", id)
      .order("sort_order"),
  ]);

  if (!carousel) notFound();

  const products = (cpRows ?? []).map((row) => {
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/carroseis" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Editar Carrossel</h1>
            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{carousel.title}</p>
          </div>
        </div>
        <form action={async () => { "use server"; await deleteCarousel(id); redirect("/admin/carroseis"); }}>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition-colors rounded-md"
          >
            <Trash size={14} />
            Excluir
          </button>
        </form>
      </div>

      <div className="space-y-5">
        <CarouselForm carousel={carousel} />
        <CarouselProducts carouselId={id} initial={products} />
      </div>
    </div>
  );
}
