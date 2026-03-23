import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Trash } from "@phosphor-icons/react/dist/ssr";
import { ColorSectionForm } from "@/components/admin/color-section-form";
import { ColorSectionColors } from "@/components/admin/color-section-colors";
import { deleteColorSection } from "@/lib/actions/color-sections";

interface Props { params: Promise<{ id: string }> }

export default async function EditarSecaoCorePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: section }, { data: itemRows }] = await Promise.all([
    supabase.from("color_sections").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("color_section_items")
      .select("color_id, sort_order, paint_colors(id, name, hex, code, family)")
      .eq("section_id", id)
      .order("sort_order"),
  ]);

  if (!section) notFound();

  const colors = (itemRows ?? []).map((row) => {
    const c = row.paint_colors as { id: string; name: string; hex: string; code: string; family: string | null };
    return { id: c.id, name: c.name, hex: c.hex, code: c.code, family: c.family };
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/secoes-cores" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Editar Seção de Cores</h1>
            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{section.title}</p>
          </div>
        </div>
        <form action={async () => { "use server"; await deleteColorSection(id); redirect("/admin/secoes-cores"); }}>
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
        <ColorSectionForm section={section} />
        <ColorSectionColors sectionId={id} initial={colors} />
      </div>
    </div>
  );
}
