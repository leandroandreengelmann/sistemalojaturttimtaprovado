"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveSetting(key: string, value: unknown) {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase.from("settings").upsert({ key, value: value as any }, { onConflict: "key" });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  revalidatePath("/admin/identidade");
  revalidatePath("/admin/configuracoes");
  return {};
}
