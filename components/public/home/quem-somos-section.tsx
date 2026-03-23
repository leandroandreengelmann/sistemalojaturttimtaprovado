import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";

const DEFAULT_BULLETS = [
  "Décadas de experiência no mercado",
  "Equipe técnica especializada",
  "Atendimento consultivo e personalizado",
  "Parceria com as melhores marcas",
];

interface QuemSomosSectionProps {
  badge?: string;
  titulo?: string;
  texto?: string;
  bullets?: string[];
  anos?: string;
  imageUrl?: string;
}

export function QuemSomosSection({
  badge   = "Nossa história",
  titulo  = "Tradição e expertise que fazem a diferença",
  texto   = "A Turatti é referência no mercado há décadas, oferecendo produtos de alta qualidade com atendimento consultivo. Nossa equipe de especialistas está sempre pronta para indicar a solução certa para o seu negócio.",
  bullets = DEFAULT_BULLETS,
  anos    = "20",
  imageUrl,
}: QuemSomosSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Bloco visual */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] bg-primary/5 border border-primary/10 relative overflow-hidden rounded-lg">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20" />
              {imageUrl ? (
                <Image src={imageUrl} alt="Quem Somos" fill className="object-cover" unoptimized />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-black text-primary/10 tracking-tighter leading-none">
                      TURATTI
                    </p>
                    <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">
                      Adicione uma imagem em Admin → Conteúdo
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white border border-gray-100 shadow-md p-5 w-44 rounded-lg">
              <p className="text-3xl font-black text-primary leading-none">+{anos}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">anos de mercado</p>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="order-1 lg:order-2">
            <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {badge}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-5">
              {titulo}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-sm">
              {texto}
            </p>

            <ul className="space-y-3 mb-8">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle size={18} weight="fill" className="text-primary shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/quem-somos"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors rounded-md"
            >
              Saiba mais sobre nós
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
