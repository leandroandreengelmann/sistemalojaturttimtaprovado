"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBanner, updateBanner } from "@/lib/actions/banners";
import { ImageUpload } from "./image-upload";
import type { Tables } from "@/lib/types/database.types";

interface BannerFormProps {
  banner?: Tables<"banners">;
}

const positions = [
  { value: "hero",          label: "Hero (principal)" },
  { value: "intermediario", label: "Intermediário" },
  { value: "categoria",     label: "Categoria" },
];

export function BannerForm({ banner }: BannerFormProps) {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(banner?.image_url ?? "");
  const [imageMobileUrl, setImageMobileUrl] = useState(banner?.image_mobile_url ?? "");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("image_url", imageUrl);
    fd.set("image_mobile_url", imageMobileUrl);
    startTransition(async () => {
      const result = banner ? await updateBanner(banner.id, fd) : await createBanner(fd);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success(banner ? "Banner atualizado com sucesso!" : "Banner criado com sucesso!");
      router.push("/admin/banners");
    });
  }

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white border border-gray-200 p-5 space-y-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Título</label>
            <input name="title" defaultValue={banner?.title ?? ""} className={inputCls} placeholder="Título do banner" />
          </div>
          <div>
            <label className={labelCls}>Posição</label>
            <select name="position" defaultValue={banner?.position ?? "hero"} className={inputCls}>
              {positions.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Subtítulo</label>
          <input name="subtitle" defaultValue={banner?.subtitle ?? ""} className={inputCls} placeholder="Subtítulo ou descrição" />
        </div>

        {/* Upload desktop */}
        <ImageUpload
          bucket="banners"
          folder="desktop"
          label="Imagem desktop *"
          hint="JPG, PNG ou WebP — tamanho ideal: 1920×640px (full background) — máx. 10 MB"
          defaultValue={banner?.image_url}
          onChange={setImageUrl}
          onClear={() => setImageUrl("")}
        />

        {/* Upload mobile */}
        <ImageUpload
          bucket="banners"
          folder="mobile"
          label="Imagem mobile (opcional)"
          hint="JPG, PNG ou WebP — recomendado 768×400px"
          defaultValue={banner?.image_mobile_url}
          onChange={setImageMobileUrl}
          onClear={() => setImageMobileUrl("")}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Texto do botão (CTA)</label>
            <input name="cta_text" defaultValue={banner?.cta_text ?? ""} className={inputCls} placeholder="Ver produtos" />
          </div>
          <div>
            <label className={labelCls}>Link do botão (CTA)</label>
            <input name="cta_url" defaultValue={banner?.cta_url ?? ""} className={inputCls} placeholder="/loja" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Ordem</label>
            <input type="number" name="sort_order" defaultValue={banner?.sort_order ?? 0} className={inputCls} min={0} />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="active" defaultChecked={banner?.active ?? true} className="w-4 h-4 accent-primary" />
              <span className="text-sm text-gray-700">Banner ativo</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <a href="/admin/banners" className="text-sm text-gray-500 hover:text-gray-700">Cancelar</a>
        <button
          type="submit"
          disabled={isPending || !imageUrl}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 rounded-md"
        >
          {isPending ? "Salvando..." : banner ? "Salvar alterações" : "Criar banner"}
        </button>
      </div>
    </form>
  );
}
