"use client";

import { useState, useTransition } from "react";
import {
  ArrowUp, ArrowDown, Trash, Eye, EyeSlash, Plus,
  Image, Sparkle, GridFour, FrameCorners, SquaresFour,
  SlidersHorizontal, Storefront, Users, MapPin, Megaphone, ImagesSquare,
  PaintBucket,
  type Icon,
} from "@phosphor-icons/react";
import { removeHomeSection, toggleHomeSectionActive, reorderHomeSections, addHomeSection } from "@/lib/actions/home-sections";

const TYPE_LABELS: Record<string, { label: string; icon: Icon }> = {
  hero:              { label: "Hero / Banner principal",  icon: Image },
  diferenciais:      { label: "Diferenciais",             icon: Sparkle },
  categorias:        { label: "Grade de categorias",      icon: GridFour },
  banner_strip:      { label: "Banner intermediário",     icon: FrameCorners },
  product_section:   { label: "Seção de produtos",        icon: SquaresFour },
  carousel:          { label: "Carrossel de produtos",    icon: SlidersHorizontal },
  image_carousel:    { label: "Carrossel de imagens",     icon: ImagesSquare },
  brands:            { label: "Vitrine de marcas",        icon: Storefront },
  quem_somos:        { label: "Quem Somos",               icon: Users },
  nossas_lojas:      { label: "Nossas Lojas",             icon: MapPin },
  cta_comercial:     { label: "CTA Comercial",            icon: Megaphone },
  cores_tintas:      { label: "Cores de Tintas",          icon: PaintBucket },
};

interface RefOption { id: string; title: string }

interface Section {
  id: string;
  type: string;
  active: boolean | null;
  sort_order: number | null;
  reference_id: string | null;
  label?: string;
}

interface HomeSectionsManagerProps {
  sections: Section[];
  carousels: RefOption[];
  productSections: RefOption[];
  imageCarousels: RefOption[];
  colorSections: RefOption[];
}

export function HomeSectionsManager({ sections: initial, carousels, productSections, imageCarousels, colorSections }: HomeSectionsManagerProps) {
  const [sections, setSections] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [addType, setAddType] = useState("carousel");
  const [addRef, setAddRef] = useState(carousels[0]?.id ?? "");
  const [showAdd, setShowAdd] = useState(false);

  function move(index: number, dir: -1 | 1) {
    const next = [...sections];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSections(next);
    startTransition(() => reorderHomeSections(next.map((s) => s.id)));
  }

  function handleToggle(id: string, active: boolean) {
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, active } : s));
    startTransition(() => toggleHomeSectionActive(id, active));
  }

  function handleRemove(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id));
    startTransition(() => removeHomeSection(id));
  }

  function handleAdd() {
    const needsRef = addType === "carousel" || addType === "product_section" || addType === "image_carousel" || addType === "cores_tintas";
    const refId = needsRef ? addRef : null;
    startTransition(async () => {
      await addHomeSection(addType, refId);
      // Reload via server — revalidatePath já cuida disso
      window.location.reload();
    });
  }

  return (
    <div className="space-y-4">
      {/* Todas as seções */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Seções da home (arraste para reordenar)</p>
          <button
            onClick={() => setShowAdd((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90 transition-colors"
          >
            <Plus size={12} weight="bold" />
            Adicionar seção
          </button>
        </div>

        {/* Formulário de adicionar */}
        {showAdd && (
          <div className="px-4 py-4 border-b border-gray-100 bg-primary/5 flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Tipo de seção</label>
              <select
                value={addType}
                onChange={(e) => setAddType(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
              >
                {Object.entries(TYPE_LABELS).map(([v, { label }]) => (
                  <option key={v} value={v}>{label}</option>
                ))}
              </select>
            </div>

            {addType === "carousel" && carousels.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Qual carrossel</label>
                <select
                  value={addRef}
                  onChange={(e) => setAddRef(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
                >
                  {carousels.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            )}

            {addType === "product_section" && productSections.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Qual seção</label>
                <select
                  value={addRef}
                  onChange={(e) => setAddRef(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
                >
                  {productSections.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
            )}

            {addType === "image_carousel" && imageCarousels.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Qual carrossel de imagens</label>
                <select
                  value={addRef}
                  onChange={(e) => setAddRef(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
                >
                  {imageCarousels.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            )}

            {addType === "cores_tintas" && colorSections.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Qual seção de cores</label>
                <select
                  value={addRef}
                  onChange={(e) => setAddRef(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-primary focus:outline-none"
                >
                  {colorSections.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            )}

            {addType === "cores_tintas" && colorSections.length === 0 && (
              <p className="text-xs text-amber-600 self-end pb-2">
                Crie uma seção de cores primeiro em{" "}
                <a href="/admin/secoes-cores" className="underline">Seções de Cores</a>.
              </p>
            )}

            <button
              onClick={handleAdd}
              disabled={isPending}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              Adicionar
            </button>
            <button onClick={() => setShowAdd(false)} className="text-sm text-gray-500 hover:text-gray-700">
              Cancelar
            </button>
          </div>
        )}

        {sections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">Nenhuma seção configurada.</p>
            <p className="text-xs text-gray-400 mt-1">Clique em "Adicionar seção" para começar.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {sections.map((section, i) => {
              const meta = TYPE_LABELS[section.type] ?? { label: section.type, emoji: "📄" };
              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${section.active !== false ? "" : "opacity-50"}`}
                >
                  {/* Ordem */}
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0 || isPending}
                      className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                    >
                      <ArrowUp size={12} weight="bold" />
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === sections.length - 1 || isPending}
                      className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                    >
                      <ArrowDown size={12} weight="bold" />
                    </button>
                  </div>

                  <meta.icon size={16} className="shrink-0 text-gray-400" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{meta.label}</p>
                    {section.label && (
                      <p className="text-xs text-gray-500 truncate">{section.label}</p>
                    )}
                  </div>

                  <span className="text-xs text-gray-400 shrink-0">#{i + 1}</span>

                  <button
                    onClick={() => handleToggle(section.id, !(section.active !== false))}
                    disabled={isPending}
                    title={section.active !== false ? "Desativar" : "Ativar"}
                    className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-md"
                  >
                    {section.active !== false ? <Eye size={15} /> : <EyeSlash size={15} />}
                  </button>

                  <button
                    onClick={() => handleRemove(section.id)}
                    disabled={isPending}
                    title="Remover"
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-md"
                  >
                    <Trash size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
