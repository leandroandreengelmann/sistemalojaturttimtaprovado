"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface CarouselItem {
  id: string;
  url: string;
  alt: string | null;
}

interface ImageCarouselSectionProps {
  items: CarouselItem[];
}

const GAP = 16;
const AUTOPLAY_MS = 3500;

export function ImageCarouselSection({ items }: ImageCarouselSectionProps) {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cols, setCols] = useState(3);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    const c = w < 640 ? 1 : w < 1024 ? 2 : 3;
    setCols(c);
    setCardWidth((w - (c - 1) * GAP) / c);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  if (items.length === 0) return null;

  const maxIndex = Math.max(0, items.length - cols);

  const next = useCallback(() => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (paused || items.length <= cols) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused, items.length, cols]);

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
      className="py-12 lg:py-16 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navegação */}
        {items.length > cols && (
          <div className="flex justify-end gap-1 mb-4">
            <button
              onClick={prev}
              className="p-2 border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
              aria-label="Anterior"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              onClick={next}
              className="p-2 border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
              aria-label="Próximo"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        )}

        {/* Track deslizante */}
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
            {items.map((item, idx) => (
              <div
                key={item.id}
                style={{ width: cardWidth > 0 ? cardWidth : undefined, flexShrink: 0 }}
                className={`flex flex-col rounded-lg overflow-hidden bg-gray-100 ${cardWidth === 0 ? "w-full sm:w-1/2 lg:w-1/3" : ""}`}
              >
                <div className="relative w-full aspect-video">
                  <Image
                    src={item.url}
                    alt={item.alt ?? `Imagem ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        {items.length > cols && (
          <div className="flex justify-center gap-1.5 mt-6">
            {items.map((_, i) => {
              if (i > maxIndex) return null;
              return (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Imagem ${i + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
