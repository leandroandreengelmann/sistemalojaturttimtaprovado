"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, MagnifyingGlassPlus } from "@phosphor-icons/react";

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center rounded-lg">
        <div className="w-20 h-20 bg-primary/10" />
      </div>
    );
  }

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-3">
      {/* Imagem principal */}
      <div className="relative aspect-square bg-gray-50 border border-gray-100 overflow-hidden group rounded-lg">
        <Image
          src={images[active].url}
          alt={images[active].alt ?? productName}
          fill
          className="object-contain p-4 transition-transform duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Zoom hint */}
        <button
          onClick={() => setZoom(true)}
          className="absolute top-3 right-3 p-2 bg-white border border-gray-200 text-gray-500 hover:text-primary hover:border-primary transition-colors opacity-0 group-hover:opacity-100 rounded-md"
          aria-label="Ampliar imagem"
        >
          <MagnifyingGlassPlus size={16} />
        </button>

        {/* Navegação (só com múltiplas imagens) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors rounded-md"
              aria-label="Imagem anterior"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors rounded-md"
              aria-label="Próxima imagem"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </>
        )}

        {/* Contador */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 text-white text-xs font-medium rounded-md">
            {active + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 shrink-0 border-2 overflow-hidden transition-colors rounded-md ${
                i === active ? "border-primary" : "border-gray-100 hover:border-gray-300"
              }`}
              aria-label={`Selecionar imagem ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt ?? productName}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          <div className="relative w-full max-w-3xl aspect-square" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active].url}
              alt={images[active].alt ?? productName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={() => setZoom(false)}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 text-2xl font-bold rounded-md"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
