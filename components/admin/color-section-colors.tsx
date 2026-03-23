"use client";

import { useState, useTransition } from "react";
import { Trash, MagnifyingGlass } from "@phosphor-icons/react";
import { addColorToSection, removeColorFromSection } from "@/lib/actions/color-sections";
import { createClient } from "@/lib/supabase/client";

interface ColorItem {
  id: string;
  name: string;
  hex: string;
  code: string;
  family: string | null;
}

interface ColorSectionColorsProps {
  sectionId: string;
  initial: ColorItem[];
}

export function ColorSectionColors({ sectionId, initial }: ColorSectionColorsProps) {
  const [colors, setColors] = useState<ColorItem[]>(initial);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ColorItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSearch(value: string) {
    setQuery(value);
    if (value.trim().length < 2) { setResults([]); return; }
    setSearching(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("paint_colors")
      .select("id, name, hex, code, family")
      .eq("active", true)
      .or(`name.ilike.%${value}%,code.ilike.%${value}%`)
      .limit(12);
    setResults(data ?? []);
    setSearching(false);
  }

  function handleAdd(color: ColorItem) {
    if (colors.find((c) => c.id === color.id)) return;
    startTransition(async () => {
      await addColorToSection(sectionId, color.id);
      setColors((prev) => [...prev, color]);
      setResults([]);
      setQuery("");
    });
  }

  function handleRemove(colorId: string) {
    startTransition(async () => {
      await removeColorFromSection(sectionId, colorId);
      setColors((prev) => prev.filter((c) => c.id !== colorId));
    });
  }

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-lg space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Cores desta seção</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {colors.length} cor{colors.length !== 1 ? "es" : ""} adicionada{colors.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Busca */}
      <div className="relative">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md focus-within:border-primary transition-colors">
          <MagnifyingGlass size={15} className="text-gray-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar cor pelo nome ou código..."
            className="flex-1 text-sm outline-none bg-transparent"
          />
          {searching && <span className="text-xs text-gray-400">Buscando...</span>}
        </div>

        {results.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg mt-1 divide-y divide-gray-50 max-h-60 overflow-y-auto">
            {results.map((color) => {
              const already = !!colors.find((x) => x.id === color.id);
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => !already && handleAdd(color)}
                  disabled={already || isPending}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                    already ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-md border border-gray-100 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{color.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{color.hex}{color.code ? ` · ${color.code}` : ""}</p>
                  </div>
                  <span className="ml-auto text-xs font-medium shrink-0">
                    {already ? "Adicionada" : "+ Adicionar"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lista de cores adicionadas */}
      {colors.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
          <p className="text-sm text-gray-400">Nenhuma cor adicionada ainda.</p>
          <p className="text-xs text-gray-400 mt-1">Use a busca acima para adicionar cores.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {colors.map((color, i) => (
            <div key={color.id} className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-md">
              <span className="text-xs text-gray-400 w-5 text-center shrink-0">{i + 1}</span>
              <div
                className="w-9 h-9 rounded-md border border-gray-100 shrink-0"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{color.name}</p>
                <p className="text-xs text-gray-400 font-mono">{color.hex}{color.code ? ` · ${color.code}` : ""}</p>
              </div>
              {color.family && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-gray-100 text-gray-500 font-medium shrink-0">
                  {color.family}
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemove(color.id)}
                disabled={isPending}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-md"
                title="Remover"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
