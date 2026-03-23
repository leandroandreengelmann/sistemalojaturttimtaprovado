"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sun, Moon, Monitor } from "@phosphor-icons/react"

export default function DarkModePage() {
  const { theme, setTheme } = useTheme()

  const tokenMappings = [
    { token: "--background",        light: "#ffffff",   dark: "#0a0a0a",   role: "Fundo da página" },
    { token: "--foreground",        light: "#0f0f0f",   dark: "#fafafa",   role: "Texto principal" },
    { token: "--card",              light: "#ffffff",   dark: "#111111",   role: "Fundo de cards" },
    { token: "--card-foreground",   light: "#0f0f0f",   dark: "#fafafa",   role: "Texto em cards" },
    { token: "--primary",           light: "#7c3aed",   dark: "#8b5cf6",   role: "Ação principal" },
    { token: "--primary-foreground",light: "#ffffff",   dark: "#ffffff",   role: "Texto sobre primary" },
    { token: "--secondary",         light: "#f4f4f5",   dark: "#27272a",   role: "Ações secundárias" },
    { token: "--muted",             light: "#f9f9f9",   dark: "#18181b",   role: "Fundos sutis" },
    { token: "--muted-foreground",  light: "#71717a",   dark: "#a1a1aa",   role: "Textos de suporte" },
    { token: "--border",            light: "#e4e4e7",   dark: "#27272a",   role: "Bordas e divisores" },
    { token: "--input",             light: "#e4e4e7",   dark: "#27272a",   role: "Borda de inputs" },
    { token: "--sidebar",           light: "#fafafa",   dark: "#0d0d0d",   role: "Fundo da sidebar" },
    { token: "--success",           light: "#16a34a",   dark: "#22c55e",   role: "Estado de sucesso" },
    { token: "--warning",           light: "#d97706",   dark: "#f59e0b",   role: "Estado de aviso" },
    { token: "--destructive",       light: "#dc2626",   dark: "#ef4444",   role: "Estado de erro" },
    { token: "--info",              light: "#2563eb",   dark: "#3b82f6",   role: "Estado informativo" },
  ]

  const principles = [
    { icon: "🌗", title: "Não inverter, adaptar",   body: "Dark mode não é só inverter cores. Superfícies ficam mais escuras, não brancas sobre preto puro. Use cinzas quentes/frios em vez de #000000." },
    { icon: "💡", title: "Reduzir luminosidade",    body: "Cores vibrantes no dark mode precisam ter luminosidade menor — evite saturação excessiva que cansa os olhos em ambiente escuro." },
    { icon: "🔲", title: "Elevação via luminosidade", body: "No dark mode, cards e elementos elevados são mais claros que o fundo — o contrário do light mode onde sombras indicam profundidade." },
    { icon: "⚡", title: "Transição suave",          body: "Use transition: background-color 150ms, color 150ms no :root para evitar flash ao trocar temas." },
    { icon: "🖼️", title: "Imagens e ícones",       body: "Ícones coloridos podem precisar de ajuste. Imagens com fundo branco ficam estranhas — considere border-radius e background sutis." },
    { icon: "🔋", title: "OLED-friendly",            body: "Telas OLED exibem preto verdadeiro como pixels apagados, economizando bateria. Use #000000 ou próximo para fundos em apps mobile." },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Dark Mode</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Temas claro e escuro implementados com CSS custom properties e next-themes.
          Tokens semânticos garantem que os componentes se adaptam automaticamente.
        </p>
      </div>

      {/* Toggle */}
      <section className="mb-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Trocar tema agora</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { value: "light",  label: "Claro",   icon: Sun },
            { value: "dark",   label: "Escuro",  icon: Moon },
            { value: "system", label: "Sistema", icon: Monitor },
          ].map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={theme === value ? "default" : "outline"}
              onClick={() => setTheme(value)}
              className="gap-2"
            >
              <Icon size={16} weight={theme === value ? "fill" : "regular"} />
              {label}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Tema atual: <strong className="text-foreground">{theme}</strong> — salvo em cookie para persistir entre visitas.
        </p>
      </section>

      {/* Preview side-by-side */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Comparativo Light / Dark</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Light */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sun size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Light</span>
            </div>
            <div className="rounded-xl border overflow-hidden" style={{ background: "#ffffff", borderColor: "#e4e4e7" }}>
              <div className="p-5 space-y-4">
                <div style={{ color: "#0f0f0f" }}>
                  <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>Card título</p>
                  <p style={{ fontSize: "13px", color: "#71717a" }}>Descrição secundária do card.</p>
                </div>
                <div className="space-y-2">
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#0f0f0f", marginBottom: "4px" }}>Campo</div>
                  <div style={{ border: "1px solid #e4e4e7", borderRadius: "6px", padding: "8px 12px", fontSize: "13px", color: "#0f0f0f", background: "#ffffff" }}>
                    valor de exemplo
                  </div>
                </div>
                <div className="flex gap-2">
                  <div style={{ background: "#7c3aed", color: "#fff", padding: "6px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: 500 }}>
                    Primary
                  </div>
                  <div style={{ background: "#f4f4f5", color: "#0f0f0f", padding: "6px 16px", borderRadius: "6px", fontSize: "13px", border: "1px solid #e4e4e7" }}>
                    Secondary
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Moon size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Dark</span>
            </div>
            <div className="rounded-xl border overflow-hidden" style={{ background: "#111111", borderColor: "#27272a" }}>
              <div className="p-5 space-y-4">
                <div>
                  <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px", color: "#fafafa" }}>Card título</p>
                  <p style={{ fontSize: "13px", color: "#a1a1aa" }}>Descrição secundária do card.</p>
                </div>
                <div className="space-y-2">
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#fafafa", marginBottom: "4px" }}>Campo</div>
                  <div style={{ border: "1px solid #27272a", borderRadius: "6px", padding: "8px 12px", fontSize: "13px", color: "#fafafa", background: "#18181b" }}>
                    valor de exemplo
                  </div>
                </div>
                <div className="flex gap-2">
                  <div style={{ background: "#8b5cf6", color: "#fff", padding: "6px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: 500 }}>
                    Primary
                  </div>
                  <div style={{ background: "#27272a", color: "#fafafa", padding: "6px 16px", borderRadius: "6px", fontSize: "13px", border: "1px solid #3f3f46" }}>
                    Secondary
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token mapping */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Mapeamento de Tokens</h2>
        <p className="text-sm text-muted-foreground mb-5">Cada token semântico tem um valor diferente em cada tema. Os componentes nunca referenciam cores brutas.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Token</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Light</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dark</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Papel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tokenMappings.map((t) => (
                <tr key={t.token} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">{t.token}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-border/50 shrink-0" style={{ background: t.light }} />
                      <code className="text-xs font-mono text-muted-foreground">{t.light}</code>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-border/50 shrink-0" style={{ background: t.dark }} />
                      <code className="text-xs font-mono text-muted-foreground">{t.dark}</code>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{t.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementação */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Como está implementado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/40">
              <p className="text-xs font-mono text-muted-foreground">globals.css</p>
            </div>
            <pre className="text-xs font-mono text-foreground p-4 overflow-x-auto leading-relaxed">{`:root {
  --background: #ffffff;
  --foreground: #0f0f0f;
  --primary: #7c3aed;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --primary: #8b5cf6;
}`}</pre>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/40">
              <p className="text-xs font-mono text-muted-foreground">layout.tsx</p>
            </div>
            <pre className="text-xs font-mono text-foreground p-4 overflow-x-auto leading-relaxed">{`import { ThemeProvider } from "@/lib/theme-provider"

export default function Layout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}</pre>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/40">
              <p className="text-xs font-mono text-muted-foreground">Usar tokens em componentes</p>
            </div>
            <pre className="text-xs font-mono text-foreground p-4 overflow-x-auto leading-relaxed">{`{/* ✓ Correto — usa token semântico */}
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Ação
  </button>
</div>

{/* ✗ Errado — cor fixa não se adapta */}
<div style={{ background: "#ffffff" }}>
  <button style={{ background: "#7c3aed" }}>
    Ação
  </button>
</div>`}</pre>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/40">
              <p className="text-xs font-mono text-muted-foreground">theme-toggle.tsx</p>
            </div>
            <pre className="text-xs font-mono text-foreground p-4 overflow-x-auto leading-relaxed">{`"use client"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() =>
      setTheme(theme === "dark" ? "light" : "dark")
    }>
      Toggle
    </button>
  )
}`}</pre>
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-5">Princípios de Dark Mode</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-4 flex gap-3">
              <span className="text-xl shrink-0">{p.icon}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
