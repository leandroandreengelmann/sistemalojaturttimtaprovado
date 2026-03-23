"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { Trash, Star, UploadSimple, Spinner } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import { addProductImage, deleteProductImage, setProductImagePrimary } from "@/lib/actions/products";

const MAX_IMAGES = 10;

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  is_primary: boolean;
  sort_order: number;
}

interface ProductImagesProps {
  productId: string;
  images: ProductImage[];
}

export function ProductImages({ productId, images: initial }: ProductImagesProps) {
  const [images, setImages] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const canAddMore = images.length < MAX_IMAGES;

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remaining = MAX_IMAGES - images.length;
    const toUpload = Array.from(files).slice(0, remaining);

    setError("");
    setUploading(true);
    setUploadProgress({ current: 0, total: toUpload.length });

    const supabase = createClient();

    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      setUploadProgress({ current: i + 1, total: toUpload.length });
      try {
        const ext = file.name.split(".").pop();
        const fileName = `products/${productId}/${Date.now()}-${i}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file, { upsert: true });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("products").getPublicUrl(fileName);
        const isPrimary = images.length === 0 && i === 0;

        await new Promise<void>((resolve) => {
          startTransition(async () => {
            await addProductImage(productId, data.publicUrl, isPrimary);
            setImages((prev) => [
              ...prev,
              { id: crypto.randomUUID(), url: data.publicUrl, alt: null, is_primary: isPrimary, sort_order: prev.length + i },
            ]);
            resolve();
          });
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao fazer upload.");
      }
    }

    setUploading(false);
    setUploadProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteProductImage(id, productId);
      setImages((prev) => prev.filter((img) => img.id !== id));
    });
  }

  function handleSetPrimary(id: string) {
    startTransition(async () => {
      await setProductImagePrimary(id, productId);
      setImages((prev) => prev.map((img) => ({ ...img, is_primary: img.id === id })));
    });
  }

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-lg">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Imagens do produto</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {images.length}/{MAX_IMAGES} imagens · Passe o mouse para ações
          </p>
        </div>
        {canAddMore && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading || isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md disabled:opacity-50"
          >
            <UploadSimple size={13} />
            Adicionar
          </button>
        )}
      </div>

      {/* Grid de imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-4">
          {images.map((img) => (
            <div key={img.id} className="relative group border border-gray-100 aspect-square overflow-hidden rounded-md">
              <Image src={img.url} alt={img.alt ?? ""} fill className="object-cover" unoptimized />

              {img.is_primary && (
                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded-sm">
                  Principal
                </span>
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!img.is_primary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(img.id)}
                    disabled={isPending}
                    title="Definir como principal"
                    className="p-1.5 bg-white/90 text-yellow-500 hover:text-yellow-600 rounded-md"
                  >
                    <Star size={14} weight="fill" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  disabled={isPending}
                  title="Excluir"
                  className="p-1.5 bg-white/90 text-red-500 hover:text-red-600 rounded-md"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          ))}

          {canAddMore && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading || isPending}
              className="aspect-square flex flex-col items-center justify-center gap-1 border border-dashed border-gray-200 bg-gray-50 hover:border-primary hover:bg-primary/5 transition-colors text-gray-400 hover:text-primary rounded-md disabled:opacity-50"
            >
              <UploadSimple size={18} />
              <span className="text-[10px]">Adicionar</span>
            </button>
          )}
        </div>
      )}

      {/* Dropzone vazio */}
      {images.length === 0 && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full flex flex-col items-center justify-center gap-2 py-10 border border-dashed border-gray-200 bg-gray-50 hover:border-primary hover:bg-primary/5 transition-colors text-gray-400 hover:text-primary rounded-lg mb-4"
        >
          <UploadSimple size={28} />
          <span className="text-xs font-medium">Clique para adicionar imagens</span>
          <span className="text-[11px] text-gray-400">Até {MAX_IMAGES} imagens — JPG, PNG ou WebP, máx. 5 MB cada</span>
        </button>
      )}

      {/* Progresso */}
      {uploading && uploadProgress && (
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
          <Spinner size={13} className="animate-spin" />
          Enviando {uploadProgress.current} de {uploadProgress.total}...
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

      {!canAddMore && (
        <p className="text-xs text-gray-400 mt-2 text-center">Limite de {MAX_IMAGES} imagens atingido.</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handleFiles}
      />
    </div>
  );
}
