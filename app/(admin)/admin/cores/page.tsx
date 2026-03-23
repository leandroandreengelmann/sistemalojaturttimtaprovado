import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deletePaintColor } from "@/lib/actions/paint-colors";
import { redirect } from "next/navigation";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";

export default async function CoresPage() {
  const supabase = await createClient();
  const { data: colors } = await supabase
    .from("paint_colors")
    .select("*")
    .order("sort_order")
    .order("name");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Cores de Tintas</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {colors?.length ?? 0} cor{(colors?.length ?? 0) !== 1 ? "es" : ""} cadastrada{(colors?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/cores/nova"
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={15} weight="bold" />
          Nova cor
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {!colors || colors.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-pink-400" />
            </div>
            <p className="text-sm text-gray-500">Nenhuma cor cadastrada.</p>
            <Link href="/admin/cores/nova" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Cadastrar primeira cor
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Cor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden sm:table-cell">Código</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Família</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Coleção</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Marca</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {colors.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-md border border-gray-200 shrink-0 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                        <p className="text-xs font-mono text-gray-400">{c.hex}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell">{c.code || "—"}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{c.family || "—"}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">{c.collection || "—"}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">{c.brand || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${c.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {c.active ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/cores/${c.id}`}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                        title="Editar"
                      >
                        <PencilSimple size={14} />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deletePaintColor(c.id);
                        redirect("/admin/cores");
                      }}>
                        <button type="submit" className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Excluir">
                          <Trash size={14} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
