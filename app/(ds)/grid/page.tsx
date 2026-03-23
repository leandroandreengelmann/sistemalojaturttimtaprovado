const containers = [
  { name: "max-w-sm",   px: "384px",   use: "Auth forms, modals estreitos" },
  { name: "max-w-md",   px: "448px",   use: "Formulários, cards de detalhe" },
  { name: "max-w-lg",   px: "512px",   use: "Dialogs, painéis laterais" },
  { name: "max-w-xl",   px: "576px",   use: "Artigos, texto de leitura" },
  { name: "max-w-2xl",  px: "672px",   use: "Conteúdo principal com sidebar" },
  { name: "max-w-3xl",  px: "768px",   use: "Conteúdo rico, documentação" },
  { name: "max-w-4xl",  px: "896px",   use: "Layouts de página padrão" },
  { name: "max-w-5xl",  px: "1024px",  use: "Dashboards, este design system" },
  { name: "max-w-6xl",  px: "1152px",  use: "Layouts wide com múltiplas colunas" },
  { name: "max-w-7xl",  px: "1280px",  use: "Full layout, landing pages" },
]

const columnPatterns = [
  {
    name: "Full Width",
    cols: [12],
    desc: "Uma coluna. Artigos, auth, páginas de foco.",
    classes: "grid-cols-1",
  },
  {
    name: "1/2 + 1/2",
    cols: [6, 6],
    desc: "Dois blocos iguais. Comparações, side-by-side.",
    classes: "grid-cols-2",
  },
  {
    name: "1/3 + 2/3",
    cols: [4, 8],
    desc: "Sidebar + conteúdo principal. Layout clássico.",
    classes: "grid-cols-3",
  },
  {
    name: "1/4 + 3/4",
    cols: [3, 9],
    desc: "Nav lateral fina + área de trabalho ampla.",
    classes: "grid-cols-4",
  },
  {
    name: "Três colunas",
    cols: [4, 4, 4],
    desc: "Cards de feature, pricing tiers, galeria.",
    classes: "grid-cols-3",
  },
  {
    name: "Quatro colunas",
    cols: [3, 3, 3, 3],
    desc: "Métricas, ícones, thumbnails de produto.",
    classes: "grid-cols-4",
  },
]

const layoutTemplates = [
  {
    name: "Sidebar Layout",
    desc: "Sidebar fixa + área de conteúdo. Padrão para aplicações.",
    sidebar: true,
    header: false,
  },
  {
    name: "Header + Content",
    desc: "Header fixo no topo + conteúdo rolável. Sites, blogs.",
    sidebar: false,
    header: true,
  },
  {
    name: "Full App Shell",
    desc: "Header + sidebar + conteúdo. Dashboards completos.",
    sidebar: true,
    header: true,
  },
]

export default function GridPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Grid & Layout</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Sistema de colunas, containers e templates de página para compor interfaces consistentes e responsivas.
        </p>
      </div>

      {/* Fundamentos */}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Base: 4px",    desc: "Todos os gaps e paddings são múltiplos de 4px" },
            { title: "12 Colunas",   desc: "Sistema de grade de 12 colunas com Tailwind grid" },
            { title: "Mobile First", desc: "Comece no menor breakpoint e expanda com sm:, md:, lg:" },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold text-foreground mb-1">{p.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Padrões de coluna */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Padrões de Coluna</h2>
        <div className="space-y-4">
          {columnPatterns.map((pattern) => (
            <div key={pattern.name} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground text-sm">{pattern.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{pattern.desc}</p>
                </div>
                <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded hidden sm:block">
                  {pattern.classes}
                </code>
              </div>
              {/* Visual */}
              <div className="flex gap-2 h-8">
                {pattern.cols.map((span, i) => (
                  <div
                    key={i}
                    className="rounded bg-primary/15 border border-primary/30 flex items-center justify-center"
                    style={{ flex: span }}
                  >
                    <span className="text-xs font-mono text-primary/70">{span}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Container sizes */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Containers</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Classe</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Largura máx.</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Uso recomendado</th>
              </tr>
            </thead>
            <tbody>
              {containers.map((c, i) => (
                <tr key={c.name} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                  <td className="px-4 py-3">
                    <code className="text-sm font-mono text-primary font-semibold">{c.name}</code>
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground text-sm">{c.px}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Layout templates visuais */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Templates de Layout</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {layoutTemplates.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-5">
              {/* Visual mockup */}
              <div className="rounded-lg bg-background border border-border overflow-hidden mb-4 h-32 flex flex-col">
                {t.header && (
                  <div className="h-5 bg-muted border-b border-border shrink-0" />
                )}
                <div className="flex flex-1 min-h-0">
                  {t.sidebar && (
                    <div className="w-8 bg-muted/70 border-r border-border shrink-0" />
                  )}
                  <div className="flex-1 p-2 flex flex-col gap-1.5">
                    <div className="h-2 bg-muted rounded w-3/4" />
                    <div className="h-2 bg-muted rounded w-1/2" />
                    <div className="h-2 bg-muted rounded w-2/3" />
                    <div className="flex-1 bg-muted/40 rounded mt-1" />
                  </div>
                </div>
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">{t.name}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gap scale */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Gaps de Grid</h2>
        <div className="space-y-3">
          {[
            { cls: "gap-1",  px: "4px",  use: "Ícone + label, badge group" },
            { cls: "gap-2",  px: "8px",  use: "Inline chips, botões juntos" },
            { cls: "gap-3",  px: "12px", use: "Itens de lista densa" },
            { cls: "gap-4",  px: "16px", use: "Cards em grid — padrão" },
            { cls: "gap-6",  px: "24px", use: "Seções de formulário" },
            { cls: "gap-8",  px: "32px", use: "Grids de página, seções" },
            { cls: "gap-12", px: "48px", use: "Separação de blocos principais" },
          ].map((g) => (
            <div key={g.cls} className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
              <code className="w-16 shrink-0 text-sm font-mono font-semibold text-primary">{g.cls}</code>
              <span className="w-10 shrink-0 text-sm font-mono text-muted-foreground">{g.px}</span>
              <div
                className="flex items-center"
                style={{ gap: g.px }}
              >
                {[0,1,2].map((i) => (
                  <div key={i} className="w-4 h-4 rounded-sm bg-primary/30 border border-primary/50" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground hidden sm:block">{g.use}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Regras de Grid</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Sempre definir max-width no container principal",         ok: true },
            { rule: "Centralizar com mx-auto em containers de conteúdo",       ok: true },
            { rule: "Usar gap para espaço entre items, não margin",            ok: true },
            { rule: "Layouts mobile-first: começar com grid-cols-1",           ok: true },
            { rule: "Misturar gap e margin-x no mesmo grid",                   ok: false },
            { rule: "Colunas fixas sem breakpoint (quebra em mobile)",          ok: false },
            { rule: "Usar width percentual manual (w-[33.33%])",               ok: false },
            { rule: "Padding de página diferente por seção sem motivo",        ok: false },
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
