import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deleteBanner } from "@/lib/actions/banners";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";

const positionLabel: Record<string, string> = {
  hero:          "Hero (principal)",
  intermediario: "Intermediário",
  categoria:     "Categoria",
};

export default async function BannersPage() {
  const supabase = await createClient();
  const { data: banners } = await supabase
    .from("banners")
    .select("*")
    .order("position")
    .order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Banners</h1>
        <Link href="/admin/banners/novo"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 rounded-md"
        >
          <Plus size={16} weight="bold" /> Novo banner
        </Link>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Banner</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Posição</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-right px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(banners ?? []).map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-10 bg-gray-100 border border-gray-100 shrink-0 overflow-hidden rounded-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.image_url} alt={b.title ?? ""} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{b.title ?? "Sem título"}</p>
                      {b.cta_text && <p className="text-xs text-gray-400">CTA: {b.cta_text}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell">
                  {positionLabel[b.position] ?? b.position}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${b.active ? "bg-success/10 text-success-700" : "bg-gray-100 text-gray-500"}`}>
                    {b.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/banners/${b.id}`}
                      className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                    ><PencilSimple size={14} /></Link>
                    <form action={async () => { "use server"; await deleteBanner(b.id); }}>
                      <button type="submit" className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash size={14} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!banners || banners.length === 0) && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">Nenhum banner cadastrado.</p>
            <Link href="/admin/banners/novo" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Criar o primeiro banner
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
