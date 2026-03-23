"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createColorSection, updateColorSection } from "@/lib/actions/color-sections";
import type { Tables } from "@/lib/types/database.types";

interface ColorSectionFormProps {
  section?: Tables<"color_sections">;
}

const inputCls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none transition-colors bg-white";
const labelCls = "block text-xs font-semibold text-gray-700 mb-1.5";

export function ColorSectionForm({ section }: ColorSectionFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = section
        ? await updateColorSection(section.id, fd)
        : await createColorSection(fd);
      if (result?.error) { toast.error(result.error); return; }
      toast.success(section ? "Seção atualizada!" : "Seção criada com sucesso!");
      if (!section && "id" in result && result.id) {
        router.push(`/admin/secoes-cores/${result.id}`);
      } else {
        router.push("/admin/secoes-cores");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div>
          <label className={labelCls}>Título da seção *</label>
          <input
            name="title"
            required
            defaultValue={section?.title ?? ""}
            className={inputCls}
            placeholder="Ex: Tons de Azul, Coleção Verão..."
          />
        </div>

        <div>
          <label className={labelCls}>Descrição</label>
          <textarea
            name="description"
            defaultValue={section?.description ?? ""}
            rows={2}
            className={inputCls}
            placeholder="Descrição opcional desta seção de cores..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div>
            <label className={labelCls}>Ordem de exibição</label>
            <input
              type="number"
              name="sort_order"
              defaultValue={section?.sort_order ?? 0}
              min={0}
              className={inputCls}
            />
          </div>
          <div className="pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="active"
                defaultChecked={section?.active ?? true}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-gray-700">Seção ativa</span>
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
          {isPending ? "Salvando..." : section ? "Salvar alterações" : "Criar seção"}
        </button>
        <a
          href="/admin/secoes-cores"
          className="px-5 py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-md hover:border-gray-300 transition-colors"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
