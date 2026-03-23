"use client";

import { useState, useEffect } from "react";
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

interface ProductSectionDisplayProps {
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
    const tick = () => {
      const diff = end - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);
  return remaining;
}

function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return { d, h, m, s };
}

export function ProductSectionDisplay({ title, products, whatsapp, hasTimer, timerEndsAt }: ProductSectionDisplayProps) {
  const remaining = useCountdown(hasTimer ? timerEndsAt : null);
  if (products.length === 0) return null;

  const showTimer = hasTimer && remaining !== null && remaining > 0;
  const { d, h, m, s } = showTimer ? formatTime(remaining!) : { d: 0, h: 0, m: 0, s: 0 };

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>

          {showTimer && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 font-medium mr-1">Termina em:</span>
              {[
                { value: d, label: "d" },
                { value: h, label: "h" },
                { value: m, label: "m" },
                { value: s, label: "s" },
              ].map(({ value, label }, i) => (
                <span key={label} className="flex items-center gap-1">
                  <span className="inline-flex flex-col items-center justify-center w-9 h-9 bg-gray-900 text-white text-sm font-black rounded-md tabular-nums">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-400">{label}</span>
                  {i < 3 && <span className="text-gray-400 font-bold">:</span>}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
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
          ))}
        </div>
      </div>
    </section>
  );
}
