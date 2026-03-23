import { ProductSectionForm } from "@/components/admin/product-section-form";

export default function NovaSecaoPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Nova Seção de Produtos</h1>
        <p className="text-xs text-gray-500 mt-0.5">Crie a seção e depois adicione os produtos</p>
      </div>
      <ProductSectionForm />
    </div>
  );
}
