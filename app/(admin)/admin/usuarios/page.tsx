import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Plus, PencilSimple, ShieldCheck, PencilLine } from "@phosphor-icons/react/dist/ssr";

const ROLE_LABELS: Record<string, { label: string; cls: string }> = {
  admin:  { label: "Administrador", cls: "bg-primary/10 text-primary" },
  editor: { label: "Editor",        cls: "bg-gray-100 text-gray-600" },
};

export default async function UsuariosPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.auth.admin.listUsers();
  const users = data?.users ?? [];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Usuários</h1>
          <p className="text-xs text-gray-500 mt-0.5">Gerencie quem tem acesso ao painel</p>
        </div>
        <Link
          href="/admin/usuarios/novo"
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={15} weight="bold" />
          Novo usuário
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {users.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">Nenhum usuário cadastrado.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Nome</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">E-mail</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Perfil</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Criado em</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => {
                const role = u.user_metadata?.role ?? "editor";
                const badge = ROLE_LABELS[role] ?? ROLE_LABELS.editor;
                const RoleIcon = role === "admin" ? ShieldCheck : PencilLine;
                return (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900">
                      {u.user_metadata?.name || <span className="text-gray-400 italic">sem nome</span>}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{u.email}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.cls}`}>
                        <RoleIcon size={11} weight="fill" />
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">
                      {new Date(u.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/usuarios/${u.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 hover:border-primary hover:text-primary transition-colors rounded-md"
                      >
                        <PencilSimple size={12} />
                        Editar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
