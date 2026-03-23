"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProduct, createProductReturnId, updateProduct } from "@/lib/actions/products";
import { Plus, Trash } from "@phosphor-icons/react";

interface Category { id: string; name: string; parent_id: string | null }
interface Spec { key: string; value: string }
interface Product {
  id: string; name: string; slug: string; summary: string | null;
  description: string | null; category_id: string | null; brand: string | null;
  active: boolean; specs: unknown;
  price: number | null; price_promo: number | null;
}

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onAfterCreate?: (id: string) => void;
  formId?: string;
  hideSubmit?: boolean;
}

export function ProductForm({ product, categories, onAfterCreate, formId, hideSubmit }: ProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [specs, setSpecs] = useState<Spec[]>(
    Array.isArray(product?.specs) ? (product.specs as Spec[]) : []
  );
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");

  function toSlug(str: string) {
    return str.toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function addSpec() { setSpecs([...specs, { key: "", value: "" }]); }
  function removeSpec(i: number) { setSpecs(specs.filter((_, idx) => idx !== i)); }
  function updateSpec(i: number, field: "key" | "value", val: string) {
    setSpecs(specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  }

  const roots = categories.filter((c) => !c.parent_id);
  const children = categories.filter((c) => c.parent_id);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("specs", JSON.stringify(specs));
    startTransition(async () => {
      if (product) {
        const result = await updateProduct(product.id, fd);
        if (result?.error) { toast.error(result.error); return; }
        toast.success("Alterações salvas!");
      } else if (onAfterCreate) {
        const result = await createProductReturnId(fd);
        if (result?.error) { toast.error(result.error); return; }
        if (result.id) onAfterCreate(result.id);
      } else {
        const result = await createProduct(fd);
        if (result?.error) { toast.error(result.error); return; }
        toast.success("Produto criado com sucesso!");
        if (result.id) router.push(`/admin/produtos/${result.id}`);
      }
    });
  }

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6">
      {/* Nome + Slug */}
      <div className="bg-white border border-gray-200 p-5 space-y-4 rounded-lg">
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Informações básicas</h2>
        <div>
          <label className={labelCls}>Nome *</label>
          <input
            name="name" required value={name} onChange={(e) => {
              setName(e.target.value);
              if (!product) setSlug(toSlug(e.target.value));
            }}
            className={inputCls} placeholder="Nome do produto"
          />
        </div>
        <div>
          <label className={labelCls}>Slug (URL)</label>
          <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)}
            className={inputCls} placeholder="nome-do-produto"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Categoria</label>
            <select name="category_id" defaultValue={product?.category_id ?? ""} className={inputCls}>
              <option value="">Sem categoria</option>
              {roots.map((r) => (
                <optgroup key={r.id} label={r.name}>
                  <option value={r.id}>{r.name}</option>
                  {children.filter((c) => c.parent_id === r.id).map((c) => (
                    <option key={c.id} value={c.id}>  {c.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Marca</label>
            <input name="brand" defaultValue={product?.brand ?? ""} className={inputCls} placeholder="Marca" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Preço (R$)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product?.price ?? ""}
              className={inputCls}
              placeholder="0,00"
            />
          </div>
          <div>
            <label className={labelCls}>Preço em promoção (R$)</label>
            <input
              name="price_promo"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product?.price_promo ?? ""}
              className={inputCls}
              placeholder="0,00"
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Resumo</label>
          <textarea name="summary" defaultValue={product?.summary ?? ""} rows={2}
            className={inputCls} placeholder="Resumo curto exibido nos cards"
          />
        </div>
        <div>
          <label className={labelCls}>Descrição completa</label>
          <textarea name="description" defaultValue={product?.description ?? ""} rows={6}
            className={inputCls} placeholder="Descrição detalhada (suporta HTML básico)"
          />
        </div>
      </div>

      {/* Especificações */}
      <div className="bg-white border border-gray-200 p-5 rounded-lg">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <h2 className="text-sm font-bold text-gray-900">Especificações técnicas</h2>
          <button type="button" onClick={addSpec}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Plus size={12} /> Adicionar
          </button>
        </div>
        {specs.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">Nenhuma especificação. Clique em "Adicionar".</p>
        )}
        <div className="space-y-2">
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={spec.key} onChange={(e) => updateSpec(i, "key", e.target.value)}
                placeholder="Atributo (ex: Voltagem)" className={`${inputCls} flex-1`}
              />
              <input value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)}
                placeholder="Valor (ex: 220V)" className={`${inputCls} flex-1`}
              />
              <button type="button" onClick={() => removeSpec(i)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="bg-white border border-gray-200 p-5 rounded-lg">
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100 mb-4">Visibilidade</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="active" defaultChecked={product?.active ?? true}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm text-gray-700">Produto ativo (visível no site)</span>
        </label>
      </div>

      {/* Submit */}
      {!hideSubmit && (
        <div className="flex items-center justify-between pt-2">
          <a href="/admin/produtos" className="text-sm text-gray-500 hover:text-gray-700">
            Cancelar
          </a>
          <button
            type="submit" disabled={isPending}
            className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 rounded-md"
          >
            {isPending ? "Salvando..." : product ? "Salvar alterações" : "Criar produto"}
          </button>
        </div>
      )}
    </form>
  );
}
