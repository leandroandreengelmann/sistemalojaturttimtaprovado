interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
}

interface BrandsSectionProps {
  brands: Brand[];
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  if (brands.length === 0) return null;

  return (
    <section className="py-10 lg:py-14 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center mb-8">
          Marcas que trabalhamos
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {brands.map((brand) => {
            const inner = brand.logo_url ? (
              <img
                src={brand.logo_url}
                alt={brand.name}
                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            ) : (
              <span className="text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors uppercase tracking-wide">
                {brand.name}
              </span>
            );

            return brand.website_url ? (
              <a
                key={brand.id}
                href={brand.website_url}
                target="_blank"
                rel="noopener noreferrer"
                title={brand.name}
                className="flex items-center justify-center"
              >
                {inner}
              </a>
            ) : (
              <div key={brand.id} className="flex items-center justify-center" title={brand.name}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
