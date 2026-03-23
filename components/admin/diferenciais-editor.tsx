"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Plus, Trash,
  ShieldCheck, Certificate, Headset, Truck, HandshakeIcon, ClockCounterClockwise,
  Star, Package, Wrench, Users, Phone, Globe, Lightning, CheckCircle,
} from "@phosphor-icons/react";
import { saveSetting } from "@/lib/actions/settings";
import type { ComponentType } from "react";

export type DiferenciaisSize = "compact" | "medium" | "large";

export interface DiferencialItem {
  icon: string;
  title: string;
  desc: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, ComponentType<any>> = {
  ShieldCheck, Certificate, Headset, Truck, HandshakeIcon, ClockCounterClockwise,
  Star, Package, Wrench, Users, Phone, Globe, Lightning, CheckCircle,
};

const ICON_OPTIONS = [
  { value: "ShieldCheck",           label: "Escudo — Qualidade" },
  { value: "Certificate",           label: "Certificado — Premiação" },
  { value: "Headset",               label: "Headset — Atendimento" },
  { value: "Truck",                 label: "Caminhão — Entrega" },
  { value: "HandshakeIcon",         label: "Aperto de mão — Parceria" },
  { value: "ClockCounterClockwise", label: "Relógio — Experiência" },
  { value: "Star",                  label: "Estrela — Excelência" },
  { value: "Package",               label: "Caixa — Produtos" },
  { value: "Wrench",                label: "Chave — Técnico" },
  { value: "Users",                 label: "Pessoas — Equipe" },
  { value: "Phone",                 label: "Telefone — Contato" },
  { value: "Globe",                 label: "Globo — Nacional" },
  { value: "Lightning",             label: "Raio — Rapidez" },
  { value: "CheckCircle",           label: "Círculo — Aprovado" },
];

const DEFAULT_ITEMS: DiferencialItem[] = [
  { icon: "ShieldCheck",           title: "Qualidade Garantida",      desc: "Produtos selecionados com rigorosos critérios de qualidade." },
  { icon: "Certificate",           title: "Marcas Reconhecidas",      desc: "Trabalhamos com as melhores marcas do mercado." },
  { icon: "Headset",               title: "Atendimento Especializado", desc: "Consultores prontos para indicar a melhor solução." },
  { icon: "Truck",                 title: "Entrega em Todo o Brasil",  desc: "Logística eficiente para todo o território nacional." },
  { icon: "HandshakeIcon",         title: "Foco no Cliente",          desc: "Relacionamento de longo prazo baseado em confiança." },
  { icon: "ClockCounterClockwise", title: "Anos de Experiência",      desc: "Tradição e expertise acumulada ao longo dos anos." },
];

const SIZE_OPTIONS: { value: DiferenciaisSize; label: string; desc: string }[] = [
  { value: "compact", label: "Compacto", desc: "Ícones pequenos, 6 colunas" },
  { value: "medium",  label: "Médio",    desc: "Ícones médios, 4 colunas" },
  { value: "large",   label: "Grande",   desc: "Ícones grandes, 3 colunas" },
];

const SIZE_PREVIEW = {
  compact: { box: "w-10 h-10", iconSize: 20, title: "text-xs",  desc: "text-[11px]", cols: 6 },
  medium:  { box: "w-14 h-14", iconSize: 28, title: "text-sm",  desc: "text-xs",     cols: 4 },
  large:   { box: "w-[72px] h-[72px]", iconSize: 36, title: "text-base", desc: "text-sm", cols: 3 },
};

const CAROUSEL_COLS_OPTIONS: { value: 1 | 2; label: string; desc: string }[] = [
  { value: 1, label: "1 card", desc: "Um por vez" },
  { value: 2, label: "2 cards", desc: "Dois por vez" },
];

interface Props { initial: DiferencialItem[] | null; initialSize?: DiferenciaisSize; initialCarouselCols?: 1 | 2 }

function DiferencialPreviewCard({ item, size }: { item: DiferencialItem; size: DiferenciaisSize }) {
  const IconComponent = ICON_MAP[item.icon] ?? Star;
  const cfg = SIZE_PREVIEW[size];
  return (
    <div className="flex flex-col items-center text-center gap-2 p-3">
      <div className={`${cfg.box} flex items-center justify-center bg-primary/10 rounded-lg shrink-0`}>
        <IconComponent size={cfg.iconSize} weight="duotone" className="text-primary" />
      </div>
      <div>
        <p className={`${cfg.title} font-semibold text-gray-900 leading-tight`}>
          {item.title || <span className="text-gray-300 italic">sem título</span>}
        </p>
        <p className={`${cfg.desc} text-gray-400 leading-relaxed mt-0.5`}>
          {item.desc || <span className="italic">sem descrição</span>}
        </p>
      </div>
    </div>
  );
}

export function DiferenciaisEditor({ initial, initialSize = "compact", initialCarouselCols = 1 }: Props) {
  const [items, setItems] = useState<DiferencialItem[]>(initial ?? DEFAULT_ITEMS);
  const [size, setSize] = useState<DiferenciaisSize>(initialSize);
  const [carouselCols, setCarouselCols] = useState<1 | 2>(initialCarouselCols);
  const [isPending, startTransition] = useTransition();

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md";

  function update(i: number, field: keyof DiferencialItem, val: string) {
    setItems((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }

  function add() {
    setItems((prev) => [...prev, { icon: "Star", title: "", desc: "" }]);
  }

  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSave() {
    startTransition(async () => {
      const [r1, r2, r3] = await Promise.all([
        saveSetting("diferenciais", items),
        saveSetting("diferenciais_size", size),
        saveSetting("diferenciais_carousel_cols", String(carouselCols)),
      ]);
      if (r1?.error || r2?.error || r3?.error) { toast.error("Erro ao salvar."); return; }
      toast.success("Diferenciais salvos com sucesso!");
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Diferenciais</h2>
            <p className="text-xs text-gray-400 mt-0.5">Ícones exibidos na faixa abaixo do hero</p>
          </div>
          <div className="flex items-center gap-2">
            {items.length < 8 && (
              <button
                type="button"
                onClick={add}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
              >
                <Plus size={12} weight="bold" /> Adicionar
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90 disabled:opacity-60 transition-colors"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>

        {/* Seletor de tamanho */}
        <div>
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Tamanho dos blocos</p>
          <div className="flex gap-2">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSize(opt.value)}
                className={`flex-1 px-3 py-2 rounded-lg border text-left transition-all ${
                  size === opt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <p className="text-xs font-semibold">{opt.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Seletor de cards por vez (mobile) */}
        <div>
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Cards por vez no carrossel mobile</p>
          <div className="flex gap-2">
            {CAROUSEL_COLS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCarouselCols(opt.value)}
                className={`flex-1 px-3 py-2 rounded-lg border text-left transition-all ${
                  carouselCols === opt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <p className="text-xs font-semibold">{opt.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Linhas de edição com mini preview inline */}
      <div className="divide-y divide-gray-50">
        {items.map((item, i) => {
          const IconComponent = ICON_MAP[item.icon] ?? Star;
          return (
            <div key={i} className="flex items-stretch gap-0">
              {/* Mini preview lateral */}
              <div className="flex flex-col items-center justify-center gap-1.5 w-20 shrink-0 bg-gray-50 border-r border-gray-100 px-2 py-3">
                <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg">
                  <IconComponent size={16} weight="duotone" className="text-primary" />
                </div>
                <p className="text-[9px] font-semibold text-gray-600 text-center leading-tight line-clamp-2">
                  {item.title || <span className="text-gray-300 italic">título</span>}
                </p>
              </div>

              {/* Campos de edição */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <span className="text-xs text-gray-300 font-bold shrink-0 w-4">{i + 1}</span>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Ícone</label>
                    <select
                      value={item.icon}
                      onChange={(e) => update(i, "icon", e.target.value)}
                      className={inputCls}
                    >
                      {ICON_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Título</label>
                    <input
                      value={item.title}
                      onChange={(e) => update(i, "title", e.target.value)}
                      className={inputCls}
                      placeholder="Ex: Qualidade Garantida"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Descrição</label>
                    <input
                      value={item.desc}
                      onChange={(e) => update(i, "desc", e.target.value)}
                      className={inputCls}
                      placeholder="Texto breve..."
                    />
                  </div>
                </div>
                {items.length > 3 && (
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="p-1.5 text-gray-300 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview completo da seção */}
      <div className="border-t border-gray-100">
        <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            Pré-visualização — como aparece no site
          </p>
        </div>
        <div className="bg-gray-50 border-y border-gray-100 px-4 py-6">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${Math.min(items.length, SIZE_PREVIEW[size].cols)}, minmax(0, 1fr))` }}
          >
            {items.map((item, i) => (
              <DiferencialPreviewCard key={i} item={item} size={size} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
