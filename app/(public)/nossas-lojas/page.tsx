import { createClient } from "@/lib/supabase/server";
import { CtaComercialSection } from "@/components/public/home/cta-comercial-section";
import { MapPin, Phone, Clock, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossas Lojas | Turatti",
  description: "Encontre as lojas Turatti com showroom completo e consultores especializados. Veja endereços, telefones e horários de atendimento.",
};

export default async function NossasLojasPage() {
  const supabase = await createClient();

  const [{ data: stores }, { data: settingsRow }] = await Promise.all([
    supabase.from("stores").select("*").eq("active", true).order("sort_order").order("name"),
    supabase.from("settings").select("key, value").eq("key", "whatsapp").maybeSingle(),
  ]);

  const whatsapp = (settingsRow?.value as string) ?? "";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turatti.com.br";

  const localBusinessSchema = stores && stores.length > 0
    ? stores.map((store) => ({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: store.name,
        url: `${base}/nossas-lojas`,
        ...(store.address ? { address: { "@type": "PostalAddress", streetAddress: store.address, addressLocality: store.city, addressRegion: store.state, addressCountry: "BR" } } : {}),
        ...(store.phone ? { telephone: store.phone } : {}),
        ...(store.hours ? { openingHours: store.hours } : {}),
      }))
    : null;

  return (
    <>
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}

      <div className="h-1 w-full bg-primary" />

      {/* Hero */}
      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Onde estamos
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            Nossas Lojas
          </h1>
          <p className="mt-4 text-gray-400 text-sm max-w-xl">
            Visite uma das nossas unidades e conheça nosso showroom completo com
            consultores especializados para te atender.
          </p>
        </div>
      </section>

      {/* Grid de lojas */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(!stores || stores.length === 0) ? (
            <div className="text-center py-20">
              <MapPin size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">Nenhuma loja cadastrada ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store) => {
                const wa = store.whatsapp ?? whatsapp;
                const waLink = wa
                  ? `https://wa.me/${wa.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de mais informações sobre a loja " + store.name)}`
                  : null;

                return (
                  <div key={store.id} className="bg-white border border-gray-100 shadow-sm flex flex-col rounded-xl overflow-hidden">

                    {/* Imagem */}
                    {store.image_url && (
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                        <Image
                          src={store.image_url}
                          alt={store.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Header */}
                    <div className="bg-primary px-5 py-4">
                      <h2 className="text-base font-bold text-white">{store.name}</h2>
                      {store.city && store.state && (
                        <p className="text-xs text-white/70 mt-0.5">
                          {store.city} — {store.state}
                        </p>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col gap-3 flex-1">

                      {/* Horários */}
                      {store.hours && (
                        <div className="flex gap-3 items-start">
                          <Clock size={16} weight="fill" className="text-primary mt-0.5 shrink-0" />
                          <div className="flex flex-col gap-0.5">
                            {store.hours.split("\n").map((line, i) => (
                              <p key={i} className="text-xs text-gray-700 leading-relaxed">{line}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Endereço */}
                      {store.address && (
                        <div className="flex gap-3 items-start">
                          <MapPin size={16} weight="fill" className="text-primary mt-0.5 shrink-0" />
                          <p className="text-xs text-gray-700 leading-relaxed">{store.address}</p>
                        </div>
                      )}

                      {/* Telefone */}
                      {store.phone && (
                        <div className="flex gap-3 items-center">
                          <Phone size={16} weight="fill" className="text-primary shrink-0" />
                          <a
                            href={`tel:${store.phone.replace(/\D/g, "")}`}
                            className="text-xs text-gray-700 hover:text-primary transition-colors"
                          >
                            {store.phone}
                          </a>
                        </div>
                      )}

                      {/* Descrição */}
                      {store.description && (
                        <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3 mt-1">
                          {store.description}
                        </p>
                      )}

                      {/* Ações */}
                      <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100">
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1dbc5a] transition-colors rounded-md"
                          >
                            <WhatsappLogo size={16} weight="fill" />
                            Falar com esta loja
                          </a>
                        )}
                        {store.maps_url && (
                          <a
                            href={store.maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 text-xs font-medium hover:border-primary hover:text-primary transition-colors rounded-md"
                          >
                            <MapPin size={14} />
                            Ver no mapa
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaComercialSection whatsapp={whatsapp} />
    </>
  );
}
