import Link from "next/link";
import { WhatsappLogo, ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";

interface CtaComercialSectionProps {
  whatsapp: string;
  phone?: string;
  badge?: string;
  titulo?: string;
  subtitulo?: string;
}

export function CtaComercialSection({
  whatsapp,
  phone,
  badge     = "Pronto para comprar?",
  titulo    = "Fale com um especialista agora mesmo",
  subtitulo = "Nossa equipe está pronta para apresentar o produto certo para você. Atendimento rápido, consultivo e sem compromisso.",
}: CtaComercialSectionProps) {
  const waHref = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Olá%2C%20gostaria%20de%20falar%20com%20um%20vendedor.`;

  return (
    <section className="bg-gray-900 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            {badge}
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] mb-6">
            {titulo.includes("agora mesmo") ? (
              <>
                {titulo.replace("agora mesmo", "")}{" "}
                <span className="text-primary">agora mesmo</span>
              </>
            ) : titulo}
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl">
            {subtitulo}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white text-sm font-bold hover:bg-[#1da851] active:scale-95 transition-all rounded-md"
            >
              <WhatsappLogo size={20} weight="fill" />
              Falar pelo WhatsApp
            </a>
            <Link
              href="/contato"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 text-sm font-semibold hover:border-white hover:text-white transition-colors rounded-md"
            >
              Enviar mensagem
              <ArrowRight size={16} weight="bold" />
            </Link>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 px-6 py-4 text-gray-400 text-sm font-medium hover:text-white transition-colors"
              >
                <Phone size={16} weight="fill" />
                {phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
