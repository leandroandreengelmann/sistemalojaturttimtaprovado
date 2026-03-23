"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createStore, updateStore } from "@/lib/actions/stores";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Tables } from "@/lib/types/database.types";

interface StoreFormProps { store?: Tables<"stores"> }

const UF = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export function StoreForm({ store }: StoreFormProps) {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string>(store?.image_url ?? "");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("image_url", imageUrl);
    startTransition(async () => {
      const result = store ? await updateStore(store.id, fd) : await createStore(fd);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success(store ? "Loja atualizada com sucesso!" : "Loja cadastrada com sucesso!");
      router.push("/admin/lojas");
    });
  }

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";
  const sectionCls = "bg-white border border-gray-200 p-5 space-y-4 rounded-lg";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Identificação */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Identificação</h2>

        <div>
          <label className={labelCls}>Nome da loja *</label>
          <input
            name="name"
            required
            defaultValue={store?.name ?? ""}
            className={inputCls}
            placeholder="Turatti — Unidade Centro"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Telefone</label>
            <input name="phone" defaultValue={store?.phone ?? ""} className={inputCls} placeholder="(11) 3333-4444" />
          </div>
          <div>
            <label className={labelCls}>WhatsApp (com DDI)</label>
            <input name="whatsapp" defaultValue={store?.whatsapp ?? ""} className={inputCls} placeholder="5511999999999" />
          </div>
        </div>

        <div>
          <label className={labelCls}>E-mail</label>
          <input type="email" name="email" defaultValue={store?.email ?? ""} className={inputCls} placeholder="unidade@turatti.com.br" />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked={store?.active ?? true}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="active" className="text-sm text-gray-700 cursor-pointer">Loja ativa</label>
        </div>
      </div>

      {/* Horários */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Horários de Funcionamento</h2>
        <div>
          <label className={labelCls}>Horários</label>
          <textarea
            name="hours"
            defaultValue={store?.hours ?? ""}
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder={"Segunda a Sexta: 7h às 18h\nSábado: 7h às 12h\nDomingo: Fechado"}
          />
          <p className="text-[11px] text-gray-400 mt-1">Use uma linha por período de funcionamento.</p>
        </div>
      </div>

      {/* Endereço */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Endereço</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className={labelCls}>Cidade *</label>
            <input name="city" required defaultValue={store?.city ?? ""} className={inputCls} placeholder="São Paulo" />
          </div>
          <div>
            <label className={labelCls}>UF *</label>
            <select name="state" required defaultValue={store?.state ?? "SP"} className={inputCls}>
              {UF.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Endereço completo</label>
          <input name="address" defaultValue={store?.address ?? ""} className={inputCls} placeholder="Rua..., nº — Bairro" />
        </div>

        <div>
          <label className={labelCls}>Link do Google Maps</label>
          <input name="maps_url" defaultValue={store?.maps_url ?? ""} className={inputCls} placeholder="https://maps.google.com/..." />
        </div>
      </div>

      {/* Imagem */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Imagem Principal</h2>
        <ImageUpload
          bucket="banners"
          folder="lojas"
          defaultValue={store?.image_url}
          onChange={setImageUrl}
          hint="JPG, PNG ou WebP — recomendado 800×600px"
        />
      </div>

      {/* Descrição */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Descrição</h2>
        <div>
          <label className={labelCls}>Descrição da loja</label>
          <textarea
            name="description"
            defaultValue={store?.description ?? ""}
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="Descreva brevemente esta unidade, diferenciais, produtos disponíveis..."
          />
        </div>
      </div>

      {/* Configurações */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Configurações</h2>
        <div className="w-32">
          <label className={labelCls}>Ordem de exibição</label>
          <input type="number" name="sort_order" defaultValue={store?.sort_order ?? 0} className={inputCls} min={0} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <a href="/admin/lojas" className="text-sm text-gray-500 hover:text-gray-700">Cancelar</a>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 rounded-md"
        >
          {isPending ? "Salvando..." : store ? "Salvar alterações" : "Cadastrar loja"}
        </button>
      </div>
    </form>
  );
}
