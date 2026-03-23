"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { ProductCard } from "@/components/public/product-card";

interface Product {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  brand: string | null;
  imageUrl?: string;
  imageAlt?: string | null;
  price?: number | null;
  price_promo?: number | null;
}

interface CarouselSectionProps {
  title: string;
  products: Product[];
  whatsapp: string;
  hasTimer: boolean;
  timerEndsAt: string | null;
}

function useCountdown(endsAt: string | null) {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    if (!endsAt) return;
    const end = new Date(endsAt).getTime();
    const tick = () => { const diff = end - Date.now(); setRemaining(diff > 0 ? diff : 0); };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);
  return remaining;
}

function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  return {
    d: Math.floor(totalSec / 86400),
    h: Math.floor((totalSec % 86400) / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

const GAP = 16;          // gap-4 em px
const AUTOPLAY_MS = 3500; // intervalo do auto-play

export function CarouselSection({ title, products, whatsapp, hasTimer, timerEndsAt }: CarouselSectionProps) {
  const [index, setIndex] = useState(0);         // índice do card mais à esquerda visível
  const [cardWidth, setCardWidth] = useState(0); // largura real de cada card
  const [cols, setCols] = useState(4);           // colunas visíveis
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const remaining = useCountdown(hasTimer ? timerEndsAt : null);

  // Mede a largura do container e recalcula card width
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    const c = w < 640 ? 2 : 4;
    setCols(c);
    setCardWidth((w - (c - 1) * GAP) / c);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  if (products.length === 0) return null;

  const maxIndex = Math.max(0, products.length - cols);

  const next = useCallback(() => {
    setIndex((prev) => prev >= maxIndex ? 0 : prev + 1);
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((prev) => prev <= 0 ? maxIndex : prev - 1);
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (paused || products.length <= cols) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused, products.length, cols]);

  // Touch/swipe
  function handleTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  }

  const showTimer = hasTimer && remaining !== null && remaining > 0;
  const { d, h, m, s } = showTimer ? formatTime(remaining!) : { d: 0, h: 0, m: 0, s: 0 };

  return (
    <section
      className="py-12 lg:py-16 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>

          <div className="flex items-center gap-4">
            {showTimer && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500 font-medium mr-1">Termina em:</span>
                {[{ value: d, label: "d" }, { value: h, label: "h" }, { value: m, label: "m" }, { value: s, label: "s" }].map(({ value, label }, i) => (
                  <span key={label} className="flex items-center gap-1">
                    <span className="inline-flex items-center justify-center w-9 h-9 bg-gray-900 text-white text-sm font-black rounded-md tabular-nums">
                      {String(value).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-gray-400">{label}</span>
                    {i < 3 && <span className="text-gray-400 font-bold">:</span>}
                  </span>
                ))}
              </div>
            )}

            {products.length > cols && (
              <div className="flex items-center gap-1">
                <button onClick={prev} className="p-3 border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Anterior">
                  <CaretLeft size={16} weight="bold" />
                </button>
                <button onClick={next} className="p-3 border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Próximo">
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            )}
          </div>
        </div>

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
            {products.map((product) => (
              <div
                key={product.id}
                style={{ width: cardWidth > 0 ? cardWidth : undefined, flexShrink: 0 }}
                className={`flex flex-col ${cardWidth === 0 ? "w-1/2 sm:w-1/4" : ""}`}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  summary={product.summary}
                  brand={product.brand}
                  imageUrl={product.imageUrl}
                  imageAlt={product.imageAlt}
                  whatsapp={whatsapp}
                  price={product.price}
                  price_promo={product.price_promo}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        {products.length > cols && (
          <div className="flex justify-center gap-1 mt-6">
            {products.map((_, i) => {
              if (i > maxIndex) return null;
              return (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="flex items-center justify-center w-8 h-8"
                  aria-label={`Card ${i + 1}`}
                >
                  <span className={`rounded-full transition-all ${i === index ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-300"}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
