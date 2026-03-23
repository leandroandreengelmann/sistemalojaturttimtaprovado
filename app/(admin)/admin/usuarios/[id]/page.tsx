import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { UserForm } from "@/components/admin/user-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarUsuarioPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(id);

  if (error || !data?.user) notFound();

  const user = data.user;

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Editar Usuário</h1>
        <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
      </div>
      <UserForm user={{
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
      }} />
    </div>
  );
}
