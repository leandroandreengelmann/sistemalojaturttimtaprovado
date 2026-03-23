import { createClient } from "@/lib/supabase/server";
import { CategoryForm } from "@/components/admin/category-form";

export default async function NovaCategoriaPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, parent_id")
    .eq("active", true)
    .order("name");

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Nova Categoria</h1>
      <CategoryForm categories={categories ?? []} />
    </div>
  );
}
