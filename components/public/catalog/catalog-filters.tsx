"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
}

interface CatalogFiltersProps {
  categories: Category[];
  current: {
    categoria?: string;
    marca?: string;
    ordem?: string;
    busca?: string;
  };
}

const ordemOptions = [
  { value: "", label: "Relevância" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
  { value: "novo", label: "Lançamentos" },
];

export function CatalogFilters({ categories, current }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams();
      if (current.categoria && key !== "categoria") params.set("categoria", current.categoria);
      if (current.ordem && key !== "ordem") params.set("ordem", current.ordem);
      if (current.busca && key !== "busca") params.set("busca", current.busca);
      if (value) params.set(key, value);
      params.delete("pagina");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, current]
  );

  return (
    <div className="space-y-6">
      {/* Busca */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
          Buscar
        </label>
        <input
          type="search"
          defaultValue={current.busca}
          placeholder="Nome do produto..."
          className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none placeholder:text-gray-400 rounded-md"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              updateParam("busca", (e.target as HTMLInputElement).value);
          }}
        />
      </div>

      {/* Ordenação */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
          Ordenar por
        </label>
        <div className="flex flex-col gap-1">
          {ordemOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("ordem", opt.value)}
              className={`text-left px-3 py-2 text-sm transition-colors rounded-md ${
                current.ordem === opt.value || (!current.ordem && opt.value === "")
                  ? "bg-primary text-white font-medium"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categorias */}
      {categories.length > 0 && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            Categoria
          </label>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => updateParam("categoria", "")}
              className={`text-left px-3 py-2 text-sm transition-colors rounded-md ${
                !current.categoria
                  ? "bg-primary text-white font-medium"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
            >
              Todas
            </button>
            {categories
              .filter((c) => !c.parent_id)
              .map((root) => {
                const children = categories.filter((c) => c.parent_id === root.id);
                return (
                  <div key={root.id}>
                    <button
                      onClick={() => updateParam("categoria", root.slug)}
                      className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                        current.categoria === root.slug
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:text-primary hover:bg-gray-50"
                      }`}
                    >
                      {root.name}
                    </button>
                    {children.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => updateParam("categoria", sub.slug)}
                        className={`w-full text-left pl-6 pr-3 py-1.5 text-xs transition-colors rounded-md ${
                          current.categoria === sub.slug
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-gray-500 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        ↳ {sub.name}
                      </button>
                    ))}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
