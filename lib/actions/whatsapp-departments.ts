"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/* ── Departments ─────────────────────────────────────────────────────────── */

export async function getDepartments() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("whatsapp_departments")
    .select("*, whatsapp_contacts(*)")
    .order("sort_order")
    .order("sort_order", { referencedTable: "whatsapp_contacts" });
  if (error) return { error: error.message, data: [] };
  return { data: data ?? [] };
}

export async function createDepartment(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("whatsapp_departments").insert({
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/whatsapp");
  return {};
}

export async function updateDepartment(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("whatsapp_departments")
    .update({
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/whatsapp");
  return {};
}

export async function toggleDepartment(id: string, active: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("whatsapp_departments")
    .update({ active })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/whatsapp");
  return {};
}

export async function deleteDepartment(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("whatsapp_departments").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/whatsapp");
  return {};
}

/* ── Contacts ────────────────────────────────────────────────────────────── */

export async function createContact(departmentId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("whatsapp_contacts").insert({
    department_id: departmentId,
    name: formData.get("name") as string,
    role: (formData.get("role") as string) || null,
    phone: formData.get("phone") as string,
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/whatsapp");
  return {};
}

export async function updateContact(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("whatsapp_contacts")
    .update({
      name: formData.get("name") as string,
      role: (formData.get("role") as string) || null,
      phone: formData.get("phone") as string,
      sort_order: Number(formData.get("sort_order") ?? 0),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/whatsapp");
  return {};
}

export async function toggleContact(id: string, active: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("whatsapp_contacts")
    .update({ active })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/whatsapp");
  return {};
}

export async function deleteContact(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("whatsapp_contacts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/whatsapp");
  return {};
}
