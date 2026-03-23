import { createClient } from "@/lib/supabase/server";
import { updateContactStatus, deleteContact } from "@/lib/actions/contacts";
import { Envelope, Phone, Trash } from "@phosphor-icons/react/dist/ssr";

const statusOptions = [
  { value: "new",         label: "Novo",           cls: "bg-primary/10 text-primary border-primary/20" },
  { value: "in_progress", label: "Em andamento",   cls: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { value: "done",        label: "Concluído",      cls: "bg-green-50 text-green-700 border-green-200" },
];

export default async function ContatosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("contacts")
    .select("*, products(name)")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data: contacts } = await query;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Contatos / Leads</h1>
          <p className="text-xs text-gray-500 mt-0.5">{contacts?.length ?? 0} registros</p>
        </div>
        {/* Filtro por status */}
        <div className="flex gap-2">
          <a href="/admin/contatos"
            className={`px-3 py-1.5 text-xs font-medium border transition-colors rounded-md ${!status ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-600 hover:border-primary"}`}
          >Todos</a>
          {statusOptions.map((s) => (
            <a key={s.value} href={`/admin/contatos?status=${s.value}`}
              className={`px-3 py-1.5 text-xs font-medium border transition-colors rounded-md ${status === s.value ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-600 hover:border-primary"}`}
            >{s.label}</a>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Contato</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Produto</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Data</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(contacts ?? []).map((c) => {
              const product = c.products as { name: string } | null;
              const st = statusOptions.find((s) => s.value === c.status) ?? statusOptions[0];
              return (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{c.name}</p>
                    {c.email && (
                      <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary mt-0.5">
                        <Envelope size={11} /> {c.email}
                      </a>
                    )}
                    {c.phone && (
                      <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary">
                        <Phone size={11} /> {c.phone}
                      </a>
                    )}
                    {c.message && (
                      <p className="text-xs text-gray-400 mt-1 max-w-xs truncate">{c.message}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell">
                    {product?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">
                    {new Date(c.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <form action={async (fd: FormData) => {
                      "use server";
                      await updateContactStatus(c.id, fd.get("status") as string);
                    }}>
                      <select name="status" defaultValue={c.status}
                        onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                        className={`text-xs font-semibold px-2 py-1 border cursor-pointer focus:outline-none rounded-md ${st.cls}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <form action={async () => {
                      "use server";
                      await deleteContact(c.id);
                    }}>
                      <button type="submit"
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Excluir"
                      >
                        <Trash size={14} />
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!contacts || contacts.length === 0) && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">Nenhum contato recebido ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
