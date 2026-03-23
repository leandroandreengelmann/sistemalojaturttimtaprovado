import Link from "next/link";
import { MapPin, Phone, ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
}

interface NossasLojasSectionProps {
  stores: Store[];
}

export function NossasLojasSection({ stores }: NossasLojasSectionProps) {
  if (stores.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Presença nacional
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Nossas Lojas
            </h2>
          </div>
          <Link
            href="/nossas-lojas"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver todas
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.slice(0, 6).map((store) => {
            const waHref = store.whatsapp
              ? `https://wa.me/${store.whatsapp.replace(/\D/g, "")}?text=Olá%2C%20gostaria%20de%20informações.`
              : null;

            return (
              <div
                key={store.id}
                className="border border-gray-100 p-5 hover:border-primary transition-colors group rounded-lg"
              >
                {/* Cabeçalho */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{store.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={12} weight="fill" className="text-primary shrink-0" />
                      <span className="text-xs text-gray-500">
                        {store.city}, {store.state}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 flex items-center justify-center shrink-0 rounded-md">
                    <MapPin size={16} weight="fill" className="text-primary" />
                  </div>
                </div>

                {store.address && (
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">{store.address}</p>
                )}

                <div className="flex gap-2 pt-3 border-t border-gray-50">
                  {store.phone && (
                    <a
                      href={`tel:${store.phone}`}
                      className="flex items-center gap-1.5 flex-1 py-2 text-xs font-medium text-gray-600 hover:text-primary transition-colors"
                    >
                      <Phone size={13} weight="fill" />
                      {store.phone}
                    </a>
                  )}
                  {waHref && (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 bg-[#25D366] text-white hover:bg-[#1da851] transition-colors rounded-md"
                      aria-label="WhatsApp"
                    >
                      <WhatsappLogo size={14} weight="fill" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/nossas-lojas"
            className="flex items-center justify-center gap-1.5 w-full py-3 border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors rounded-md"
          >
            Ver todas as lojas
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
