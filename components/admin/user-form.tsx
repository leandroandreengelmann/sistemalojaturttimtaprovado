"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser, updateUser, deleteUser } from "@/lib/actions/users";
import { Eye, EyeSlash } from "@phosphor-icons/react";

interface User {
  id: string;
  email?: string;
  user_metadata?: { name?: string; role?: string };
}

interface UserFormProps {
  user?: User;
}

const ROLES = [
  { value: "admin",  label: "Administrador — acesso total" },
  { value: "editor", label: "Editor — gerencia conteúdo" },
];

const inputCls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none transition-colors bg-white";
const labelCls = "block text-xs font-semibold text-gray-700 mb-1.5";

export function UserForm({ user }: UserFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const isEdit = !!user;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = isEdit ? await updateUser(user.id, fd) : await createUser(fd);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success(isEdit ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");
      router.push("/admin/usuarios");
    });
  }

  async function handleDelete() {
    if (!user) return;
    if (!confirm(`Excluir o usuário ${user.email}? Esta ação não pode ser desfeita.`)) return;
    startTransition(async () => {
      const result = await deleteUser(user.id);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Usuário excluído.");
      router.push("/admin/usuarios");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        {/* Nome */}
        <div>
          <label className={labelCls}>Nome completo *</label>
          <input
            name="name"
            required
            defaultValue={user?.user_metadata?.name ?? ""}
            className={inputCls}
            placeholder="Ex: João Silva"
          />
        </div>

        {/* E-mail */}
        <div>
          <label className={labelCls}>E-mail *</label>
          <input
            name="email"
            type="email"
            required
            defaultValue={user?.email ?? ""}
            className={inputCls}
            placeholder="email@empresa.com"
          />
        </div>

        {/* Senha */}
        <div>
          <label className={labelCls}>
            {isEdit ? "Nova senha (deixe em branco para não alterar)" : "Senha *"}
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required={!isEdit}
              minLength={6}
              className={`${inputCls} pr-10`}
              placeholder={isEdit ? "••••••••" : "Mínimo 6 caracteres"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Perfil */}
        <div>
          <label className={labelCls}>Perfil de acesso *</label>
          <select
            name="role"
            required
            defaultValue={user?.user_metadata?.role ?? "editor"}
            className={inputCls}
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {isPending ? "Salvando..." : isEdit ? "Salvar alterações" : "Criar usuário"}
        </button>
        <a
          href="/admin/usuarios"
          className="px-5 py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-md hover:border-gray-300 transition-colors"
        >
          Cancelar
        </a>

        {isEdit && (
          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="ml-auto px-4 py-2.5 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            Excluir usuário
          </button>
        )}
      </div>
    </form>
  );
}
