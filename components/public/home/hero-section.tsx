"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { useWhatsapp } from "@/components/public/whatsapp-provider";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  whatsapp: string;
}

export function HeroSection({
  title = "Qualidade e tradição em cada produto",
  subtitle = "Conheça nosso catálogo completo e fale com um especialista para encontrar a solução ideal para o seu negócio.",
  imageUrl,
}: HeroSectionProps) {
  const { open: openWhatsapp } = useWhatsapp();

  return (
    <section className="relative overflow-hidden min-h-[420px] sm:min-h-[520px] lg:min-h-[640px] flex items-center">
      {/* Linha de acento no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary z-10" />

      {/* Imagem de fundo */}
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt="Banner principal"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-900/55" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gray-50" />
      )}

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <h1 className={`text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6 ${imageUrl ? "text-white" : "text-gray-900"}`}>
            {title}
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-10 ${imageUrl ? "text-white/80" : "text-gray-500"}`}>
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openWhatsapp}
              className="flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 bg-primary text-white text-base sm:text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all rounded-md min-h-[48px]"
            >
              <WhatsappLogo size={20} weight="fill" />
              Falar com o Vendedor
            </button>
            <Link
              href="/loja"
              className={`flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 text-base sm:text-sm font-semibold transition-colors rounded-md min-h-[48px] ${
                imageUrl
                  ? "border border-white/50 text-white hover:bg-white/10"
                  : "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
              }`}
            >
              Ver Produtos
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
