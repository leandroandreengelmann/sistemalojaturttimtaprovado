import { createClient } from "@/lib/supabase/server";
import { createMenuItem, deleteMenuItem } from "@/lib/actions/menus";
import { Trash, Plus } from "@phosphor-icons/react/dist/ssr";

export default async function MenusPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .order("location")
    .order("sort_order");

  const header = (items ?? []).filter((i) => i.location === "header");
  const footer = (items ?? []).filter((i) => i.location === "footer");

  const inputCls = "px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none bg-white transition-colors rounded-md";

  async function handleCreate(fd: FormData) {
    "use server";
    await createMenuItem(fd);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Menus e Rodapé</h1>

      {/* Formulário adicionar */}
      <div className="bg-white border border-gray-200 p-5 mb-8 rounded-lg">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Adicionar item</h2>
        <form action={handleCreate}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <input name="label" required placeholder="Texto do link" className={`${inputCls} col-span-2 sm:col-span-1 w-full`} />
            <input name="url" required placeholder="URL (ex: /loja)" className={`${inputCls} w-full`} />
            <select name="location" className={`${inputCls} w-full`}>
              <option value="header">Header</option>
              <option value="footer">Rodapé</option>
            </select>
            <input type="number" name="sort_order" placeholder="Ordem" defaultValue={0} min={0} className={`${inputCls} w-full`} />
          </div>
          <button type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 rounded-md"
          >
            <Plus size={14} weight="bold" /> Adicionar
          </button>
        </form>
      </div>

      {/* Header */}
      <MenuSection title="Menu do Header" items={header} />

      {/* Footer */}
      <MenuSection title="Links do Rodapé" items={footer} />
    </div>
  );
}

function MenuSection({
  title,
  items,
}: {
  title: string;
  items: { id: string; label: string; url: string; sort_order: number }[];
}) {
  return (
    <div className="bg-white border border-gray-200 mb-6 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-8">Nenhum item.</p>
      ) : (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.label}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{item.url}</td>
                <td className="px-4 py-3 text-xs text-gray-400 text-right w-16">#{item.sort_order}</td>
                <td className="px-4 py-3 text-right w-12">
                  <form action={async () => { "use server"; await deleteMenuItem(item.id); }}>
                    <button type="submit" className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash size={14} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
