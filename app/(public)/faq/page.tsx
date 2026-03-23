import { createClient } from "@/lib/supabase/server";
import { CtaComercialSection } from "@/components/public/home/cta-comercial-section";
import { FaqAccordion } from "@/components/public/faq/faq-accordion";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("institutional_pages")
    .select("seo_title, seo_desc")
    .eq("slug", "faq")
    .maybeSingle();
  return {
    title: data?.seo_title ?? "Perguntas Frequentes | Turatti",
    description:
      data?.seo_desc ??
      "Tire suas dúvidas sobre produtos, orçamentos, prazo de entrega e atendimento da Turatti. Respostas rápidas e diretas.",
  };
}

const faqDefault = [
  {
    q: "Como faço para solicitar um orçamento?",
    a: "Entre em contato pelo WhatsApp, telefone ou formulário de contato. Nossa equipe responde em até 1 dia útil com uma proposta personalizada.",
  },
  {
    q: "Vocês atendem empresas (B2B)?",
    a: "Sim! Atendemos tanto pessoa física quanto jurídica. Para empresas, temos condições especiais de pagamento e suporte dedicado.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "O prazo varia conforme o produto e a região. Consulte nossa equipe para informações específicas sobre o item de seu interesse.",
  },
  {
    q: "Posso visitar uma loja para ver os produtos pessoalmente?",
    a: "Claro! Temos showrooms com consultores especializados. Acesse 'Nossas Lojas' para encontrar a unidade mais próxima e os horários de atendimento.",
  },
  {
    q: "Vocês oferecem garantia nos produtos?",
    a: "Todos os produtos seguem a garantia do fabricante. Para mais detalhes, consulte a página do produto ou fale com nossos consultores.",
  },
  {
    q: "Como funciona o atendimento consultivo?",
    a: "Nossos consultores analisam sua necessidade e indicam o produto mais adequado. O atendimento pode ser feito por WhatsApp, telefone ou pessoalmente.",
  },
];

export default async function FaqPage() {
  const supabase = await createClient();

  const [pageRes, settingsRes] = await Promise.all([
    supabase
      .from("institutional_pages")
      .select("title, content")
      .eq("slug", "faq")
      .maybeSingle(),
    supabase.from("settings").select("key, value").eq("key", "whatsapp").maybeSingle(),
  ]);

  const whatsapp = (settingsRes.data?.value as string) ?? "";
  const rawContent = pageRes.data?.content as { faq?: { q: string; a: string }[] } | null;
  const faqs = rawContent?.faq ?? faqDefault;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="h-1 w-full bg-primary" />
      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Dúvidas
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            {pageRes.data?.title ?? "Perguntas Frequentes"}
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />

          <div className="mt-12 bg-gray-50 border border-gray-100 p-6 text-center rounded-lg">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Não encontrou a resposta?
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Nossa equipe está pronta para te ajudar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Tenho uma dúvida.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1dbc5a] transition-colors rounded-md"
                >
                  Falar no WhatsApp
                </a>
              )}
              <a
                href="/contato"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-md"
              >
                Formulário de contato
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaComercialSection whatsapp={whatsapp} />
    </>
  );
}
