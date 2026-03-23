import { UserForm } from "@/components/admin/user-form";

export default function NovoUsuarioPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Novo Usuário</h1>
        <p className="text-xs text-gray-500 mt-0.5">Crie um acesso ao painel administrativo</p>
      </div>
      <UserForm />
    </div>
  );
}
