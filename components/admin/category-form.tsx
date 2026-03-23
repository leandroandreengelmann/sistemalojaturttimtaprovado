"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/lib/actions/categories";
import { createClient } from "@/lib/supabase/client";
import { UploadSimple, Spinner, X } from "@phosphor-icons/react";
import type { Tables } from "@/lib/types/database.types";

interface CategoryFormProps {
  category?: Tables<"categories">;
  categories: { id: string; name: string; parent_id: string | null }[];
}

export function CategoryForm({ category, categories }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [sortOrder, setSortOrder] = useState(String(category?.sort_order ?? 0));
  const [active, setActive] = useState(category?.active ?? true);
  const [imageUrl, setImageUrl] = useState(category?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [parentId, setParentId] = useState(category?.parent_id ?? "");
  const router = useRouter();

  function toSlug(str: string) {
    return str.toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = category ? await updateCategory(category.id, fd) : await createCategory(fd);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success(category ? "Categoria atualizada!" : "Categoria criada com sucesso!");
      router.push("/admin/categorias");
    });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `categories/${slug || name || Date.now()}/capa.${ext}`;
    const { error } = await supabase.storage.from("products").upload(path, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from("products").getPublicUrl(path);
      setImageUrl(urlData.publicUrl);
    }
    setUploading(false);
    e.target.value = "";
  }

  const roots = categories.filter((c) => !c.parent_id && c.id !== category?.id);
  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Tipo: raiz ou subcategoria */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setParentId("")}
          className={`flex-1 py-2.5 text-sm font-semibold border rounded-md transition-colors ${
            !parentId ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary"
          }`}
        >
          Categoria principal
        </button>
        <button
          type="button"
          onClick={() => setParentId(category?.parent_id ?? roots[0]?.id ?? "")}
          className={`flex-1 py-2.5 text-sm font-semibold border rounded-md transition-colors ${
            parentId ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary"
          }`}
        >
          Subcategoria
        </button>
      </div>

      <div className="bg-white border border-gray-200 p-5 space-y-4 rounded-lg">
        <div>
          <label className={labelCls}>Nome *</label>
          <input name="name" required value={name} onChange={(e) => {
            setName(e.target.value);
            if (!category) setSlug(toSlug(e.target.value));
          }} className={inputCls} placeholder="Nome da categoria" />
        </div>

        <div>
          <label className={labelCls}>Slug (URL)</label>
          <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)}
            className={inputCls} placeholder="nome-da-categoria"
          />
        </div>

        {parentId && (
          <div>
            <label className={labelCls}>Pertence à categoria *</label>
            <select
              name="parent_id"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className={inputCls}
              required
            >
              <option value="">Selecione uma categoria pai</option>
              {roots.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        )}
        {!parentId && <input type="hidden" name="parent_id" value="" />}

        <div>
          <label className={labelCls}>Descrição</label>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
            className={inputCls} placeholder="Descrição exibida na página da categoria"
          />
        </div>

        <div>
          <label className={labelCls}>Imagem da categoria</label>
          <input type="hidden" name="image_url" value={imageUrl} />

          {imageUrl ? (
            <div className="relative w-full aspect-video rounded-md overflow-hidden border border-gray-200 group">
              <Image src={imageUrl} alt="Imagem da categoria" fill className="object-cover" unoptimized />
              <button
                type="button"
                onClick={() => setImageUrl("")}
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
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div>
            <label className={labelCls}>Ordem de exibição</label>
            <input type="number" name="sort_order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} min={0} className={inputCls} />
          </div>
          <div className="pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="active" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 accent-primary" />
              <span className="text-sm text-gray-700">Categoria ativa</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <a href="/admin/categorias" className="text-sm text-gray-500 hover:text-gray-700">Cancelar</a>
        <button type="submit" disabled={isPending}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 rounded-md"
        >
          {isPending ? "Salvando..." : category ? "Salvar alterações" : "Criar categoria"}
        </button>
      </div>
    </form>
  );
}
