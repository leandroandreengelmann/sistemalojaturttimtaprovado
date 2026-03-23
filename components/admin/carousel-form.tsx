"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCarousel, updateCarousel } from "@/lib/actions/carousels";

interface Carousel {
  id: string;
  title: string;
  has_timer: boolean | null;
  timer_ends_at: string | null;
  active: boolean | null;
}

interface CarouselFormProps {
  carousel?: Carousel;
}

export function CarouselForm({ carousel }: CarouselFormProps) {
  const [isPending, startTransition] = useTransition();
  const [hasTimer, setHasTimer] = useState(carousel?.has_timer ?? false);
  const router = useRouter();

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = carousel ? await updateCarousel(carousel.id, fd) : await createCarousel(fd);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      if (carousel) {
        toast.success("Carrossel atualizado!");
      } else {
        toast.success("Carrossel criado com sucesso!");
        const id = (result as { id?: string }).id;
        router.push(id ? `/admin/carroseis/${id}` : "/admin/carroseis");
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
            placeholder="Ex: Ofertas da Semana"
          />
          <p className="text-[11px] text-gray-400 mt-1">Aparece acima do carrossel na home</p>
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

      {/* Cronômetro */}
      <div className="bg-white border border-gray-200 p-5 space-y-4 rounded-lg">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Cronômetro regressivo</h2>
            <p className="text-xs text-gray-400 mt-0.5">Exibe uma contagem regressiva no carrossel</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="has_timer"
              checked={hasTimer}
              onChange={(e) => setHasTimer(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm text-gray-700">Ativar</span>
          </label>
        </div>

        {hasTimer && (
          <div>
            <p className="text-xs text-gray-500 mb-3">
              Define em quanto tempo o cronômetro expira a partir de agora:
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Dias</label>
                <input
                  type="number"
                  name="timer_days"
                  min={0}
                  max={365}
                  defaultValue={0}
                  className={inputCls}
                  placeholder="0"
                />
              </div>
              <div>
                <label className={labelCls}>Horas</label>
                <input
                  type="number"
                  name="timer_hours"
                  min={0}
                  max={23}
                  defaultValue={0}
                  className={inputCls}
                  placeholder="0"
                />
              </div>
              <div>
                <label className={labelCls}>Minutos</label>
                <input
                  type="number"
                  name="timer_minutes"
                  min={0}
                  max={59}
                  defaultValue={0}
                  className={inputCls}
                  placeholder="0"
                />
              </div>
            </div>
            {carousel?.timer_ends_at && (
              <p className="text-xs text-gray-400 mt-2">
                Expira em: {new Date(carousel.timer_ends_at).toLocaleString("pt-BR")}
                {" "}(salve para redefinir)
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <a href="/admin/carroseis" className="text-sm text-gray-500 hover:text-gray-700">
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
