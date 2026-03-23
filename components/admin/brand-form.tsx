"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBrand, updateBrand, deleteBrand } from "@/lib/actions/brands";
import { createClient } from "@/lib/supabase/client";
import { UploadSimple, Spinner, X } from "@phosphor-icons/react";

interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number | null;
  active: boolean | null;
}

interface BrandFormProps {
  brand?: Brand;
}

const inputCls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none";
const labelCls = "block text-xs font-semibold text-gray-700 mb-1.5";

export function BrandForm({ brand }: BrandFormProps) {
  const [isPending, startTransition] = useTransition();
  const [logoUrl, setLogoUrl] = useState(brand?.logo_url ?? "");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `marcas/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("products").upload(path, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from("products").getPublicUrl(path);
      setLogoUrl(urlData.publicUrl);
    }
    setUploading(false);
    e.target.value = "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("logo_url", logoUrl);
    startTransition(async () => {
      const result = brand ? await updateBrand(brand.id, fd) : await createBrand(fd);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success(brand ? "Marca atualizada!" : "Marca criada com sucesso!");
      router.push("/admin/marcas");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nome */}
      <div>
        <label className={labelCls}>Nome da marca *</label>
        <input
          name="name"
          required
          defaultValue={brand?.name ?? ""}
          className={inputCls}
          placeholder="Ex: Votorantim, Tigre, Coral..."
        />
      </div>

      {/* Logo — upload */}
      <div>
        <label className={labelCls}>Logotipo</label>
        <p className="text-xs text-gray-400 mb-2">PNG ou SVG com fundo transparente — recomendado 300×120px</p>

        {logoUrl ? (
          <div className="relative inline-flex items-center justify-center p-4 border border-gray-200 rounded-md bg-gray-50 group">
            <Image src={logoUrl} alt="Logo" width={160} height={64} className="object-contain h-16 w-auto" unoptimized />
            <button
              type="button"
              onClick={() => setLogoUrl("")}
              className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={11} weight="bold" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 hover:border-primary cursor-pointer rounded-md transition-colors">
            {uploading ? (
              <Spinner size={22} className="animate-spin text-primary" />
            ) : (
              <>
                <UploadSimple size={22} className="text-gray-400 mb-1" />
                <span className="text-xs text-gray-400">Clique para enviar o logo</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploading} />
          </label>
        )}
      </div>

      {/* Website */}
      <div>
        <label className={labelCls}>Site da marca</label>
        <input
          name="website_url"
          type="url"
          defaultValue={brand?.website_url ?? ""}
          className={inputCls}
          placeholder="https://..."
        />
      </div>

      {/* Ordem */}
      <div>
        <label className={labelCls}>Ordem de exibição</label>
        <input
          name="sort_order"
          type="number"
          min={0}
          defaultValue={brand?.sort_order ?? 0}
          className="w-28 px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
        />
      </div>

      {/* Ativo */}
      <div className="flex items-center gap-3">
        <input
          id="active"
          name="active"
          type="checkbox"
          defaultChecked={brand?.active ?? true}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="active" className="text-sm font-medium text-gray-700">
          Marca ativa (aparece na vitrine)
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {isPending ? "Salvando..." : brand ? "Salvar alterações" : "Criar marca"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/marcas")}
          className="px-5 py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-md hover:border-gray-300 transition-colors"
        >
          Cancelar
        </button>

        {brand && (
          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              if (confirm("Excluir esta marca?")) {
                startTransition(async () => {
                  const result = await deleteBrand(brand.id);
                  if (result?.error) { toast.error(result.error); return; }
                  toast.success("Marca excluída.");
                  router.push("/admin/marcas");
                });
              }
            }}
            className="ml-auto px-4 py-2.5 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            Excluir
          </button>
        )}
      </div>
    </form>
  );
}
