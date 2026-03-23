"use client";

import { useState, useRef } from "react";
import {
  ShieldCheck, Truck, Headset, Certificate, HandshakeIcon,
  ClockCounterClockwise, Star, Package, Wrench, Users,
  Phone, Globe, Lightning, CheckCircle,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, ComponentType<any>> = {
  ShieldCheck, Certificate, Headset, Truck, HandshakeIcon,
  ClockCounterClockwise, Star, Package, Wrench, Users,
  Phone, Globe, Lightning, CheckCircle,
};

type DiferenciaisSize = "compact" | "medium" | "large";

const SIZE_CONFIG = {
  compact: {
    box:      "w-10 h-10",
    iconSize: 20,
    title:    "text-xs font-semibold",
    desc:     "text-xs",
    gridCols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
    gap:      "gap-6 lg:gap-4",
    py:       "py-10",
  },
  medium: {
    box:      "w-14 h-14",
    iconSize: 28,
    title:    "text-sm font-semibold",
    desc:     "text-xs",
    gridCols: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
    gap:      "gap-8 lg:gap-6",
    py:       "py-12",
  },
  large: {
    box:      "w-[72px] h-[72px]",
    iconSize: 36,
    title:    "text-base font-semibold",
    desc:     "text-sm",
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    gap:      "gap-10 lg:gap-8",
    py:       "py-14",
  },
};

const DEFAULT_ITEMS = [
  { icon: "ShieldCheck",           title: "Qualidade Garantida",       desc: "Produtos selecionados com rigorosos critérios de qualidade." },
  { icon: "Certificate",           title: "Marcas Reconhecidas",       desc: "Trabalhamos com as melhores marcas do mercado." },
  { icon: "Headset",               title: "Atendimento Especializado", desc: "Consultores prontos para indicar a melhor solução." },
  { icon: "Truck",                 title: "Entrega em Todo o Brasil",  desc: "Logística eficiente para todo o território nacional." },
  { icon: "HandshakeIcon",         title: "Foco no Cliente",           desc: "Relacionamento de longo prazo baseado em confiança." },
  { icon: "ClockCounterClockwise", title: "Anos de Experiência",       desc: "Tradição e expertise acumulada ao longo dos anos." },
];

interface DiferencialItem { icon: string; title: string; desc: string }

interface DiferenciaisSectionProps {
  items?: DiferencialItem[] | null;
  size?: DiferenciaisSize;
  carouselCols?: 1 | 2;
}

function DiferencialCard({ item, cfg }: { item: DiferencialItem; cfg: typeof SIZE_CONFIG["compact"] }) {
  const IconComponent = ICON_MAP[item.icon] ?? Star;
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className={`${cfg.box} flex items-center justify-center bg-primary/10 rounded-xl shrink-0`}>
        <IconComponent size={cfg.iconSize} weight="duotone" className="text-primary" />
      </div>
      <div>
        <p className={`${cfg.title} text-gray-900 leading-tight mb-1`}>{item.title}</p>
        <p className={`${cfg.desc} text-gray-500 leading-relaxed`}>{item.desc}</p>
      </div>
    </div>
  );
}

export function DiferenciaisSection({ items, size = "compact", carouselCols = 1 }: DiferenciaisSectionProps) {
  const list = items && items.length > 0 ? items : DEFAULT_ITEMS;
  const cfg = SIZE_CONFIG[size];

  /* ── Carrossel mobile ─────────────────────────────────────── */
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Número de slides: agrupa os items em páginas de `carouselCols`
  const totalSlides = Math.ceil(list.length / carouselCols);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActiveIndex((i) => Math.min(i + 1, totalSlides - 1));
      else setActiveIndex((i) => Math.max(i - 1, 0));
    }
    touchStartX.current = null;
  }

  // Agrupa items em páginas
  const slides = Array.from({ length: totalSlides }, (_, i) =>
    list.slice(i * carouselCols, i * carouselCols + carouselCols)
  );

  return (
    <section className={`border-y border-gray-100 bg-gray-50 ${cfg.py}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Desktop: grid ──────────────────────────────────── */}
        <div className={`hidden sm:grid ${cfg.gridCols} ${cfg.gap}`}>
          {list.map((item) => (
            <DiferencialCard key={item.title} item={item} cfg={cfg} />
          ))}
        </div>

        {/* ── Mobile: carrossel ─────────────────────────────── */}
        <div className="sm:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slides.map((group, si) => (
                <div
                  key={si}
                  className="w-full shrink-0 grid gap-6"
                  style={{ gridTemplateColumns: `repeat(${carouselCols}, minmax(0, 1fr))` }}
                >
                  {group.map((item) => (
                    <DiferencialCard key={item.title} item={item} cfg={SIZE_CONFIG.medium} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="flex items-center justify-center w-8 h-8"
                aria-label={`Slide ${i + 1}`}
              >
                <span className={`rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-300"
                }`} />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
