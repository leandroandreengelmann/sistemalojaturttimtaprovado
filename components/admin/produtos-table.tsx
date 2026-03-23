"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Eye, EyeSlash, PencilSimple, Trash } from "@phosphor-icons/react";
import { toggleProductActive, deleteProducts } from "@/lib/actions/products";

interface Product {
  id: string;
  name: string;
  brand: string | null;
  active: boolean;
  categories: { name: string } | null;
  product_images: { url: string; is_primary: boolean }[];
}

interface ProdutosTableProps {
  products: Product[];
}

export function ProdutosTable({ products }: ProdutosTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const allSelected = products.length > 0 && selected.size === products.length;

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(products.map((p) => p.id)));
    }
  }

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleBulkDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    startTransition(async () => {
      await deleteProducts(Array.from(selected));
      setSelected(new Set());
      setConfirmDelete(false);
    });
  }

  return (
    <>
      {/* Barra de ações em lote */}
      {selected.size > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 mb-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            {selected.size} produto{selected.size !== 1 ? "s" : ""} selecionado{selected.size !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setSelected(new Set()); setConfirmDelete(false); }}
              className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={isPending}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors rounded-md ${
                confirmDelete
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
              }`}
            >
              <Trash size={13} weight="bold" />
              {isPending ? "Deletando..." : confirmDelete ? "Confirmar exclusão" : "Deletar selecionados"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  aria-label="Selecionar todos"
                />
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Produto</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Categoria</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => {
              const img = p.product_images.find((i) => i.is_primary);
              const isSelected = selected.has(p.id);
              return (
                <tr
                  key={p.id}
                  className={`transition-colors ${isSelected ? "bg-primary/5" : "hover:bg-gray-50/50"}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(p.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      aria-label={`Selecionar ${p.name}`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 border border-gray-100 shrink-0 overflow-hidden rounded-md">
                        {img && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img.url} alt={p.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[180px]">{p.name}</p>
                        {p.brand && <p className="text-xs text-gray-400">{p.brand}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">
                    {p.categories?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => startTransition(() => toggleProductActive(p.id, !p.active))}
                      title={p.active ? "Desativar" : "Ativar"}
                      className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold transition-colors rounded-md ${
                        p.active
                          ? "bg-success/10 text-success-700 hover:bg-success/20"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {p.active ? <Eye size={11} /> : <EyeSlash size={11} />}
                      {p.active ? "Ativo" : "Inativo"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/produtos/${p.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors rounded-md"
                    >
                      <PencilSimple size={13} />
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">Nenhum produto cadastrado.</p>
            <Link href="/admin/produtos/novo" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Criar o primeiro produto
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
