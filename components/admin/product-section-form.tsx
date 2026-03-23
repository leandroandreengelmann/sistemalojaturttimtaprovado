"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createProductSection, updateProductSection, deleteProductSection } from "@/lib/actions/product-sections";

interface ProductSection {
  id: string;
  title: string;
  has_timer: boolean;
  timer_ends_at: string | null;
  rows: number;
  active: boolean;
}

interface ProductSectionFormProps {
  section?: ProductSection;
}

export function ProductSectionForm({ section }: ProductSectionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [hasTimer, setHasTimer] = useState(section?.has_timer ?? false);

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      if (section) {
        await updateProductSection(section.id, fd);
        toast.success("Seção atualizada com sucesso!");
      } else {
        await createProductSection(fd); // redirects on success
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Configurações */}
      <div className="bg-white border border-gray-200 p-5 space-y-4 rounded-lg">
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
          Configurações da seção
        </h2>

        <div>
          <label className={labelCls}>Título *</label>
          <input
            name="title"
            required
            defaultValue={section?.title ?? ""}
            className={inputCls}
            placeholder="Ex: Produtos em Promoção"
          />
          <p className="text-[11px] text-gray-400 mt-1">Aparece como título da seção na home</p>
        </div>

        <div>
          <label className={labelCls}>Fileiras de produtos</label>
          <div className="flex items-center gap-3">
            <input
              name="rows"
              type="number"
              min={1}
              max={10}
              defaultValue={section?.rows ?? 1}
              className="w-24 px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md"
            />
            <p className="text-xs text-gray-400">fileira(s) × 4 produtos = total exibido</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked={section?.active ?? true}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="active" className="text-sm text-gray-700 cursor-pointer">
            Seção ativa (visível na home)
          </label>
        </div>
      </div>

      {/* Cronômetro */}
      <div className="bg-white border border-gray-200 p-5 space-y-4 rounded-lg">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Cronômetro regressivo</h2>
            <p className="text-xs text-gray-400 mt-0.5">Exibe uma contagem regressiva na seção</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="has_timer"
              checked={hasTimer}
              onChange={(e) => setHasTimer(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm text-gray-700">Ativar</span>
          </label>
        </div>

        {hasTimer && (
          <div>
            <p className="text-xs text-gray-500 mb-3">
              Define em quanto tempo o cronômetro expira a partir de agora:
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Dias</label>
                <input type="number" name="timer_days" min={0} max={365} defaultValue={0} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className={labelCls}>Horas</label>
                <input type="number" name="timer_hours" min={0} max={23} defaultValue={0} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className={labelCls}>Minutos</label>
                <input type="number" name="timer_minutes" min={0} max={59} defaultValue={0} className={inputCls} placeholder="0" />
              </div>
            </div>
            {section?.timer_ends_at && (
              <p className="text-xs text-gray-400 mt-2">
                Expira em: {new Date(section.timer_ends_at).toLocaleString("pt-BR")} (salve para redefinir)
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <a href="/admin/secoes" className="text-sm text-gray-500 hover:text-gray-700">
            Cancelar
          </a>
          {section && (
            <button
              type="button"
              disabled={isPending}
              onClick={() => { if (confirm("Excluir esta seção?")) startTransition(async () => { await deleteProductSection(section.id); }); }}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Excluir
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 rounded-md"
        >
          {isPending ? "Salvando..." : section ? "Salvar alterações" : "Criar seção"}
        </button>
      </div>
    </form>
  );
}
