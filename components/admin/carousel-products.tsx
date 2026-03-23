"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Trash, MagnifyingGlass } from "@phosphor-icons/react";
import { addCarouselProduct, removeCarouselProduct } from "@/lib/actions/carousels";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  brand: string | null;
  imageUrl?: string;
}

interface CarouselProductsProps {
  carouselId: string;
  initial: Product[];
}

export function CarouselProducts({ carouselId, initial }: CarouselProductsProps) {
  const [products, setProducts] = useState<Product[]>(initial);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSearch(value: string) {
    setQuery(value);
    if (value.trim().length < 2) { setResults([]); return; }
    setSearching(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("products")
      .select("id, name, brand, product_images(url, is_primary)")
      .eq("active", true)
      .ilike("name", `%${value}%`)
      .limit(8);
    setResults(
      (data ?? []).map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        imageUrl: (p.product_images as { url: string; is_primary: boolean }[])
          .find((i) => i.is_primary)?.url,
      }))
    );
    setSearching(false);
  }

  function handleAdd(product: Product) {
    if (products.find((p) => p.id === product.id)) return;
    startTransition(async () => {
      await addCarouselProduct(carouselId, product.id);
      setProducts((prev) => [...prev, product]);
      setResults([]);
      setQuery("");
    });
  }

  function handleRemove(productId: string) {
    startTransition(async () => {
      await removeCarouselProduct(carouselId, productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    });
  }

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-lg space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Produtos do carrossel</h2>
          <p className="text-xs text-gray-400 mt-0.5">{products.length} produto{products.length !== 1 ? "s" : ""} adicionado{products.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Busca */}
      <div className="relative">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md focus-within:border-primary transition-colors">
          <MagnifyingGlass size={15} className="text-gray-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar produto pelo nome..."
            className="flex-1 text-sm outline-none bg-transparent"
          />
          {searching && <span className="text-xs text-gray-400">Buscando...</span>}
        </div>

        {results.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg mt-1 divide-y divide-gray-50 max-h-60 overflow-y-auto">
            {results.map((p) => {
              const already = !!products.find((x) => x.id === p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => !already && handleAdd(p)}
                  disabled={already || isPending}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                    already ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-8 h-8 bg-gray-100 border border-gray-100 rounded-md shrink-0 overflow-hidden">
                    {p.imageUrl && (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                    {p.brand && <p className="text-xs text-gray-400">{p.brand}</p>}
                  </div>
                  <span className="ml-auto text-xs font-medium shrink-0">
                    {already ? "Adicionado" : "+ Adicionar"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lista de produtos adicionados */}
      {products.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
          <p className="text-sm text-gray-400">Nenhum produto adicionado ainda.</p>
          <p className="text-xs text-gray-400 mt-1">Use a busca acima para adicionar produtos.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-md">
              <span className="text-xs text-gray-400 w-5 text-center shrink-0">{i + 1}</span>
              <div className="w-9 h-9 bg-gray-100 border border-gray-100 rounded-md shrink-0 overflow-hidden">
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                {p.brand && <p className="text-xs text-gray-400">{p.brand}</p>}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(p.id)}
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
