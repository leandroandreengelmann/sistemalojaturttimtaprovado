import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { deleteStore } from "@/lib/actions/stores";
import { Plus, PencilSimple, Trash, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";

export default async function LojasPage() {
  const supabase = await createClient();
  const { data: stores } = await supabase
    .from("stores")
    .select("*")
    .order("sort_order")
    .order("name");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Lojas / Unidades</h1>
          <p className="text-xs text-gray-500 mt-0.5">{stores?.length ?? 0} loja{(stores?.length ?? 0) !== 1 ? "s" : ""} cadastrada{(stores?.length ?? 0) !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/lojas/nova"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 rounded-md"
        >
          <Plus size={16} weight="bold" /> Nova loja
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(stores ?? []).map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">

            {/* Imagem */}
            {s.image_url ? (
              <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                <Image
                  src={s.image_url}
                  alt={s.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-video w-full bg-gray-50 flex items-center justify-center border-b border-gray-100">
                <MapPin size={28} className="text-gray-200" />
              </div>
            )}

            <div className="p-4 flex flex-col flex-1">
              {/* Cabeçalho */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{s.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={11} weight="fill" className="text-primary shrink-0" />
                    <span className="text-xs text-gray-500">{s.city}, {s.state}</span>
                  </div>
                </div>
                <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-sm ${s.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {s.active ? "Ativa" : "Inativa"}
                </span>
              </div>

              {/* Horários */}
              {s.hours && (
                <div className="flex items-start gap-1.5 mt-1 mb-2">
                  <Clock size={11} weight="fill" className="text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">{s.hours.replace(/\n/g, " · ")}</p>
                </div>
              )}

              {/* Endereço */}
              {s.address && (
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-1 mb-1">{s.address}</p>
              )}

              {/* Ações */}
              <div className="flex items-center gap-2 pt-3 mt-auto border-t border-gray-100">
                <Link
                  href={`/admin/lojas/${s.id}`}
                  className="flex items-center gap-1.5 flex-1 justify-center py-1.5 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
                >
                  <PencilSimple size={12} /> Editar
                </Link>
                <form action={async () => { "use server"; await deleteStore(s.id); }}>
                  <button
                    type="submit"
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors border border-gray-100 hover:border-red-200 rounded-md"
                    title="Excluir loja"
                  >
                    <Trash size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {(!stores || stores.length === 0) && (
          <div className="col-span-3 text-center py-16 bg-white border border-gray-200 rounded-lg">
            <MapPin size={32} className="mx-auto text-gray-200 mb-3" />
            <p className="text-sm text-gray-500 mb-2">Nenhuma loja cadastrada ainda.</p>
            <Link href="/admin/lojas/nova" className="text-primary text-sm font-medium hover:underline">
              Cadastrar primeira loja
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
