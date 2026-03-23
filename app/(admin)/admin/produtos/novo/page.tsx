import { createClient } from "@/lib/supabase/server";
import { NovoProdutoForm } from "@/components/admin/novo-produto-form";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default async function NovoProdutoPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, parent_id")
    .eq("active", true)
    .order("name");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/produtos" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Novo Produto</h1>
          <p className="text-xs text-gray-500 mt-0.5">Preencha os dados e adicione as imagens</p>
        </div>
      </div>

      <NovoProdutoForm categories={categories ?? []} />
    </div>
  );
}
