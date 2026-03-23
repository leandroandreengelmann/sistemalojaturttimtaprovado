import { createClient } from "@/lib/supabase/server";
import { CoresPageClient } from "./cores-page-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cores de Tintas | Turatti",
  description: "Explore nossa coleção completa de cores de tintas. Encontre a cor perfeita para o seu projeto.",
};

export default async function CoresPage() {
  const supabase = await createClient();
  const { data: colors } = await supabase
    .from("paint_colors")
    .select("*")
    .eq("active", true)
    .order("sort_order")
    .order("name");

  return <CoresPageClient colors={colors ?? []} />;
}
