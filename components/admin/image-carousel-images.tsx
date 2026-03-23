"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { Trash, UploadSimple, Spinner, Warning } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import { addImageCarouselItem, removeImageCarouselItem } from "@/lib/actions/image-carousels";

const MIN_IMAGES = 4;
const MAX_IMAGES = 20;

interface CarouselImage {
  id: string;
  url: string;
  alt: string | null;
  sort_order: number;
}

interface ImageCarouselImagesProps {
  carouselId: string;
  images: CarouselImage[];
}

export function ImageCarouselImages({ carouselId, images: initial }: ImageCarouselImagesProps) {
  const [images, setImages] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const canAddMore = images.length < MAX_IMAGES;
  const belowMin = images.length < MIN_IMAGES;

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
        const fileName = `carousel-images/${carouselId}/${Date.now()}-${i}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file, { upsert: true });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("products").getPublicUrl(fileName);

        await new Promise<void>((resolve) => {
          startTransition(async () => {
            await addImageCarouselItem(carouselId, data.publicUrl, "");
            setImages((prev) => [
              ...prev,
              { id: crypto.randomUUID(), url: data.publicUrl, alt: null, sort_order: prev.length + i },
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
      await removeImageCarouselItem(id, carouselId);
      setImages((prev) => prev.filter((img) => img.id !== id));
    });
  }

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-lg">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Imagens do carrossel</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {images.length}/{MAX_IMAGES} imagens · Mínimo {MIN_IMAGES}
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

      {/* Aviso de mínimo */}
      {belowMin && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md">
          <Warning size={14} className="text-amber-500 shrink-0" />
          <p className="text-xs text-amber-700">
            Adicione pelo menos {MIN_IMAGES} imagens para exibir este carrossel na home.
            {images.length > 0 && ` (faltam ${MIN_IMAGES - images.length})`}
          </p>
        </div>
      )}

      {/* Grid de imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {images.map((img, idx) => (
            <div key={img.id} className="relative group border border-gray-100 aspect-video overflow-hidden rounded-md">
              <Image src={img.url} alt={img.alt ?? `Imagem ${idx + 1}`} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  disabled={isPending}
                  title="Excluir"
                  className="p-2 bg-white/90 text-red-500 hover:text-red-600 rounded-md"
                >
                  <Trash size={16} />
                </button>
              </div>
              <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/50 text-white text-[10px] rounded-sm">
                {idx + 1}
              </span>
            </div>
          ))}

          {canAddMore && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading || isPending}
              className="aspect-video flex flex-col items-center justify-center gap-1 border border-dashed border-gray-200 bg-gray-50 hover:border-primary hover:bg-primary/5 transition-colors text-gray-400 hover:text-primary rounded-md disabled:opacity-50"
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
          className="w-full flex flex-col items-center justify-center gap-2 py-12 border border-dashed border-gray-200 bg-gray-50 hover:border-primary hover:bg-primary/5 transition-colors text-gray-400 hover:text-primary rounded-lg mb-4"
        >
          <UploadSimple size={28} />
          <span className="text-xs font-medium">Clique para adicionar imagens</span>
          <span className="text-[11px] text-gray-400">Mínimo {MIN_IMAGES} imagens · JPG, PNG ou WebP · máx. 5 MB cada</span>
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
