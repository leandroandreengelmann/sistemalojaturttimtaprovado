import { BrandForm } from "@/components/admin/brand-form";

export default function NovaMarcaPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Nova Marca</h1>
        <p className="text-xs text-gray-500 mt-0.5">Cadastre uma marca para exibir na vitrine da home</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <BrandForm />
      </div>
    </div>
  );
}
