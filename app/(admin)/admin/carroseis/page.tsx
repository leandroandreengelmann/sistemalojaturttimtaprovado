import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, PencilSimple, Timer, XCircle } from "@phosphor-icons/react/dist/ssr";

export default async function CarroseisPage() {
  const supabase = await createClient();
  const { data: carousels } = await supabase
    .from("carousels")
    .select("id, title, active, has_timer, timer_ends_at, created_at")
    .order("created_at", { ascending: false });

  const counts = await Promise.all(
    (carousels ?? []).map((c) =>
      supabase.from("carousel_products").select("id", { count: "exact", head: true }).eq("carousel_id", c.id)
    )
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Carrosséis</h1>
          <p className="text-xs text-gray-500 mt-0.5">{carousels?.length ?? 0} carrosséis cadastrados</p>
        </div>
        <Link
          href="/admin/carroseis/novo"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors rounded-md"
        >
          <Plus size={16} weight="bold" />
          Novo carrossel
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Título</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Produtos</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Cronômetro</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(carousels ?? []).map((c, i) => {
              const expired = c.has_timer && c.timer_ends_at && new Date(c.timer_ends_at) < new Date();
              return (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{c.title}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-gray-600">{counts[i].count ?? 0}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.has_timer ? (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-sm ${expired ? "bg-gray-100 text-gray-400" : "bg-orange-50 text-orange-600"}`}>
                        {expired ? <XCircle size={10} /> : <Timer size={10} />}
                        {expired ? "Expirado" : "Ativo"}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm ${c.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {c.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/carroseis/${c.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
                    >
                      <PencilSimple size={13} />
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!carousels || carousels.length === 0) && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">Nenhum carrossel criado ainda.</p>
            <Link href="/admin/carroseis/novo" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Criar o primeiro carrossel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
