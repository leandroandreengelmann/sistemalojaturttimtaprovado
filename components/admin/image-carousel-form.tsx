"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createImageCarousel, updateImageCarousel } from "@/lib/actions/image-carousels";

interface ImageCarousel {
  id: string;
  title: string;
  active: boolean;
}

interface ImageCarouselFormProps {
  carousel?: ImageCarousel;
}

export function ImageCarouselForm({ carousel }: ImageCarouselFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = carousel ? await updateImageCarousel(carousel.id, fd) : await createImageCarousel(fd);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      if (carousel) {
        toast.success("Carrossel atualizado!");
      } else {
        toast.success("Carrossel criado com sucesso!");
        const id = (result as { id?: string }).id;
        router.push(id ? `/admin/carroseis-imagens/${id}` : "/admin/carroseis-imagens");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white border border-gray-200 p-5 space-y-4 rounded-lg">
        <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
          Configurações do carrossel
        </h2>

        <div>
          <label className={labelCls}>Título *</label>
          <input
            name="title"
            required
            defaultValue={carousel?.title ?? ""}
            className={inputCls}
            placeholder="Ex: Banner Principal"
          />
          <p className="text-[11px] text-gray-400 mt-1">Nome interno para identificar este carrossel</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked={carousel?.active ?? true}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="active" className="text-sm text-gray-700 cursor-pointer">
            Carrossel ativo (visível na home)
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <a href="/admin/carroseis-imagens" className="text-sm text-gray-500 hover:text-gray-700">
          Cancelar
        </a>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 rounded-md"
        >
          {isPending ? "Salvando..." : carousel ? "Salvar alterações" : "Criar carrossel"}
        </button>
      </div>
    </form>
  );
}
