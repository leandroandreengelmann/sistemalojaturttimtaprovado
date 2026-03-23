import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface BannerIntermediarioProps {
  title?: string | null;
  subtitle?: string | null;
  imageUrl?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
}

export function BannerIntermediario({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaUrl,
}: BannerIntermediarioProps) {
  if (!title && !imageUrl) return null;

  return (
    <section className="relative overflow-hidden bg-primary">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title ?? "Banner"}
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-2xl">
          {title && (
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-white/80 mb-8">{subtitle}</p>
          )}
          {ctaText && ctaUrl && (
            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary text-sm font-semibold hover:bg-gray-50 active:scale-95 transition-all rounded-md"
            >
              {ctaText}
              <ArrowRight size={16} weight="bold" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
