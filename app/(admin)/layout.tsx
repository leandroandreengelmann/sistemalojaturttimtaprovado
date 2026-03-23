import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { createClient } from "@/lib/supabase/server";

async function getLogoUrl(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "header_logo_url")
    .single();
  return data?.value ?? null;
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const logoUrl = await getLogoUrl();

  return (
    <>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar desktop */}
        <div className="hidden lg:flex shrink-0">
          <AdminSidebar logoUrl={logoUrl} />
        </div>

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader title="Painel Administrativo" logoUrl={logoUrl} />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
