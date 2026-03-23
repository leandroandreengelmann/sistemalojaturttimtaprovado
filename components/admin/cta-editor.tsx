"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveSetting } from "@/lib/actions/settings";

interface CtaData {
  badge: string;
  titulo: string;
  subtitulo: string;
}

const DEFAULTS: CtaData = {
  badge:     "Pronto para comprar?",
  titulo:    "Fale com um especialista agora mesmo",
  subtitulo: "Nossa equipe está pronta para apresentar o produto certo para você. Atendimento rápido, consultivo e sem compromisso.",
};

interface Props {
  initial: Partial<CtaData> | null;
}

export function CtaEditor({ initial }: Props) {
  const [data, setData] = useState<CtaData>({ ...DEFAULTS, ...initial });
  const [isPending, startTransition] = useTransition();

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  function set(field: keyof CtaData, val: string) {
    setData((prev) => ({ ...prev, [field]: val }));
  }

  function handleSave() {
    startTransition(async () => {
      const results = await Promise.all([
        saveSetting("cta_badge",     data.badge),
        saveSetting("cta_titulo",    data.titulo),
        saveSetting("cta_subtitulo", data.subtitulo),
      ]);
      const failed = results.find((r) => r?.error);
      if (failed?.error) { toast.error(failed.error); return; }
      toast.success("CTA salvo com sucesso!");
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-bold text-gray-900">CTA Comercial</h2>
          <p className="text-xs text-gray-400 mt-0.5">Seção escura de call-to-action no final da home</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90 disabled:opacity-60 transition-colors"
        >
          {isPending ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className={labelCls}>Badge (texto pequeno acima do título)</label>
          <input value={data.badge} onChange={(e) => set("badge", e.target.value)} className={inputCls} placeholder="Ex: Pronto para comprar?" />
        </div>
        <div>
          <label className={labelCls}>Título</label>
          <input value={data.titulo} onChange={(e) => set("titulo", e.target.value)} className={inputCls} placeholder="Ex: Fale com um especialista agora mesmo" />
        </div>
        <div>
          <label className={labelCls}>Subtítulo / Descrição</label>
          <textarea
            value={data.subtitulo}
            onChange={(e) => set("subtitulo", e.target.value)}
            rows={2}
            className={inputCls}
            placeholder="Texto abaixo do título..."
          />
        </div>
        <p className="text-xs text-gray-400">
          O número de WhatsApp é configurado em <a href="/admin/configuracoes" className="text-primary hover:underline">Configurações</a>.
        </p>
      </div>
    </div>
  );
}
