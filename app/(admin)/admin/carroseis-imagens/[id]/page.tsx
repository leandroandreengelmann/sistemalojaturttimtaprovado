import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Trash } from "@phosphor-icons/react/dist/ssr";
import { ImageCarouselForm } from "@/components/admin/image-carousel-form";
import { ImageCarouselImages } from "@/components/admin/image-carousel-images";
import { deleteImageCarousel } from "@/lib/actions/image-carousels";

interface Props { params: Promise<{ id: string }> }

export default async function EditarCarrosselImagemPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: carousel }, { data: items }] = await Promise.all([
    supabase.from("image_carousels").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("image_carousel_items")
      .select("id, url, alt, sort_order")
      .eq("carousel_id", id)
      .order("sort_order"),
  ]);

  if (!carousel) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/carroseis-imagens" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Editar Carrossel de Imagens</h1>
            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{carousel.title}</p>
          </div>
        </div>
        <form action={async () => { "use server"; await deleteImageCarousel(id); redirect("/admin/carroseis-imagens"); }}>
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
        <ImageCarouselForm carousel={carousel} />
        <ImageCarouselImages carouselId={id} images={items ?? []} />
      </div>
    </div>
  );
}
