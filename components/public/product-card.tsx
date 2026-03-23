import Link from "next/link";
import Image from "next/image";
import { WhatsappLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  brand: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  whatsapp: string;
  price?: number | null;
  price_promo?: number | null;
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ProductCard({
  name,
  slug,
  summary,
  brand,
  imageUrl,
  imageAlt,
  whatsapp,
  price,
  price_promo,
}: ProductCardProps) {
  const waText = encodeURIComponent(`Olá, tenho interesse no produto: ${name}`);
  const waHref = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${waText}`;

  return (
    <article className="group flex flex-col flex-1 bg-white border border-gray-100 shadow-sm hover:border-primary hover:shadow-md transition-all duration-200 rounded-lg overflow-hidden">
      {/* Imagem */}
      <Link href={`/produto/${slug}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-md" />
          </div>
        )}

      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        {brand && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
            {brand}
          </span>
        )}
        <Link
          href={`/produto/${slug}`}
          className="text-sm font-semibold text-gray-900 leading-snug hover:text-primary transition-colors mb-2 line-clamp-2"
        >
          {name}
        </Link>
        {summary && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2 flex-1">
            {summary}
          </p>
        )}

        {/* Preço */}
        {price_promo ? (
          <div className="mb-3 mt-auto">
            <p className="text-[11px] text-gray-400 line-through leading-none">{formatPrice(price!)}</p>
            <p className="text-base font-black text-primary leading-tight">{formatPrice(price_promo)}</p>
          </div>
        ) : price ? (
          <p className="text-base font-black text-gray-900 mb-3 mt-auto">{formatPrice(price)}</p>
        ) : null}

        {/* Ações */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-50">
          <Link
            href={`/produto/${slug}`}
            className="flex items-center justify-center gap-1 flex-1 py-2 border border-gray-200 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors rounded-md"
          >
            Ver detalhes
            <ArrowRight size={12} weight="bold" />
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar pelo WhatsApp"
            className="flex items-center justify-center p-2 bg-[#25D366] text-white hover:bg-[#1da851] transition-colors rounded-md"
          >
            <WhatsappLogo size={16} weight="fill" />
          </a>
        </div>
      </div>
    </article>
  );
}
