import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { CarouselForm } from "@/components/admin/carousel-form";

export default function NovoCarrosselPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/carroseis" className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Novo Carrossel</h1>
          <p className="text-xs text-gray-500 mt-0.5">Configure e depois adicione produtos</p>
        </div>
      </div>
      <CarouselForm />
    </div>
  );
}
