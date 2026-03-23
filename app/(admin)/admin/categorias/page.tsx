import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deleteCategory } from "@/lib/actions/categories";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";

export default async function CategoriasPage() {
  const supabase = await createClient();
  const { data: cats } = await supabase
    .from("categories")
    .select("id, name, slug, active, sort_order, parent_id, parent:parent_id(name)")
    .order("sort_order");

  const roots = (cats ?? []).filter((c) => !c.parent_id);
  const children = (cats ?? []).filter((c) => c.parent_id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Categorias</h1>
        <Link href="/admin/categorias/nova"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors rounded-md"
        >
          <Plus size={16} weight="bold" /> Nova categoria
        </Link>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Nome</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Slug</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-right px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {roots.map((cat) => (
              <>
                <tr key={cat.id} className="bg-gray-50/30 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{cat.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">{cat.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${cat.active ? "bg-success/10 text-success-700" : "bg-gray-100 text-gray-500"}`}>
                      {cat.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/categorias/${cat.id}`}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                        title="Editar"
                      ><PencilSimple size={14} /></Link>
                      <form action={async () => { "use server"; await deleteCategory(cat.id); }}>
                        <button type="submit" className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Excluir">
                          <Trash size={14} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
                {children.filter((c) => c.parent_id === cat.id).map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-2.5 text-gray-600 pl-10 text-sm">↳ {sub.name}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-400 hidden sm:table-cell">{sub.slug}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${sub.active ? "bg-success/10 text-success-700" : "bg-gray-100 text-gray-500"}`}>
                        {sub.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/categorias/${sub.id}`}
                          className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                        ><PencilSimple size={14} /></Link>
                        <form action={async () => { "use server"; await deleteCategory(sub.id); }}>
                          <button type="submit" className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash size={14} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
        {(!cats || cats.length === 0) && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">Nenhuma categoria cadastrada.</p>
            <Link href="/admin/categorias/nova" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Criar a primeira categoria
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
