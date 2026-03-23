export default function TokensPage() {
  const colorTokens = [
    { token: "--primary",              value: "brand-600",  description: "Ação principal, CTAs" },
    { token: "--primary-foreground",   value: "white",      description: "Texto sobre primary" },
    { token: "--secondary",            value: "gray-100",   description: "Ações secundárias" },
    { token: "--secondary-foreground", value: "gray-700",   description: "Texto sobre secondary" },
    { token: "--muted",                value: "gray-50",    description: "Fundos sutis, disabled" },
    { token: "--muted-foreground",     value: "gray-500",   description: "Textos de suporte" },
    { token: "--accent",               value: "brand-50",   description: "Destaques, hover suave" },
    { token: "--accent-foreground",    value: "brand-700",  description: "Texto sobre accent" },
    { token: "--destructive",          value: "error-600",  description: "Erros, ações destrutivas" },
    { token: "--border",               value: "gray-200",   description: "Bordas e divisores" },
    { token: "--input",                value: "gray-200",   description: "Borda de inputs" },
    { token: "--ring",                 value: "brand-300",  description: "Focus ring" },
    { token: "--background",           value: "white",      description: "Fundo da página" },
    { token: "--foreground",           value: "gray-900",   description: "Texto principal" },
    { token: "--card",                 value: "white",      description: "Fundo de cards" },
    { token: "--popover",              value: "white",      description: "Fundo de popovers" },
    { token: "--sidebar",              value: "gray-25",    description: "Fundo da sidebar" },
  ]

  const semanticTokens = [
    { token: "--success", value: "green-600",   description: "Confirmações, uploads concluídos" },
    { token: "--warning", value: "warning-500", description: "Alertas, limites" },
    { token: "--info",    value: "blue-600",    description: "Informações neutras" },
  ]

  const shadowTokens = [
    { token: "shadow-xs", css: "0 1px 2px 0 rgb(0 0 0/0.05)",                                              use: "Hover sutil, focus ring" },
    { token: "shadow-sm", css: "0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1)",               use: "Cards, botões, badges" },
    { token: "shadow-md", css: "0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)",            use: "Dropdowns, popovers" },
    { token: "shadow-lg", css: "0 10px 15px -3px rgb(0 0 0/0.1), 0 4px 6px -4px rgb(0 0 0/0.1)",          use: "Menus flutuantes" },
    { token: "shadow-xl", css: "0 20px 25px -5px rgb(0 0 0/0.1), 0 8px 10px -6px rgb(0 0 0/0.1)",         use: "Modals, drawers" },
    { token: "shadow-2xl", css: "0 25px 50px -12px rgb(0 0 0/0.25)",                                       use: "Overlays, side panels" },
  ]

  const radiusTokens = [
    { token: "--radius-sm",   value: "calc(var(--radius)*0.6)", usage: "Badges pequenos, tags" },
    { token: "--radius-md",   value: "calc(var(--radius)*0.8)", usage: "Inputs, botões small" },
    { token: "--radius-lg",   value: "var(--radius)",           usage: "Cards, botões padrão" },
    { token: "--radius-xl",   value: "calc(var(--radius)*1.4)", usage: "Panels, modais" },
    { token: "--radius-2xl",  value: "calc(var(--radius)*1.8)", usage: "Dialogs, drawers" },
    { token: "--radius-3xl",  value: "calc(var(--radius)*2.2)", usage: "Elementos destacados" },
    { token: "--radius-full", value: "9999px",                  usage: "Avatares, pills" },
  ]

  const fontSizes = [
    { name: "xs",   px: "12px",    rem: "0.75rem",   usage: "Labels, badges, meta" },
    { name: "sm",   px: "14px",    rem: "0.875rem",  usage: "Textos secundários, captions" },
    { name: "base", px: "16px",    rem: "1rem",      usage: "Corpo de texto padrão" },
    { name: "lg",   px: "20px",    rem: "1.25rem",   usage: "Subtítulos, leads" },
    { name: "xl",   px: "25px",    rem: "1.563rem",  usage: "Títulos de seção h3" },
    { name: "2xl",  px: "31.25px", rem: "1.953rem",  usage: "Títulos h2" },
    { name: "3xl",  px: "39.06px", rem: "2.441rem",  usage: "Títulos h1 de página" },
    { name: "4xl",  px: "48.83px", rem: "3.052rem",  usage: "Hero titles" },
    { name: "5xl",  px: "61.04px", rem: "3.815rem",  usage: "Display / landing" },
  ]

  const spacingTokens = [
    { token: "1",  px: "4px",   use: "Ícone + label, gap interno" },
    { token: "2",  px: "8px",   use: "Padding inline, gap xs" },
    { token: "3",  px: "12px",  use: "Padding de badge, gap sm" },
    { token: "4",  px: "16px",  use: "Padding de card, gap padrão" },
    { token: "5",  px: "20px",  use: "Padding de seção sm" },
    { token: "6",  px: "24px",  use: "Padding de card grande" },
    { token: "8",  px: "32px",  use: "Gap entre seções" },
    { token: "10", px: "40px",  use: "Padding de página md" },
    { token: "12", px: "48px",  use: "Margin de seção" },
    { token: "16", px: "64px",  use: "Padding de página lg" },
    { token: "20", px: "80px",  use: "Margin de hero" },
    { token: "24", px: "96px",  use: "Espaço entre blocos grandes" },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Tokens</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Tokens de design são as variáveis CSS que conectam decisões visuais à implementação.
          Uma mudança no token reflete automaticamente em todos os componentes.
        </p>
      </div>

      {/* Como usar */}
      <section className="mb-12 p-6 rounded-xl border border-border bg-card">
        <h2 className="text-base font-semibold text-foreground mb-3">Como usar tokens</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="space-y-1">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">CSS</p>
            <code className="block text-xs font-mono bg-muted px-3 py-2 rounded-lg text-foreground">
              color: var(--primary);
            </code>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Tailwind</p>
            <code className="block text-xs font-mono bg-muted px-3 py-2 rounded-lg text-foreground">
              className="text-primary"
            </code>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Inline</p>
            <code className="block text-xs font-mono bg-muted px-3 py-2 rounded-lg text-foreground">
              {"style={{ color: 'var(--primary)' }}"}
            </code>
          </div>
        </div>
      </section>

      {/* Cores semânticas */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Cores Semânticas</h2>
        <p className="text-sm text-muted-foreground mb-5">Tokens que descrevem intenção, não valor. Use sempre estes em vez de cores brutas.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Token</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Valor base</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {colorTokens.map((t) => (
                <tr key={t.token} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{t.token}</td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-12 rounded border border-border/50" style={{ background: `var(${t.token})` }} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">{t.value}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cores de estado */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Cores de Estado</h2>
        <p className="text-sm text-muted-foreground mb-5">Feedback semântico para sucesso, alerta e informação.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Token</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Valor base</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {semanticTokens.map((t) => (
                <tr key={t.token} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{t.token}</td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-12 rounded border border-border/50" style={{ background: `var(${t.token})` }} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">{t.value}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sombras */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Sombras</h2>
        <p className="text-sm text-muted-foreground mb-5">6 níveis de elevação via box-shadow. Use classes Tailwind diretamente.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Classe</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">CSS</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shadowTokens.map((s) => (
                <tr key={s.token} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-primary font-semibold">{s.token}</td>
                  <td className="px-4 py-3">
                    <div
                      className="h-6 w-12 rounded bg-card border border-border/30"
                      style={{ boxShadow: s.css }}
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell max-w-xs truncate">{s.css}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{s.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tipografia */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Tipografia</h2>
        <p className="text-sm text-muted-foreground mb-5">Famílias de fonte e escala tipográfica (Major Third 1.25×, base 16px).</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { token: "--font-sans", value: "Inter, sans-serif",     usage: "Todo o texto UI" },
            { token: "--font-mono", value: "Geist Mono, monospace",  usage: "Código, tokens, valores" },
          ].map((t) => (
            <div key={t.token} className="rounded-xl border border-border bg-card p-4">
              <code className="text-xs font-mono text-muted-foreground">{t.token}</code>
              <p className="text-sm font-medium text-foreground mt-1">{t.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.usage}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tamanho</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">px</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">rem</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fontSizes.map((s) => (
                <tr key={s.name} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">text-{s.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.px}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">{s.rem}</td>
                  <td className="px-4 py-3">
                    <span className="text-foreground font-medium leading-none" style={{ fontSize: s.px }}>Aa</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{s.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Espaçamento */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Espaçamento</h2>
        <p className="text-sm text-muted-foreground mb-5">Grid de 4px. Todos os valores são múltiplos de 4.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Token</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">px</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visual</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {spacingTokens.map((s) => (
                <tr key={s.token} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-primary font-semibold">space-{s.token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.px}</td>
                  <td className="px-4 py-3">
                    <div className="h-3 rounded-sm bg-primary/30" style={{ width: s.px, maxWidth: "100px" }} />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{s.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Border Radius */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Border Radius</h2>
        <p className="text-sm text-muted-foreground mb-5">Escala de arredondamento baseada na variável --radius (0.5rem base).</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {radiusTokens.map((r) => (
            <div key={r.token} className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-3">
              <div
                className="h-12 w-12 bg-primary/15 border-2 border-primary/30"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <code className="text-xs font-mono text-muted-foreground block">{r.token}</code>
                <p className="text-xs text-muted-foreground mt-0.5">{r.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Export JSON */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-5">Exportar Tokens</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">tokens.json</span>
            <span className="text-xs text-muted-foreground">Design Token Community Group format</span>
          </div>
          <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto leading-relaxed">{`{
  "color": {
    "primary":     { "value": "var(--primary)",     "type": "color" },
    "secondary":   { "value": "var(--secondary)",   "type": "color" },
    "destructive": { "value": "var(--destructive)", "type": "color" },
    "success":     { "value": "var(--success)",     "type": "color" },
    "warning":     { "value": "var(--warning)",     "type": "color" },
    "info":        { "value": "var(--info)",        "type": "color" }
  },
  "shadow": {
    "sm":  { "value": "0 1px 3px 0 rgb(0 0 0/0.1)", "type": "shadow" },
    "md":  { "value": "0 4px 6px -1px rgb(0 0 0/0.1)", "type": "shadow" },
    "lg":  { "value": "0 10px 15px -3px rgb(0 0 0/0.1)", "type": "shadow" },
    "xl":  { "value": "0 20px 25px -5px rgb(0 0 0/0.1)", "type": "shadow" }
  },
  "radius": {
    "sm":   { "value": "calc(var(--radius)*0.6)", "type": "borderRadius" },
    "md":   { "value": "calc(var(--radius)*0.8)", "type": "borderRadius" },
    "lg":   { "value": "var(--radius)",           "type": "borderRadius" },
    "xl":   { "value": "calc(var(--radius)*1.4)", "type": "borderRadius" }
  },
  "font": {
    "sans": { "value": "Inter, sans-serif",     "type": "fontFamily" },
    "mono": { "value": "Geist Mono, monospace", "type": "fontFamily" }
  },
  "fontSize": {
    "xs":   { "value": "0.75rem",  "type": "dimension" },
    "sm":   { "value": "0.875rem", "type": "dimension" },
    "base": { "value": "1rem",     "type": "dimension" },
    "lg":   { "value": "1.25rem",  "type": "dimension" }
  }
}`}</pre>
        </div>
      </section>
    </div>
  )
}
