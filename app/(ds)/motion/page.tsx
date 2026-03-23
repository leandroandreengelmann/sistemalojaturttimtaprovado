"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MotionPage() {
  const [playing, setPlaying] = useState<string | null>(null)

  function play(key: string) {
    setPlaying(null)
    setTimeout(() => setPlaying(key), 10)
  }

  const durations = [
    { token: "duration-75",  value: "75ms",  usage: "Micro-feedback: checkbox check, toggle switch" },
    { token: "duration-100", value: "100ms", usage: "Tooltips, dropdowns aparecem" },
    { token: "duration-150", value: "150ms", usage: "Hover states, focus rings — padrão" },
    { token: "duration-200", value: "200ms", usage: "Modais, popovers, sheets" },
    { token: "duration-300", value: "300ms", usage: "Accordions, colapsáveis, drawers" },
    { token: "duration-500", value: "500ms", usage: "Page transitions, loading states" },
    { token: "duration-700", value: "700ms", usage: "Onboarding, celebrações (use com cuidado)" },
  ]

  const easings = [
    { name: "ease-in",     css: "cubic-bezier(0.4, 0, 1, 1)",    description: "Objetos saindo de cena", color: "bg-blue-500" },
    { name: "ease-out",    css: "cubic-bezier(0, 0, 0.2, 1)",    description: "Objetos entrando — mais natural", color: "bg-primary" },
    { name: "ease-in-out", css: "cubic-bezier(0.4, 0, 0.2, 1)", description: "Transições de estado (padrão UI)", color: "bg-success" },
    { name: "linear",      css: "linear",                         description: "Loops, spinners, progresso", color: "bg-warning" },
  ]

  const animations = [
    { key: "fade",    label: "Fade In",     tailwind: "animate-in fade-in-0",                          desc: "Tooltips, popovers" },
    { key: "scale",   label: "Scale In",    tailwind: "animate-in zoom-in-95",                          desc: "Modais, dialogs" },
    { key: "slide-t", label: "Slide Down",  tailwind: "animate-in slide-in-from-top-2",                 desc: "Dropdowns, menus" },
    { key: "slide-b", label: "Slide Up",    tailwind: "animate-in slide-in-from-bottom-2",              desc: "Sheets, mobile nav" },
    { key: "slide-r", label: "Slide Left",  tailwind: "animate-in slide-in-from-right-4",               desc: "Sidesheets, drawers" },
    { key: "combo",   label: "Fade + Scale",tailwind: "animate-in fade-in-0 zoom-in-95",               desc: "Padrão recomendado" },
  ]

  const principles = [
    { title: "Movimento tem propósito",       body: "Não anime por animar. Cada animação deve comunicar algo: estado, hierarquia ou feedback." },
    { title: "Respeite prefers-reduced-motion", body: "Sempre suporte @media (prefers-reduced-motion: reduce). Use transition: none para usuários sensíveis." },
    { title: "Entrada é ease-out, saída é ease-in", body: "Objetos chegam devagar (ease-out) e saem rápidos (ease-in). Simula física real." },
    { title: "Duração proporcional à distância", body: "Elementos que viajam mais precisam de mais tempo. Modais > tooltips." },
    { title: "Nunca bloqueie interação",       body: "Animações não devem impedir o usuário de agir. Use pointer-events-none durante transições curtas." },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Motion</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Animações e transições que comunicam estado, orientam atenção e tornam a interface mais viva —
          sem sacrificar performance ou acessibilidade.
        </p>
      </div>

      {/* Princípios */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Princípios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {principles.map((p, i) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded mt-0.5 shrink-0">0{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Durations */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Duração</h2>
        <p className="text-sm text-muted-foreground mb-5">Escala de tempo — mantenha consistência para criar ritmo previsível.</p>
        <div className="space-y-3">
          {durations.map((d) => (
            <div key={d.token} className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card">
              <code className="text-xs font-mono text-muted-foreground w-28 shrink-0">{d.token}</code>
              <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${Math.min((parseInt(d.value) / 700) * 100, 100)}%` }}
                />
              </div>
              <code className="text-xs font-mono text-foreground w-14 shrink-0">{d.value}</code>
              <p className="text-xs text-muted-foreground">{d.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Easings */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Easing</h2>
        <p className="text-sm text-muted-foreground mb-5">Curvas de aceleração — determinam a personalidade do movimento.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {easings.map((e) => (
            <div key={e.name} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">{e.name}</p>
                <Badge variant="outline" className="font-mono text-[9px]">{e.css.substring(0, 22)}{e.css.length > 22 ? "…" : ""}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{e.description}</p>
              <div
                className="h-1 bg-muted rounded-full overflow-hidden cursor-pointer"
                onClick={() => play(e.name)}
                title="Clique para animar"
              >
                <div
                  key={playing === e.name ? Date.now() : 0}
                  className={`h-full w-1/3 ${e.color} rounded-full`}
                  style={{
                    transform: playing === e.name ? "translateX(200%)" : "translateX(0%)",
                    transition: playing === e.name ? `transform 600ms ${e.css}` : "none",
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Clique na barra para visualizar</p>
            </div>
          ))}
        </div>
      </section>

      {/* Animações */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Animações de Entrada</h2>
        <p className="text-sm text-muted-foreground mb-5">Classes Tailwind via <code className="font-mono text-xs bg-muted px-1 rounded">tw-animate-css</code>. Clique para reproduzir.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {animations.map((a) => (
            <button
              key={a.key}
              onClick={() => play(a.key)}
              className="rounded-xl border border-border bg-card p-4 text-left hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <div className="h-16 flex items-center justify-center mb-3 overflow-hidden">
                {playing === a.key && (
                  <div
                    key={Date.now()}
                    className={`h-8 w-8 rounded-lg bg-primary ${a.tailwind} duration-200`}
                  />
                )}
                {playing !== a.key && (
                  <div className="h-8 w-8 rounded-lg bg-muted" />
                )}
              </div>
              <p className="text-sm font-semibold text-foreground">{a.label}</p>
              <code className="text-xs font-mono text-muted-foreground block mt-0.5 truncate">{a.tailwind}</code>
              <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Reduced Motion */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Acessibilidade — Reduced Motion</h2>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-warning/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-warning text-base">⚠</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Sempre respeite a preferência do sistema</p>
              <p className="text-xs text-muted-foreground mt-1">Usuários com epilepsia fotossensível ou tontura podem desativar animações no SO.</p>
            </div>
          </div>
          <pre className="text-xs font-mono bg-muted px-4 py-3 rounded-lg text-foreground overflow-x-auto">{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</pre>
          <p className="text-xs text-muted-foreground mt-3">
            O Tailwind inclui o modificador <code className="font-mono bg-muted px-1 rounded">motion-reduce:</code> para desativar classes específicas.
          </p>
        </div>
      </section>

      {/* Tabela de referência */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-5">Referência Rápida</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Componente</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duração</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Easing</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Animação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { comp: "Tooltip",      dur: "100ms", ease: "ease-out",    anim: "fade-in + zoom-in-95" },
                { comp: "Dropdown",     dur: "100ms", ease: "ease-out",    anim: "fade-in + slide-in-from-top-2" },
                { comp: "Dialog",       dur: "150ms", ease: "ease-out",    anim: "fade-in + zoom-in-95" },
                { comp: "Sheet",        dur: "200ms", ease: "ease-out",    anim: "fade-in + slide-in-from-right" },
                { comp: "Accordion",    dur: "200ms", ease: "ease-in-out", anim: "accordion-down / up" },
                { comp: "Toast",        dur: "300ms", ease: "ease-out",    anim: "slide-in-from-bottom" },
                { comp: "Page Transition",dur:"300ms",ease: "ease-in-out", anim: "fade-in" },
              ].map((r) => (
                <tr key={r.comp} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{r.comp}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.dur}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.ease}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.anim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
