"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadSimple, X, Spinner } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  bucket: "products" | "banners";
  /** Folder prefix inside the bucket, e.g. "banners" or "products/abc123" */
  folder?: string;
  defaultValue?: string | null;
  onChange: (url: string) => void;
  onClear?: () => void;
  label?: string;
  hint?: string;
}

export function ImageUpload({
  bucket,
  folder = "",
  defaultValue,
  onChange,
  onClear,
  label,
  hint,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `${folder ? folder + "/" : ""}${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      setPreview(data.publicUrl);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer upload.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleClear() {
    setPreview(null);
    onChange("");
    onClear?.();
  }

  return (
    <div>
      {label && (
        <p className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</p>
      )}

      <div className="relative border border-dashed border-gray-200 bg-gray-50 hover:border-primary transition-colors rounded-lg">
        {preview ? (
          <div className="relative">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="p-1.5 bg-white/90 text-gray-700 hover:text-primary border border-gray-200 text-xs shadow-sm rounded-md"
                title="Trocar imagem"
              >
                <UploadSimple size={14} />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 bg-white/90 text-gray-700 hover:text-red-500 border border-gray-200 text-xs shadow-sm"
                title="Remover"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full flex flex-col items-center justify-center gap-2 py-8 text-gray-400 hover:text-primary transition-colors"
          >
            {uploading ? (
              <Spinner size={24} className="animate-spin" />
            ) : (
              <UploadSimple size={24} />
            )}
            <span className="text-xs font-medium">
              {uploading ? "Enviando..." : "Clique para fazer upload"}
            </span>
            {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
