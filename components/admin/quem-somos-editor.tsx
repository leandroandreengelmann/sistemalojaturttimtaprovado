"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { saveSetting } from "@/lib/actions/settings";
import { createClient } from "@/lib/supabase/client";
import { UploadSimple, Spinner, X, CheckCircle } from "@phosphor-icons/react";

interface QuemSomosData {
  badge: string;
  titulo: string;
  texto: string;
  bullets: string;
  anos: string;
  imageUrl: string;
}

const DEFAULTS: QuemSomosData = {
  badge:    "Nossa história",
  titulo:   "Tradição e expertise que fazem a diferença",
  texto:    "A Turatti é referência no mercado há décadas, oferecendo produtos de alta qualidade com atendimento consultivo. Nossa equipe de especialistas está sempre pronta para indicar a solução certa para o seu negócio.",
  bullets:  "Décadas de experiência no mercado\nEquipe técnica especializada\nAtendimento consultivo e personalizado\nParceria com as melhores marcas",
  anos:     "20",
  imageUrl: "",
};

interface Props {
  initial: Partial<QuemSomosData> | null;
}

function QuemSomosPreview({ data }: { data: QuemSomosData }) {
  const bullets = data.bullets.split("\n").map((b) => b.trim()).filter(Boolean);
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {/* Imagem */}
        <div className="relative">
          <div className="aspect-[4/3] bg-primary/5 border border-primary/10 relative overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            {data.imageUrl ? (
              <Image src={data.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-4xl font-black text-primary/10 tracking-tighter">TURATTI</p>
              </div>
            )}
          </div>
          <div className="absolute -bottom-4 -right-2 bg-white border border-gray-100 shadow-md p-3 w-32 rounded-lg">
            <p className="text-2xl font-black text-primary leading-none">+{data.anos || "0"}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">anos de mercado</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="pt-4 sm:pt-0">
          <span className="block text-[10px] font-semibold uppercase tracking-widest text-primary mb-2">
            {data.badge || "Badge"}
          </span>
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3">
            {data.titulo || <span className="text-gray-300 italic">sem título</span>}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            {data.texto || <span className="italic">sem parágrafo</span>}
          </p>
          <ul className="space-y-1.5">
            {bullets.length > 0 ? bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle size={13} weight="fill" className="text-primary shrink-0" />
                <span className="text-xs text-gray-700">{b}</span>
              </li>
            )) : (
              <li className="text-xs text-gray-300 italic">nenhum bullet adicionado</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function QuemSomosEditor({ initial }: Props) {
  const [data, setData] = useState<QuemSomosData>({ ...DEFAULTS, ...initial });
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  function set(field: keyof QuemSomosData, val: string) {
    setData((prev) => ({ ...prev, [field]: val }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const fileName = `quem-somos/imagem.${ext}`;
    const { error } = await supabase.storage.from("products").upload(fileName, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from("products").getPublicUrl(fileName);
      set("imageUrl", urlData.publicUrl);
    }
    setUploading(false);
    e.target.value = "";
  }

  function handleSave() {
    startTransition(async () => {
      const bullets = data.bullets.split("\n").map((b) => b.trim()).filter(Boolean);
      const results = await Promise.all([
        saveSetting("quem_somos_badge",   data.badge),
        saveSetting("quem_somos_titulo",  data.titulo),
        saveSetting("quem_somos_texto",   data.texto),
        saveSetting("quem_somos_bullets", bullets),
        saveSetting("quem_somos_anos",    data.anos),
        saveSetting("quem_somos_imagem",  data.imageUrl),
      ]);
      const failed = results.find((r) => r?.error);
      if (failed?.error) { toast.error(failed.error); return; }
      toast.success("Quem Somos salvo com sucesso!");
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Quem Somos</h2>
          <p className="text-xs text-gray-400 mt-0.5">Seção institucional da home</p>
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

      {/* Campos */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Badge (texto acima do título)</label>
            <input value={data.badge} onChange={(e) => set("badge", e.target.value)} className={inputCls} placeholder="Ex: Nossa história" />
          </div>
          <div>
            <label className={labelCls}>Anos de mercado</label>
            <input value={data.anos} onChange={(e) => set("anos", e.target.value)} className={inputCls} placeholder="Ex: 20" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Título</label>
          <input value={data.titulo} onChange={(e) => set("titulo", e.target.value)} className={inputCls} placeholder="Ex: Tradição e expertise que fazem a diferença" />
        </div>

        <div>
          <label className={labelCls}>Parágrafo</label>
          <textarea value={data.texto} onChange={(e) => set("texto", e.target.value)} rows={3} className={inputCls} placeholder="Texto descritivo sobre a empresa..." />
        </div>

        <div>
          <label className={labelCls}>Lista de pontos (um por linha)</label>
          <textarea value={data.bullets} onChange={(e) => set("bullets", e.target.value)} rows={4} className={inputCls} placeholder={"Décadas de experiência no mercado\nEquipe técnica especializada\n..."} />
        </div>

        {/* Upload de imagem */}
        <div>
          <label className={labelCls}>Imagem lateral</label>
          {data.imageUrl ? (
            <div className="relative aspect-video w-full rounded-md overflow-hidden border border-gray-200 group">
              <Image src={data.imageUrl} alt="Imagem lateral" fill className="object-cover" unoptimized />
              <button
                type="button"
                onClick={() => set("imageUrl", "")}
                className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-red-600 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={13} weight="bold" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 hover:border-primary cursor-pointer rounded-md transition-colors">
              {uploading ? (
                <Spinner size={22} className="animate-spin text-primary" />
              ) : (
                <>
                  <UploadSimple size={22} className="text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Clique para enviar a imagem</span>
                  <span className="text-[11px] text-gray-300 mt-0.5">Recomendado: 800×600px (proporção 4:3)</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="border-t border-gray-100">
        <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            Pré-visualização — como aparece no site
          </p>
        </div>
        <div className="p-5">
          <QuemSomosPreview data={data} />
        </div>
      </div>
    </div>
  );
}
