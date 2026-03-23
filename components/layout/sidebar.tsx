"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  House,
  Palette,
  TextT,
  SquaresFour,
  Star,
  Ruler,
  GitBranch,
  Sparkle,
  Coin,
  Lightning,
  Devices,
  Screencast,
  Wheelchair,
  Moon,
  Stack,
  Rows,
  CornersIn,
  NavigationArrow,
  ClipboardText,
  ChartBar,
  Bell,
  ChatText,
  Layout,
} from "@phosphor-icons/react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  {
    title: "Começando",
    items: [
      { label: "Visão Geral",    href: "/",              icon: House },
    ],
  },
  {
    title: "Fundamentos",
    items: [
      { label: "Cores",          href: "/colors",        icon: Palette },
      { label: "Tipografia",     href: "/typography",    icon: TextT },
      { label: "Espaçamento",    href: "/spacing",       icon: Ruler },
      { label: "Grid & Layout",  href: "/grid",          icon: Rows },
      { label: "Elevação",       href: "/elevation",     icon: Stack },
      { label: "Bordas",         href: "/borders",       icon: CornersIn },
      { label: "Tokens",         href: "/tokens",        icon: Coin },
      { label: "Motion",         href: "/motion",        icon: Lightning },
      { label: "Breakpoints",    href: "/breakpoints",   icon: Devices },
      { label: "Dark Mode",      href: "/dark-mode",     icon: Moon },
    ],
  },
  {
    title: "Componentes",
    items: [
      { label: "Componentes",    href: "/components",    icon: SquaresFour },
      { label: "Formulários",    href: "/forms",         icon: ClipboardText },
      { label: "Navegação",      href: "/navigation",    icon: NavigationArrow },
      { label: "Feedback",       href: "/feedback",      icon: Bell },
      { label: "Estados",        href: "/states",        icon: Screencast },
      { label: "Ícones",         href: "/icons",         icon: Star },
    ],
  },
  {
    title: "UX & Padrões",
    items: [
      { label: "Princípios",     href: "/principles",    icon: Sparkle },
      { label: "Padrões",        href: "/patterns",      icon: GitBranch },
      { label: "Data Viz",       href: "/data-viz",      icon: ChartBar },
      { label: "Writing",        href: "/writing",       icon: ChatText },
      { label: "Templates",      href: "/templates",     icon: Layout },
      { label: "Acessibilidade", href: "/accessibility", icon: Wheelchair },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-sidebar h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border">
        <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center shrink-0">
          <SquaresFour size={14} weight="fill" className="text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm tracking-tight text-foreground">
          Design System
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navigation.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="px-2 mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors",
                        active
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon
                        size={15}
                        weight={active ? "fill" : "regular"}
                        className="shrink-0"
                      />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">v2.0.0</span>
        <ThemeToggle />
      </div>
    </aside>
  )
}
