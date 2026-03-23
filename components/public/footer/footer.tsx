import Link from "next/link";
import Image from "next/image";
import {
  InstagramLogo,
  FacebookLogo,
  WhatsappLogo,
  Envelope,
  Phone,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

interface FooterProps {
  siteName: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  logoUrl?: string;
}

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/loja" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossas Lojas", href: "/nossas-lojas" },
  { label: "Contato", href: "/contato" },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "FAQ", href: "/faq" },
];

export function Footer({ siteName, whatsapp, email, instagram, facebook, logoUrl }: FooterProps) {
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Olá%2C%20gostaria%20de%20falar%20com%20um%20vendedor.`;

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={160}
                  height={40}
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <span className="text-2xl font-bold tracking-tight text-white">
                  {siteName.toUpperCase()}
                </span>
              )}
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Qualidade e tradição em cada produto. Fale com um de nossos especialistas
              e encontre a solução ideal.
            </p>
            <div className="flex items-center gap-2">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <InstagramLogo size={20} weight="fill" />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <FacebookLogo size={20} weight="fill" />
                </a>
              )}
              {whatsapp && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <WhatsappLogo size={20} weight="fill" />
                </a>
              )}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">
              Informações
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              {whatsapp && (
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-white transition-colors py-1.5 min-h-[44px]"
                  >
                    <WhatsappLogo size={16} className="shrink-0 text-[#25D366]" />
                    {whatsapp}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm hover:text-white transition-colors py-1.5 min-h-[44px]"
                  >
                    <Envelope size={16} className="shrink-0" />
                    {email}
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/nossas-lojas"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors py-1.5 min-h-[44px]"
                >
                  <MapPin size={16} className="shrink-0" />
                  Ver nossas lojas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {year} {siteName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
