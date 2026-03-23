import { createClient } from "@/lib/supabase/server";
import { ContactForm } from "@/components/public/contact/contact-form";
import { Phone, Envelope, WhatsappLogo, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Turatti",
  description: "Fale com a equipe Turatti por WhatsApp, e-mail ou formulário. Consultoria especializada e resposta em até 1 dia útil.",
};

export default async function ContatoPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("settings")
    .select("key, value")
    .in("key", ["whatsapp", "email", "site_name", "phone"]);

  const s = Object.fromEntries((settings ?? []).map((r) => [r.key, r.value as string]));

  return (
    <>
      <div className="h-1 w-full bg-primary" />
      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Fale conosco
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            Contato
          </h1>
          <p className="mt-4 text-gray-400 text-sm max-w-xl">
            Preencha o formulário ou use um dos canais abaixo. Nossa equipe responde em
            até 1 dia útil.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar canais */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-900 mb-5">Outros canais</h2>

              {s.whatsapp && (
                <a
                  href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-gray-100 hover:border-[#25D366] group transition-colors rounded-lg"
                >
                  <div className="w-10 h-10 bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors rounded-md">
                    <WhatsappLogo size={20} weight="fill" className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-xs text-gray-500">{s.whatsapp}</p>
                  </div>
                </a>
              )}

              {s.email && (
                <a
                  href={`mailto:${s.email}`}
                  className="flex items-center gap-4 p-4 border border-gray-100 hover:border-primary group transition-colors rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors rounded-md">
                    <Envelope size={20} weight="fill" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">E-mail</p>
                    <p className="text-xs text-gray-500">{s.email}</p>
                  </div>
                </a>
              )}

              {s.phone && (
                <a
                  href={`tel:${s.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-4 p-4 border border-gray-100 hover:border-primary group transition-colors rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors rounded-md">
                    <Phone size={20} weight="fill" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Telefone</p>
                    <p className="text-xs text-gray-500">{s.phone}</p>
                  </div>
                </a>
              )}

              <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center shrink-0 rounded-md">
                  <MapPin size={20} weight="fill" className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Nossas Lojas</p>
                  <a href="/nossas-lojas" className="text-xs text-primary hover:underline">
                    Ver endereços →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
