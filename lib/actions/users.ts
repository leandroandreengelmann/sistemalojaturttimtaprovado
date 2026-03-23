"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;
  const name     = formData.get("name")     as string;
  const role     = formData.get("role")     as string;

  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role },
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/usuarios");
  return {};
}

export async function updateUser(id: string, formData: FormData) {
  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;
  const name     = formData.get("name")     as string;
  const role     = formData.get("role")     as string;

  const supabase = createAdminClient();

  const payload: Parameters<typeof supabase.auth.admin.updateUserById>[1] = {
    email,
    user_metadata: { name, role },
  };
  if (password) payload.password = password;

  const { error } = await supabase.auth.admin.updateUserById(id, payload);
  if (error) return { error: error.message };

  revalidatePath("/admin/usuarios");
  return {};
}

export async function deleteUser(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) return { error: error.message };

  revalidatePath("/admin/usuarios");
  return {};
}
