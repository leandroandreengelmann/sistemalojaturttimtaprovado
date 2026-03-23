"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addHomeSection(type: string, referenceId: string | null) {
  const supabase = await createClient();
  const { data: last } = await supabase
    .from("home_sections")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("home_sections").insert({
    type,
    reference_id: referenceId,
    sort_order: (last?.sort_order ?? -1) + 1,
    active: true,
  });
  revalidatePath("/admin/home");
  revalidatePath("/");
}

export async function removeHomeSection(id: string) {
  const supabase = await createClient();
  await supabase.from("home_sections").delete().eq("id", id);
  revalidatePath("/admin/home");
  revalidatePath("/");
}

export async function toggleHomeSectionActive(id: string, active: boolean) {
  const supabase = await createClient();
  await supabase.from("home_sections").update({ active }).eq("id", id);
  revalidatePath("/admin/home");
  revalidatePath("/");
}

export async function reorderHomeSections(ids: string[]) {
  const supabase = await createClient();
  await Promise.all(
    ids.map((id, index) =>
      supabase.from("home_sections").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/home");
  revalidatePath("/");
}
