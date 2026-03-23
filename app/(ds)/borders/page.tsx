const widths = [
  { name: "border-0",   px: "0px",  use: "Remove borda" },
  { name: "border",     px: "1px",  use: "Padrão — cards, inputs, tabelas" },
  { name: "border-2",   px: "2px",  use: "Foco, selecionado, destaque" },
  { name: "border-4",   px: "4px",  use: "Separador de seção, divider bold" },
  { name: "border-8",   px: "8px",  use: "Accent bar, indicador lateral" },
]

const styles = [
  { name: "border-solid",  use: "Padrão — todos os elementos de UI" },
  { name: "border-dashed", use: "Áreas de upload (drag & drop), placeholders" },
  { name: "border-dotted", use: "Separadores sutis, progresso incompleto" },
]

const radiusScale = [
  { name: "rounded-sm",   value: "calc(var(--radius) * 0.6)", use: "Badges, tags pequenas" },
  { name: "rounded-md",   value: "calc(var(--radius) * 0.8)", use: "Inputs, botões sm" },
  { name: "rounded-lg",   value: "var(--radius)",             use: "Cards, botões padrão" },
  { name: "rounded-xl",   value: "calc(var(--radius) * 1.4)", use: "Modals, panels grandes" },
  { name: "rounded-2xl",  value: "calc(var(--radius) * 1.8)", use: "Hero cards, imagens" },
  { name: "rounded-3xl",  value: "calc(var(--radius) * 2.2)", use: "Avatars grandes, ilustrações" },
  { name: "rounded-full", value: "9999px",                    use: "Avatars, pills, toggles" },
]

export default function BordersPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Bordas</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Espessuras, estilos e raios de borda para definir contornos e separadores consistentes no sistema.
        </p>
      </div>

      {/* Border Widths */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Espessura</h2>
        <div className="space-y-3">
          {widths.map((w) => (
            <div key={w.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
              {/* Preview */}
              <div className="w-16 h-10 flex items-center justify-center shrink-0 bg-background rounded-lg">
                <div
                  className="w-8 h-8 rounded border-primary bg-transparent"
                  style={{ borderWidth: w.px, borderStyle: "solid", borderColor: "var(--primary)" }}
                />
              </div>
              {/* Code */}
              <code className="w-28 shrink-0 text-sm font-mono font-semibold text-primary">{w.name}</code>
              {/* Px */}
              <span className="w-10 shrink-0 text-sm font-mono text-muted-foreground">{w.px}</span>
              {/* Use */}
              <span className="text-sm text-muted-foreground">{w.use}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Border Styles */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Estilos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {styles.map((s) => (
            <div key={s.name} className="rounded-xl border border-border bg-card p-5">
              {/* Preview */}
              <div
                className="h-16 rounded-lg mb-4 bg-background flex items-center justify-center"
              >
                <div
                  className="w-28 h-10 rounded-lg bg-card"
                  style={{ border: `2px ${s.name.replace("border-", "")} var(--primary)` }}
                />
              </div>
              <code className="text-sm font-mono font-semibold text-primary">{s.name}</code>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Border Radius</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {radiusScale.map((r) => (
            <div key={r.name} className="rounded-xl border border-border bg-card p-4">
              {/* Preview */}
              <div className="flex items-center justify-center h-16 mb-3 bg-background rounded-lg">
                <div
                  className="w-12 h-12 bg-primary/20 border-2 border-primary"
                  style={{ borderRadius: r.value }}
                />
              </div>
              <code className="text-xs font-mono font-semibold text-primary">{r.name}</code>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.use}</p>
            </div>
          ))}
          {/* rounded-none */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-center h-16 mb-3 bg-background rounded-lg">
              <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-none" />
            </div>
            <code className="text-xs font-mono font-semibold text-primary">rounded-none</code>
            <p className="text-xs text-muted-foreground mt-1">Tabelas, imagens full-bleed</p>
          </div>
        </div>
      </section>

      {/* Divisores */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Divisores & Separadores</h2>
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          {/* Horizontal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Horizontal</p>
            <div className="space-y-4">
              <div>
                <hr className="border-border" />
                <p className="text-xs text-muted-foreground mt-1.5 font-mono">border-t border-border</p>
              </div>
              <div>
                <hr className="border-border border-dashed" />
                <p className="text-xs text-muted-foreground mt-1.5 font-mono">border-t border-dashed border-border</p>
              </div>
              <div>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <p className="text-xs text-muted-foreground mt-1.5 font-mono">bg-gradient via-border (fade)</p>
              </div>
            </div>
          </div>
          {/* Vertical */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Vertical</p>
            <div className="flex items-center gap-4 h-12">
              <span className="text-sm text-muted-foreground">Item A</span>
              <div className="w-px h-full bg-border" />
              <span className="text-sm text-muted-foreground">Item B</span>
              <div className="w-px h-full bg-border border-dashed" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 8px)" }} />
              <span className="text-sm text-muted-foreground">Item C</span>
            </div>
          </div>
        </div>
      </section>

      {/* Uso com cor */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Bordas Semânticas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Default",     cls: "border-border",      bg: "bg-card" },
            { label: "Primary",     cls: "border-primary",     bg: "bg-primary/5" },
            { label: "Success",     cls: "border-success",     bg: "bg-success/5" },
            { label: "Destructive", cls: "border-destructive", bg: "bg-destructive/5" },
            { label: "Warning",     cls: "border-warning",     bg: "bg-warning/5" },
            { label: "Info",        cls: "border-info",        bg: "bg-info/5" },
            { label: "Muted",       cls: "border-muted",       bg: "bg-muted/30" },
            { label: "Focus Ring",  cls: "border-ring",        bg: "bg-card" },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg border-2 p-3 ${item.cls} ${item.bg}`}
            >
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <code className="text-xs font-mono text-muted-foreground">{item.cls}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Regras de Borda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Use border-border como cor padrão de todas as bordas",   ok: true },
            { rule: "Borda de foco sempre com border-ring (acessibilidade)",  ok: true },
            { rule: "Radius consistente por tipo: card=lg, input=md, badge=sm", ok: true },
            { rule: "Prefira border-dashed para áreas de upload/placeholder",  ok: true },
            { rule: "Misturar rounded-sm e rounded-2xl no mesmo componente",   ok: false },
            { rule: "Usar cor arbitrária de borda fora dos tokens semânticos", ok: false },
            { rule: "Border-8 em cards de conteúdo comuns",                    ok: false },
            { rule: "Remover borda de foco (outline-none) sem substituto",     ok: false },
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
