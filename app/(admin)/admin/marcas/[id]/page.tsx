import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BrandForm } from "@/components/admin/brand-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditMarcaPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: brand } = await supabase
    .from("brands")
    .select("id, name, logo_url, website_url, sort_order, active")
    .eq("id", id)
    .single();

  if (!brand) notFound();

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Editar Marca</h1>
        <p className="text-xs text-gray-500 mt-0.5">{brand.name}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <BrandForm brand={brand} />
      </div>
    </div>
  );
}
