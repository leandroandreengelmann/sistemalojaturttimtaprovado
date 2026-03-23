import { createClient } from "@/lib/supabase/server";
import { CtaComercialSection } from "@/components/public/home/cta-comercial-section";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("institutional_pages")
    .select("seo_title, seo_desc")
    .eq("slug", "quem-somos")
    .maybeSingle();
  return {
    title: data?.seo_title ?? "Quem Somos | Turatti",
    description:
      data?.seo_desc ??
      "Conheça a história, missão e valores da Turatti. Mais de 20 anos de mercado com qualidade, confiança e atendimento consultivo especializado.",
  };
}

type QuemSomosContent = {
  body?: string;
  missao?: string;
  visao?: string;
  valores?: string;
  anos_mercado?: string;
  pilares?: { title: string; desc: string }[];
};

const defaultPilares = [
  { title: "Qualidade",   desc: "Produtos rigorosamente selecionados com os mais altos padrões." },
  { title: "Confiança",   desc: "Décadas de relacionamento sólido com clientes e fornecedores." },
  { title: "Inovação",    desc: "Sempre atentos às novidades e tendências do mercado." },
  { title: "Atendimento", desc: "Consultores especializados prontos para orientar cada cliente." },
];

export default async function QuemSomosPage() {
  const supabase = await createClient();

  const [pageRes, settingsRes] = await Promise.all([
    supabase.from("institutional_pages").select("title, content").eq("slug", "quem-somos").maybeSingle(),
    supabase.from("settings").select("key, value").eq("key", "whatsapp").maybeSingle(),
  ]);

  const raw = pageRes.data?.content as QuemSomosContent | null;
  const whatsapp = (settingsRes.data?.value as string) ?? "";

  const body         = raw?.body ?? "";
  const missao       = raw?.missao   || "Oferecer produtos de qualidade com atendimento consultivo e personalizado.";
  const visao        = raw?.visao    || "Ser a referência de confiança no nosso segmento em todo o Brasil.";
  const valores      = raw?.valores  || "Qualidade, integridade, inovação e foco no cliente.";
  const anosRaw      = raw?.anos_mercado ?? "20";
  const pilares      = raw?.pilares?.length ? raw.pilares : defaultPilares;

  return (
    <>
      <div className="h-1 w-full bg-primary" />

      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Nossa história
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight max-w-2xl">
            {pageRes.data?.title ?? "Quem Somos"}
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Texto principal + Missão/Visão/Valores */}
            <div className="lg:col-span-2">
              {body ? (
                <div
                  className="prose prose-sm prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              ) : (
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    A <strong>Turatti</strong> é uma empresa com décadas de atuação no mercado, reconhecida
                    pela qualidade dos seus produtos e pela excelência no atendimento aos clientes.
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    Edite este texto no painel administrativo em Páginas → Quem Somos.
                  </p>
                </div>
              )}

              {/* Missão / Visão / Valores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
                {[
                  { label: "Missão",  text: missao  },
                  { label: "Visão",   text: visao   },
                  { label: "Valores", text: valores },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-primary pl-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{item.label}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Destaque anos */}
              <div className="bg-primary p-6 rounded-lg">
                <p className="text-4xl font-black text-white leading-none">+{anosRaw}</p>
                <p className="text-sm text-white/80 mt-1">anos de mercado</p>
              </div>

              {/* Nossos Pilares */}
              <div className="bg-white border border-gray-100 p-5 rounded-lg">
                <h2 className="text-sm font-bold text-gray-900 mb-4">Nossos Pilares</h2>
                <ul className="space-y-3">
                  {pilares.map((v, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} weight="fill" className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{v.title}</p>
                        <p className="text-xs text-gray-500">{v.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CtaComercialSection whatsapp={whatsapp} />
    </>
  );
}
