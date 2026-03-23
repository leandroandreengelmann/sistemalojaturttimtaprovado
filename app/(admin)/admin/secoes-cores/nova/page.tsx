import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ColorSectionForm } from "@/components/admin/color-section-form";

export default function NovaSecaoCorePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/secoes-cores" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Nova Seção de Cores</h1>
          <p className="text-xs text-gray-500 mt-0.5">Crie uma seção com cores selecionadas</p>
        </div>
      </div>

      <ColorSectionForm />
    </div>
  );
}
