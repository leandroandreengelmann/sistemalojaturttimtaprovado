import { PaintColorForm } from "@/components/admin/paint-color-form";

export default function NovaCoresPaintPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Nova Cor</h1>
        <p className="text-xs text-gray-500 mt-0.5">Cadastre uma nova cor de tinta</p>
      </div>
      <PaintColorForm />
    </div>
  );
}
