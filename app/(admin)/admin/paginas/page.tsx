import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";
import { seedInstitutionalPages } from "@/lib/actions/menus";
import { PencilSimple, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { SavedToast } from "@/components/admin/saved-toast";

export default async function PaginasPage() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("institutional_pages")
    .select("id, slug, title, seo_title, updated_at")
    .order("title");

  return (
    <div>
      <Suspense><SavedToast message="Página salva com sucesso!" /></Suspense>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Páginas Institucionais</h1>
          <p className="text-xs text-gray-500 mt-0.5">Edite o conteúdo das páginas do site</p>
        </div>
        {(!pages || pages.length === 0) && (
          <form action={seedInstitutionalPages}>
            <button type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 rounded-md"
            >
              <Sparkle size={16} weight="fill" /> Criar páginas padrão
            </button>
          </form>
        )}
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Página</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">URL</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Atualizado</th>
              <th className="text-right px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(pages ?? []).map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">/{p.slug}</td>
                <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">
                  {new Date(p.updated_at).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/paginas/${p.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
                  >
                    <PencilSimple size={13} /> Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!pages || pages.length === 0) && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">Nenhuma página criada. Clique em "Criar páginas padrão".</p>
          </div>
        )}
      </div>
    </div>
  );
}
