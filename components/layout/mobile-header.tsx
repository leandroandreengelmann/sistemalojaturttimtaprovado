"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SquaresFour,
  List,
  House,
  Palette,
  TextT,
  Ruler,
  Rows,
  Stack,
  CornersIn,
  Coin,
  Lightning,
  Devices,
  Moon,
  ClipboardText,
  NavigationArrow,
  Bell,
  Screencast,
  Star,
  Sparkle,
  GitBranch,
  ChartBar,
  ChatText,
  Layout,
  Wheelchair,
  X,
} from "@phosphor-icons/react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
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

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Sticky top bar — visible only on mobile */}
      <header className="lg:hidden sticky top-0 z-[200] flex items-center justify-between px-4 h-14 border-b border-border bg-sidebar/95 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center shrink-0">
            <SquaresFour size={14} weight="fill" className="text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground">Design System</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Abrir menu de navegação"
        >
          <List size={20} />
        </button>
      </header>

      {/* Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0 flex flex-col" aria-describedby={undefined}>
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>

          {/* Logo */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center shrink-0">
                <SquaresFour size={14} weight="fill" className="text-primary-foreground" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-foreground">Design System</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Fechar menu"
            >
              <X size={16} />
            </button>
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
                          onClick={() => setOpen(false)}
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
          <div className="border-t border-border px-4 py-3 flex items-center justify-between shrink-0">
            <span className="text-xs text-muted-foreground">v2.0.0</span>
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
