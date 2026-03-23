"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPaintColor, updatePaintColor, deletePaintColor } from "@/lib/actions/paint-colors";
import type { Tables } from "@/lib/types/database.types";

interface PaintColorFormProps {
  color?: Tables<"paint_colors">;
}

const FAMILIES = [
  "Branco", "Bege", "Cinza", "Preto",
  "Amarelo", "Laranja", "Vermelho", "Rosa",
  "Roxo", "Azul", "Verde", "Marrom",
];

const inputCls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none transition-colors bg-white";
const labelCls = "block text-xs font-semibold text-gray-700 mb-1.5";

export function PaintColorForm({ color }: PaintColorFormProps) {
  const [isPending, startTransition] = useTransition();
  const [hex, setHex] = useState(color?.hex ?? "#3B82F6");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("hex", hex);
    startTransition(async () => {
      const result = color
        ? await updatePaintColor(color.id, fd)
        : await createPaintColor(fd);
      if (result?.error) { toast.error(result.error); return; }
      toast.success(color ? "Cor atualizada!" : "Cor criada com sucesso!");
      router.push("/admin/cores");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">

        {/* Preview da cor */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <div
            className="w-16 h-16 rounded-lg border border-gray-200 shrink-0 shadow-sm"
            style={{ backgroundColor: hex }}
          />
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Preview da cor</p>
            <p className="text-sm font-mono text-gray-700">{hex}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nome */}
          <div>
            <label className={labelCls}>Nome da cor *</label>
            <input
              name="name"
              required
              defaultValue={color?.name ?? ""}
              className={inputCls}
              placeholder="Ex: Azul Turquesa"
            />
          </div>
          {/* Código */}
          <div>
            <label className={labelCls}>Código</label>
            <input
              name="code"
              defaultValue={color?.code ?? ""}
              className={inputCls}
              placeholder="Ex: AT-234"
            />
          </div>
        </div>

        {/* Cor HEX */}
        <div>
          <label className={labelCls}>Cor (HEX) *</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-12 h-10 rounded-md border border-gray-200 cursor-pointer p-0.5 bg-white"
            />
            <input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className={`${inputCls} font-mono`}
              placeholder="#000000"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Família */}
          <div>
            <label className={labelCls}>Família</label>
            <select name="family" defaultValue={color?.family ?? ""} className={inputCls}>
              <option value="">Sem família</option>
              {FAMILIES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          {/* Coleção */}
          <div>
            <label className={labelCls}>Coleção</label>
            <input
              name="collection"
              defaultValue={color?.collection ?? ""}
              className={inputCls}
              placeholder="Ex: Coleção Verão"
            />
          </div>
          {/* Marca */}
          <div>
            <label className={labelCls}>Marca</label>
            <input
              name="brand"
              defaultValue={color?.brand ?? ""}
              className={inputCls}
              placeholder="Ex: Coral, Suvinil"
            />
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className={labelCls}>Descrição</label>
          <textarea
            name="description"
            defaultValue={color?.description ?? ""}
            rows={2}
            className={inputCls}
            placeholder="Breve descrição desta cor..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div>
            <label className={labelCls}>Ordem de exibição</label>
            <input
              type="number"
              name="sort_order"
              defaultValue={color?.sort_order ?? 0}
              min={0}
              className={inputCls}
            />
          </div>
          <div className="pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="active"
                defaultChecked={color?.active ?? true}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-gray-700">Cor ativa</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {isPending ? "Salvando..." : color ? "Salvar alterações" : "Criar cor"}
        </button>
        <a
          href="/admin/cores"
          className="px-5 py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-md hover:border-gray-300 transition-colors"
        >
          Cancelar
        </a>

        {color && (
          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              if (!confirm(`Excluir a cor "${color.name}"?`)) return;
              startTransition(async () => {
                const result = await deletePaintColor(color.id);
                if (result?.error) { toast.error(result.error); return; }
                toast.success("Cor excluída.");
                router.push("/admin/cores");
              });
            }}
            className="ml-auto text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            Excluir cor
          </button>
        )}
      </div>
    </form>
  );
}
