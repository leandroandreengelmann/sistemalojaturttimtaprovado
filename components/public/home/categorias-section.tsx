"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
}

interface CategoriasSectionProps {
  categories: Category[];
}

const GAP = 16;
const AUTOPLAY_MS = 3500;

export function CategoriasSection({ categories }: CategoriasSectionProps) {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cols, setCols] = useState(5);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    const c = w < 480 ? 2 : w < 768 ? 3 : 5;
    setCols(c);
    setCardWidth((w - (c - 1) * GAP) / c);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  if (categories.length === 0) return null;

  const maxIndex = Math.max(0, categories.length - cols);

  const next = useCallback(() => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || categories.length <= cols) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused, categories.length, cols]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  }

  return (
    <section
      className="py-16 lg:py-20 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Navegue por segmento
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Nossas Categorias
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/loja"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Ver todos
              <ArrowRight size={14} weight="bold" />
            </Link>
            {categories.length > cols && (
              <div className="flex items-center gap-1">
                <button
                  onClick={prev}
                  className="p-3 border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Anterior"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
                <button
                  onClick={next}
                  className="p-3 border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Próximo"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Track */}
        <div
          ref={containerRef}
          className="overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-stretch"
            style={{
              gap: GAP,
              transform: cardWidth > 0 ? `translateX(-${index * (cardWidth + GAP)}px)` : "none",
              transition: cardWidth > 0 ? "transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                style={{ width: cardWidth > 0 ? cardWidth : undefined, flexShrink: 0 }}
                className={`group relative overflow-hidden bg-gray-50 border border-gray-100 aspect-[4/3] flex flex-col justify-end p-4 hover:border-primary transition-colors rounded-lg ${cardWidth === 0 ? "w-1/2 sm:w-1/3 lg:w-1/5" : ""}`}
              >
                {cat.image_url && (
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-white leading-tight">{cat.name}</p>
                  <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white/80">Explorar</span>
                    <ArrowRight size={10} className="text-white/80" weight="bold" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>

        {/* Dots por página */}
        {categories.length > cols && (
          <div className="flex justify-center gap-1 mt-6">
            {Array.from({ length: Math.ceil(categories.length / cols) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(Math.min(i * cols, maxIndex))}
                className="flex items-center justify-center w-8 h-8"
                aria-label={`Página ${i + 1}`}
              >
                <span className={`rounded-full transition-all ${
                  Math.floor(index / cols) === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-300"
                }`} />
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 sm:hidden">
          <Link
            href="/loja"
            className="flex items-center justify-center gap-1.5 w-full py-3 border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors rounded-md"
          >
            Ver todas as categorias
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
