"use client";

import { WhatsappLogo } from "@phosphor-icons/react";

interface ProductCtaProps {
  productName: string;
  productSlug: string;
  whatsapp: string;
  compact?: boolean;
  price?: number | null;
  price_promo?: number | null;
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ProductCta({ productName, whatsapp, compact = false, price, price_promo }: ProductCtaProps) {
  const waText = encodeURIComponent(`Olá, tenho interesse no produto: *${productName}*. Poderia me dar mais informações?`);
  const waHref = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${waText}`;

  if (compact) {
    return (
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all rounded-md"
      >
        <WhatsappLogo size={16} weight="fill" />
        Falar com Vendedor
      </a>
    );
  }

  return (
    <div className="space-y-3">
      {/* Preço */}
      {price ? (
        <div className="space-y-0.5">
          {price_promo ? (
            <>
              <p className="text-xs text-gray-400 line-through">{formatPrice(price)}</p>
              <p className="text-2xl font-black text-primary">{formatPrice(price_promo)}</p>
              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded-sm">
                Promoção
              </span>
            </>
          ) : (
            <p className="text-2xl font-black text-gray-900">{formatPrice(price)}</p>
          )}
        </div>
      ) : (
        <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
          Preço sob consulta
        </p>
      )}

      {/* CTA: WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
      >
        <WhatsappLogo size={20} weight="fill" />
        Falar com o Vendedor
      </a>
    </div>
  );
}
