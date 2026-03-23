"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  Package,
  Tag,
  Image,
  FileText,
  MapPin,
  List,
  Envelope,
  SignOut,
  X,
  House,
  SlidersHorizontal,
  Storefront,
  ImagesSquare,
  Users,
  PaintBucket,
  WhatsappLogo,
} from "@phosphor-icons/react";

const navItems = [
  { label: "Dashboard",    href: "/admin",               icon: SquaresFour },
  { label: "Home",         href: "/admin/home",          icon: House },
  { label: "Carrosséis",   href: "/admin/carroseis",     icon: SlidersHorizontal },
  { label: "C. Imagens",   href: "/admin/carroseis-imagens", icon: ImagesSquare },
  { label: "Marcas",       href: "/admin/marcas",         icon: Storefront },
  { label: "Seções",       href: "/admin/secoes",          icon: SquaresFour },
  { label: "Produtos",     href: "/admin/produtos",       icon: Package },
  { label: "Categorias",   href: "/admin/categorias",     icon: Tag },
  { label: "Banners",      href: "/admin/banners",        icon: Image },
  { label: "Páginas",      href: "/admin/paginas",        icon: FileText },
  { label: "Lojas",        href: "/admin/lojas",          icon: MapPin },
  { label: "Menus",        href: "/admin/menus",          icon: List },
  { label: "Contatos",     href: "/admin/contatos",       icon: Envelope },
  { label: "Conteúdo",     href: "/admin/conteudo",       icon: FileText },
  { label: "Cores",         href: "/admin/cores",           icon: PaintBucket },
  { label: "Seções Cores",  href: "/admin/secoes-cores",    icon: PaintBucket },
  { label: "Usuários",      href: "/admin/usuarios",       icon: Users },
  { label: "WhatsApp",      href: "/admin/whatsapp",      icon: WhatsappLogo },
  { label: "Identidade",    href: "/admin/identidade",    icon: Image },
];

interface AdminSidebarProps {
  onClose?: () => void;
  logoUrl?: string | null;
}

export function AdminSidebar({ onClose, logoUrl }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin"
      ? pathname === "/admin"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 w-60">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        {logoUrl ? (
          <NextImage
            src={logoUrl}
            alt="Turatti"
            width={200}
            height={80}
            className="h-16 w-auto object-contain"
          />
        ) : (
          <p className="text-base font-bold tracking-tight text-gray-900">TURATTI</p>
        )}
        {onClose && (
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-md ${
                active
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <item.icon
                size={16}
                weight={active ? "fill" : "regular"}
                className="shrink-0"
              />
              {item.label}
              {active && (
                <span className="ml-auto w-1 h-4 bg-white/40 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <SquaresFour size={16} />
          Ver site
        </Link>
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <SignOut size={16} />
            Sair
          </button>
        </form>
      </div>
    </div>
  );
}
