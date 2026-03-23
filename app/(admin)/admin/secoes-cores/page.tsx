import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, PencilSimple } from "@phosphor-icons/react/dist/ssr";

export default async function SecoesCorePage() {
  const supabase = await createClient();
  const { data: sections } = await supabase
    .from("color_sections")
    .select("id, title, description, active, sort_order, created_at")
    .order("sort_order")
    .order("created_at");

  const counts = await Promise.all(
    (sections ?? []).map((s) =>
      supabase
        .from("color_section_items")
        .select("id", { count: "exact", head: true })
        .eq("section_id", s.id)
    )
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Seções de Cores</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {sections?.length ?? 0} seção{(sections?.length ?? 0) !== 1 ? "ões" : ""} cadastrada{(sections?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/secoes-cores/nova"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors rounded-md"
        >
          <Plus size={16} weight="bold" />
          Nova seção
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Título</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Cores</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(sections ?? []).map((s, i) => (
              <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{s.title}</p>
                  {s.description && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{s.description}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-sm text-gray-600">{counts[i].count ?? 0}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm ${s.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {s.active ? "Ativa" : "Inativa"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/secoes-cores/${s.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
                  >
                    <PencilSimple size={13} />
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!sections || sections.length === 0) && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">Nenhuma seção de cores criada ainda.</p>
            <Link href="/admin/secoes-cores/nova" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Criar a primeira seção
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
