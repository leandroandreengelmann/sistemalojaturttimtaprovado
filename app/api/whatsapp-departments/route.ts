import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("whatsapp_departments")
    .select("id, name, description, sort_order, whatsapp_contacts(id, name, role, phone, sort_order, active)")
    .eq("active", true)
    .order("sort_order")
    .order("sort_order", { referencedTable: "whatsapp_contacts" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Filter only active contacts
  const departments = (data ?? []).map((d) => ({
    ...d,
    whatsapp_contacts: (d.whatsapp_contacts as any[]).filter((c) => c.active !== false),
  }));

  return NextResponse.json(departments);
}
