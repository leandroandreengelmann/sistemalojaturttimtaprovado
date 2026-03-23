"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWhatsapp } from "@/components/public/whatsapp-provider";
import { usePathname } from "next/navigation";
import {
  List,
  X,
  MagnifyingGlass,
  CaretDown,
  CaretRight,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react";

interface Category {
  id: string;
  name: string;
  slug: string;
  children?: { id: string; name: string; slug: string }[];
}

interface HeaderProps {
  categories: Category[];
  whatsapp: string;
  logoUrl?: string;
  siteName?: string;
}

export function Header({ categories, whatsapp, logoUrl, siteName = "TURATTI" }: HeaderProps) {
  const { open: openWhatsapp } = useWhatsapp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());

  function toggleCat(id: string) {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const whatsappHref = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Olá%2C%20gostaria%20de%20falar%20com%20um%20vendedor.`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={240}
                  height={64}
                  className="h-14 w-auto object-contain"
                />
              ) : (
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  {siteName.toUpperCase()}
                </span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-sm"
              >
                Início
              </Link>

              {/* Catálogo com mega menu */}
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-expanded={megaOpen}
                >
                  Catálogo
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega Menu */}
                {megaOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-2 w-[640px]">
                    <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
                      <div className="grid grid-cols-3 gap-6">
                        {categories.map((cat) => (
                          <div key={cat.id}>
                            <Link
                              href={`/categoria/${cat.slug}`}
                              className="block text-sm font-semibold text-gray-900 hover:text-primary mb-2 transition-colors"
                            >
                              {cat.name}
                            </Link>
                            {cat.children && cat.children.length > 0 && (
                              <ul className="space-y-1">
                                {cat.children.map((sub) => (
                                  <li key={sub.id}>
                                    <Link
                                      href={`/categoria/${sub.slug}`}
                                      className="text-xs text-gray-500 hover:text-primary transition-colors"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                        <div className="col-span-3 pt-4 border-t border-gray-100">
                          <Link
                            href="/loja"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Ver todos os produtos →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/quem-somos"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-sm"
              >
                Quem Somos
              </Link>
              <Link
                href="/nossas-lojas"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-sm"
              >
                Nossas Lojas
              </Link>
              <Link
                href="/contato"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-sm"
              >
                Contato
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/busca"
                aria-label="Buscar"
                className="p-2 text-gray-500 hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <MagnifyingGlass size={20} />
              </Link>
              <button
                onClick={openWhatsapp}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary/90 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <PhoneCall size={16} weight="bold" />
                Falar com Vendedor
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-1">
              <Link
                href="/busca"
                aria-label="Buscar"
                className="p-3 text-gray-500 hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <MagnifyingGlass size={20} />
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
                className="p-3 text-gray-700 hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {mobileOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white animate-slideDown">
            <nav
              className="max-w-7xl mx-auto px-4 py-3 flex flex-col overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              {/* Início */}
              <Link
                href="/"
                className="flex items-center px-3 min-h-[48px] text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Início
              </Link>

              {/* Catálogo — accordion */}
              <div>
                <button
                  onClick={() => setCatalogOpen((v) => !v)}
                  className="flex items-center justify-between w-full px-3 min-h-[48px] text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Catálogo
                  <CaretDown
                    size={16}
                    weight="bold"
                    className={`transition-transform duration-200 ${catalogOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {catalogOpen && (
                  <div className="ml-3 border-l-2 border-gray-100 pl-3 mb-1 space-y-0.5">
                    {categories.map((cat) => (
                      <div key={cat.id}>
                        {/* Categoria pai */}
                        <div className="flex items-center">
                          <Link
                            href={`/categoria/${cat.slug}`}
                            className="flex-1 flex items-center min-h-[44px] px-2 text-sm font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                          >
                            {cat.name}
                          </Link>
                          {cat.children && cat.children.length > 0 && (
                            <button
                              onClick={() => toggleCat(cat.id)}
                              className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary transition-colors rounded-md"
                              aria-label={expandedCats.has(cat.id) ? "Recolher" : "Expandir"}
                            >
                              <CaretRight
                                size={13}
                                weight="bold"
                                className={`transition-transform duration-200 ${expandedCats.has(cat.id) ? "rotate-90" : ""}`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Subcategorias */}
                        {cat.children && cat.children.length > 0 && expandedCats.has(cat.id) && (
                          <div className="ml-3 border-l border-gray-100 pl-3 space-y-0.5 mb-1">
                            {cat.children.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/categoria/${sub.slug}`}
                                className="flex items-center min-h-[40px] px-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Ver todos */}
                    <Link
                      href="/loja"
                      className="flex items-center gap-1.5 min-h-[44px] px-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-md transition-colors"
                    >
                      Ver todos os produtos
                      <CaretRight size={12} weight="bold" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Outras páginas */}
              <Link
                href="/quem-somos"
                className="flex items-center px-3 min-h-[48px] text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Quem Somos
              </Link>
              <Link
                href="/nossas-lojas"
                className="flex items-center px-3 min-h-[48px] text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Nossas Lojas
              </Link>
              <Link
                href="/contato"
                className="flex items-center px-3 min-h-[48px] text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Contato
              </Link>

              {/* CTA */}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <button
                  onClick={openWhatsapp}
                  className="flex items-center justify-center gap-2 w-full px-4 min-h-[52px] bg-primary text-white text-base font-semibold rounded-lg hover:bg-primary/90 transition-all active:scale-95"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  Falar com um Vendedor
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
