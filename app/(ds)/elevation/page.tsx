const shadows = [
  {
    name: "shadow-xs",
    css: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    use: "Hover sutil, input focus ring",
    level: 1,
  },
  {
    name: "shadow-sm",
    css: "0 1px 3px 0 rgb(0 0 0 / 0.1),\n0 1px 2px -1px rgb(0 0 0 / 0.1)",
    use: "Cards, botões, badges",
    level: 2,
  },
  {
    name: "shadow-md",
    css: "0 4px 6px -1px rgb(0 0 0 / 0.1),\n0 2px 4px -2px rgb(0 0 0 / 0.1)",
    use: "Dropdowns, popovers",
    level: 3,
  },
  {
    name: "shadow-lg",
    css: "0 10px 15px -3px rgb(0 0 0 / 0.1),\n0 4px 6px -4px rgb(0 0 0 / 0.1)",
    use: "Menus flutuantes, cards destacados",
    level: 4,
  },
  {
    name: "shadow-xl",
    css: "0 20px 25px -5px rgb(0 0 0 / 0.1),\n0 8px 10px -6px rgb(0 0 0 / 0.1)",
    use: "Modals, drawers",
    level: 5,
  },
  {
    name: "shadow-2xl",
    css: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    use: "Overlays, side panels, fullscreen",
    level: 6,
  },
]

const zLayers = [
  { name: "Base",     value: "0",   use: "Fluxo normal do documento" },
  { name: "Raised",   value: "10",  use: "Cards elevados, sticky locais" },
  { name: "Dropdown", value: "100", use: "Select, combobox, menu contextual" },
  { name: "Sticky",   value: "200", use: "Header fixo, bottom navigation" },
  { name: "Overlay",  value: "300", use: "Backdrop de modal / drawer" },
  { name: "Modal",    value: "400", use: "Dialogs, drawers" },
  { name: "Popover",  value: "500", use: "Popovers, date pickers" },
  { name: "Toast",    value: "600", use: "Notificações toast" },
  { name: "Tooltip",  value: "700", use: "Tooltips sobre qualquer camada" },
]

export default function ElevationPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Elevação & Sombras</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Sistema de profundidade visual com 6 níveis de sombra e escala de z-index para organizar camadas da interface.
        </p>
      </div>

      {/* Princípios */}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Hierarquia",   desc: "Sombras maiores = elementos mais próximos do usuário" },
            { title: "Consistência", desc: "Use o mesmo nível de sombra para o mesmo tipo de elemento" },
            { title: "Sparingly",    desc: "Não empilhe sombras — sombra já comunica elevação" },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold text-foreground mb-1">{p.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scale de sombras */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Escala de Sombras</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shadows.map((s) => (
            <div key={s.name} className="rounded-xl border border-border bg-card p-5">
              {/* Preview */}
              <div className="flex items-center justify-center h-20 mb-5 rounded-lg bg-background">
                <div
                  className="w-16 h-16 rounded-xl bg-card border border-border"
                  style={{ boxShadow: s.css.replace(/\n/g, " ") }}
                />
              </div>
              {/* Info */}
              <code className="text-sm font-mono font-semibold text-primary">{s.name}</code>
              <p className="text-xs text-muted-foreground mt-1 mb-3">{s.use}</p>
              <pre className="text-xs font-mono text-muted-foreground bg-muted rounded-lg px-3 py-2 leading-relaxed whitespace-pre-wrap break-all">
                {s.css}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Shadow + inner */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Variações Especiais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-center h-20 mb-4 rounded-lg bg-background">
              <div
                className="w-16 h-16 rounded-xl bg-card border border-border"
                style={{ boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.06)" }}
              />
            </div>
            <code className="text-sm font-mono font-semibold text-primary">shadow-inner</code>
            <p className="text-xs text-muted-foreground mt-1">Inputs pressed, wells, áreas recuadas</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-center h-20 mb-4 rounded-lg bg-background">
              <div
                className="w-16 h-16 rounded-xl bg-card border border-border"
                style={{ boxShadow: "none" }}
              />
            </div>
            <code className="text-sm font-mono font-semibold text-primary">shadow-none</code>
            <p className="text-xs text-muted-foreground mt-1">Reset de sombra, elementos flat</p>
          </div>
        </div>
      </section>

      {/* Z-index */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Z-Index — Escala de Camadas</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Camada</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">z-index</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Uso</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Classe Tailwind</th>
              </tr>
            </thead>
            <tbody>
              {zLayers.map((z, i) => (
                <tr key={z.name} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                  <td className="px-4 py-3 font-medium text-foreground">{z.name}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-primary font-semibold">{z.value}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{z.use}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      z-[{z.value}]
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Regras de Elevação</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Use sombra para comunicar interatividade (hover, focus)", ok: true },
            { rule: "Eleve modais acima do overlay com z-index maior",         ok: true },
            { rule: "Cards estáticos podem usar apenas border sem sombra",      ok: true },
            { rule: "Combine sombras com border para dark mode",                ok: true },
            { rule: "Aplicar shadow-2xl em cards comuns de lista",              ok: false },
            { rule: "Usar z-index arbitrários (ex: z-[9999])",                  ok: false },
            { rule: "Empilhar múltiplas sombras no mesmo elemento",             ok: false },
            { rule: "Ignorar z-index em overlays (causa elementos por cima)",   ok: false },
          ].map((item) => (
            <div
              key={item.rule}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${
                item.ok ? "bg-success/10 text-foreground" : "bg-destructive/10 text-foreground"
              }`}
            >
              <span className={`text-base shrink-0 ${item.ok ? "text-success" : "text-destructive"}`}>
                {item.ok ? "✓" : "✗"}
              </span>
              {item.rule}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
