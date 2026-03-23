import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StoreForm } from "@/components/admin/store-form";
import { deleteStore } from "@/lib/actions/stores";
import Link from "next/link";
import { ArrowLeft, Trash } from "@phosphor-icons/react/dist/ssr";

interface Props { params: Promise<{ id: string }> }

export default async function EditarLojaPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: store } = await supabase.from("stores").select("*").eq("id", id).maybeSingle();
  if (!store) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/lojas" className="p-2 text-gray-400 hover:text-gray-700"><ArrowLeft size={18} /></Link>
          <h1 className="text-xl font-bold text-gray-900">Editar Loja</h1>
        </div>
        <form action={async () => { "use server"; await deleteStore(id); }}>
          <button type="submit" className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50">
            <Trash size={14} /> Excluir
          </button>
        </form>
      </div>
      <StoreForm store={store} />
    </div>
  );
}
