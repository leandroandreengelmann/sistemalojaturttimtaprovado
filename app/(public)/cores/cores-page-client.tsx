"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlass, X, Copy, Check } from "@phosphor-icons/react";
import type { Tables } from "@/lib/types/database.types";

type Color = Tables<"paint_colors">;

interface CoresPageClientProps {
  colors: Color[];
}

function ColorCard({ color }: { color: Color }) {
  const [copied, setCopied] = useState(false);

  function copyHex() {
    navigator.clipboard.writeText(color.hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  // Determine text color (white or dark) based on hex luminance
  const r = parseInt(color.hex.slice(1, 3), 16);
  const g = parseInt(color.hex.slice(3, 5), 16);
  const b = parseInt(color.hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const textLight = luminance < 0.55;

  return (
    <div className="group rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
      {/* Swatch */}
      <div
        className="relative aspect-square cursor-pointer"
        style={{ backgroundColor: color.hex }}
        onClick={copyHex}
        title="Clique para copiar o HEX"
      >
        {/* Copy button */}
        <button
          onClick={(e) => { e.stopPropagation(); copyHex(); }}
          className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full transition-all opacity-0 group-hover:opacity-100 ${
            textLight ? "bg-white/20 hover:bg-white/35 text-white" : "bg-black/10 hover:bg-black/20 text-black/70"
          }`}
          title="Copiar HEX"
        >
          {copied ? <Check size={13} weight="bold" /> : <Copy size={13} weight="bold" />}
        </button>

        {/* HEX badge on hover */}
        <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity ${
          textLight ? "bg-white/20 text-white" : "bg-black/10 text-black/70"
        }`}>
          {color.hex}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 bg-white">
        <p className="text-sm font-semibold text-gray-900 leading-tight truncate">{color.name}</p>
        {color.code && (
          <p className="text-xs text-gray-400 font-mono mt-0.5">{color.code}</p>
        )}
        {(color.family || color.brand) && (
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {color.family && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-gray-100 text-gray-600 font-medium">
                {color.family}
              </span>
            )}
            {color.brand && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-primary/8 text-primary font-medium">
                {color.brand}
              </span>
            )}
          </div>
        )}
        {color.description && (
          <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
            {color.description}
          </p>
        )}
      </div>
    </div>
  );
}

export function CoresPageClient({ colors }: CoresPageClientProps) {
  const [search, setSearch] = useState("");
  const [filterFamily, setFilterFamily] = useState("");
  const [filterCollection, setFilterCollection] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  const families = useMemo(() =>
    [...new Set(colors.map((c) => c.family).filter(Boolean) as string[])].sort(),
    [colors]
  );
  const collections = useMemo(() =>
    [...new Set(colors.map((c) => c.collection).filter(Boolean) as string[])].sort(),
    [colors]
  );
  const brands = useMemo(() =>
    [...new Set(colors.map((c) => c.brand).filter(Boolean) as string[])].sort(),
    [colors]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return colors.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q) && !c.code.toLowerCase().includes(q) && !c.hex.toLowerCase().includes(q)) return false;
      if (filterFamily && c.family !== filterFamily) return false;
      if (filterCollection && c.collection !== filterCollection) return false;
      if (filterBrand && c.brand !== filterBrand) return false;
      return true;
    });
  }, [colors, search, filterFamily, filterCollection, filterBrand]);

  const hasFilters = search || filterFamily || filterCollection || filterBrand;
  const selectCls = "px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary focus:outline-none bg-white text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-1.5">
            Paleta de Cores
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Cores de Tintas</h1>
          <p className="text-sm text-gray-500 mt-1.5">
            {colors.length} cor{colors.length !== 1 ? "es" : ""} disponível{colors.length !== 1 ? "is" : ""}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome, código ou HEX..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary focus:outline-none bg-white"
              />
            </div>

            {families.length > 0 && (
              <select value={filterFamily} onChange={(e) => setFilterFamily(e.target.value)} className={selectCls}>
                <option value="">Todas as famílias</option>
                {families.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            )}

            {collections.length > 0 && (
              <select value={filterCollection} onChange={(e) => setFilterCollection(e.target.value)} className={selectCls}>
                <option value="">Todas as coleções</option>
                {collections.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            )}

            {brands.length > 0 && (
              <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)} className={selectCls}>
                <option value="">Todas as marcas</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            )}

            {hasFilters && (
              <button
                onClick={() => { setSearch(""); setFilterFamily(""); setFilterCollection(""); setFilterBrand(""); }}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={13} /> Limpar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
            </div>
            <p className="text-sm text-gray-500">
              {hasFilters ? "Nenhuma cor encontrada para os filtros aplicados." : "Nenhuma cor cadastrada."}
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-4">
              {filtered.length} cor{filtered.length !== 1 ? "es" : ""}
              {hasFilters ? " encontrada" + (filtered.length !== 1 ? "s" : "") : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filtered.map((color) => (
                <ColorCard key={color.id} color={color} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
