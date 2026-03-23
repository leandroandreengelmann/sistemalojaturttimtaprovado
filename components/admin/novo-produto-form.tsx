"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadSimple, X, Spinner, Image as ImageIcon } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import { addProductImage } from "@/lib/actions/products";
import { ProductForm } from "./product-form";

const MAX_IMAGES = 10;

interface QueuedImage {
  id: string;
  file: File;
  preview: string;
}

interface Category { id: string; name: string; parent_id: string | null }

interface NovoProdutoFormProps {
  categories: Category[];
}

export function NovoProdutoForm({ categories }: NovoProdutoFormProps) {
  const router = useRouter();
  const [queue, setQueue] = useState<QueuedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const remaining = MAX_IMAGES - queue.length;
    const accepted = Array.from(files).slice(0, remaining);
    const newItems: QueuedImage[] = accepted.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setQueue((prev) => [...prev, ...newItems]);
  }

  function removeFromQueue(id: string) {
    setQueue((prev) => {
      const item = prev.find((q) => q.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((q) => q.id !== id);
    });
  }

  async function handleAfterCreate(productId: string) {
    if (queue.length === 0) {
      router.push(`/admin/produtos/${productId}`);
      return;
    }

    setUploading(true);
    const supabase = createClient();

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      setUploadProgress(i + 1);
      try {
        const ext = item.file.name.split(".").pop();
        const fileName = `products/${productId}/${Date.now()}-${i}.${ext}`;
        const { error } = await supabase.storage
          .from("products")
          .upload(fileName, item.file, { upsert: true });
        if (error) continue;
        const { data } = supabase.storage.from("products").getPublicUrl(fileName);
        await new Promise<void>((resolve) => {
          startTransition(async () => {
            await addProductImage(productId, data.publicUrl, i === 0);
            resolve();
          });
        });
      } catch {
        // continua com próxima imagem
      }
    }

    router.push(`/admin/produtos/${productId}`);
  }

  const canAddMore = queue.length < MAX_IMAGES;

  return (
    <div className="space-y-6">
      {/* Formulário */}
      <ProductForm
        categories={categories}
        onAfterCreate={handleAfterCreate}
        formId="novo-produto-form"
        hideSubmit
      />

      {/* Imagens */}
      <div className="bg-white border border-gray-200 p-5 rounded-lg">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Imagens do produto</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {queue.length}/{MAX_IMAGES} imagens selecionadas
            </p>
          </div>
          {canAddMore && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
            >
              <UploadSimple size={13} />
              Adicionar
            </button>
          )}
        </div>

        {queue.length === 0 ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-2 py-10 border border-dashed border-gray-200 bg-gray-50 hover:border-primary hover:bg-primary/5 transition-colors text-gray-400 hover:text-primary rounded-lg"
          >
            <ImageIcon size={28} />
            <span className="text-xs font-medium">Clique para selecionar imagens</span>
            <span className="text-[11px] text-gray-400">Até {MAX_IMAGES} imagens — JPG, PNG ou WebP</span>
          </button>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {queue.map((item, i) => (
              <div key={item.id} className="relative group aspect-square border border-gray-100 overflow-hidden rounded-md">
                <Image src={item.preview} alt="" fill className="object-cover" unoptimized />
                {i === 0 && (
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded-sm">
                    Principal
                  </span>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeFromQueue(item.id)}
                    className="p-1.5 bg-white/90 text-red-500 hover:text-red-600 rounded-md"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            {canAddMore && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="aspect-square flex flex-col items-center justify-center gap-1 border border-dashed border-gray-200 bg-gray-50 hover:border-primary hover:bg-primary/5 transition-colors text-gray-400 hover:text-primary rounded-md"
              >
                <UploadSimple size={18} />
                <span className="text-[10px]">Adicionar</span>
              </button>
            )}
          </div>
        )}

        {uploading && (
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <Spinner size={14} className="animate-spin" />
            Enviando imagem {uploadProgress} de {queue.length}...
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Botões */}
      <div className="flex items-center justify-between pt-2">
        <a href="/admin/produtos" className="text-sm text-gray-500 hover:text-gray-700">
          Cancelar
        </a>
        <button
          type="submit"
          form="novo-produto-form"
          disabled={uploading}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 rounded-md"
        >
          {uploading ? "Enviando imagens..." : "Criar produto"}
        </button>
      </div>
    </div>
  );
}
