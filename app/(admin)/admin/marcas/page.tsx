import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, PencilSimple } from "@phosphor-icons/react/dist/ssr";

export default async function MarcasPage() {
  const supabase = await createClient();
  const { data: brands } = await supabase
    .from("brands")
    .select("id, name, logo_url, website_url, sort_order, active")
    .order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Marcas</h1>
          <p className="text-xs text-gray-500 mt-0.5">{brands?.length ?? 0} marcas cadastradas</p>
        </div>
        <Link
          href="/admin/marcas/nova"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors rounded-md"
        >
          <Plus size={16} weight="bold" />
          Nova marca
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Marca</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Site</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Ordem</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(brands ?? []).map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {b.logo_url ? (
                      <img src={b.logo_url} alt={b.name} className="w-10 h-8 object-contain rounded-sm bg-gray-50 border border-gray-100 p-1" />
                    ) : (
                      <div className="w-10 h-8 rounded-sm bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-gray-400 uppercase">{b.name.slice(0, 2)}</span>
                      </div>
                    )}
                    <p className="font-medium text-gray-900">{b.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {b.website_url ? (
                    <a href={b.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate max-w-[200px] block">
                      {b.website_url.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-sm text-gray-600">{b.sort_order}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm ${b.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {b.active ? "Ativa" : "Inativa"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/marcas/${b.id}`}
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
        {(!brands || brands.length === 0) && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">Nenhuma marca cadastrada ainda.</p>
            <Link href="/admin/marcas/nova" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Cadastrar a primeira marca
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
