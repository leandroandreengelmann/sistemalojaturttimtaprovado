"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateContactStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("contacts").update({ status }).eq("id", id);
  revalidatePath("/admin/contatos");
}

export async function deleteContact(id: string) {
  const supabase = await createClient();
  await supabase.from("contacts").delete().eq("id", id);
  revalidatePath("/admin/contatos");
}

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string) || null;
  const phone = (formData.get("phone") as string) || null;
  const product_id = (formData.get("product_id") as string) || null;
  const message = (formData.get("message") as string) || null;

  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, phone, product_id, message });

  if (error) throw new Error(error.message);
}

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();
  const entries = Array.from(formData.entries());

  for (const [key, value] of entries) {
    await supabase
      .from("settings")
      .upsert({ key, value: JSON.stringify(value) }, { onConflict: "key" });
  }

  revalidatePath("/admin/identidade");
  revalidatePath("/");
}
