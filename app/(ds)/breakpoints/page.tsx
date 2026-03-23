export default function BreakpointsPage() {
  const breakpoints = [
    { name: "xs",  prefix: "(none)", px: "0px",    desc: "Mobile pequeno — base padrão, sem prefixo",     cols: 1, example: "iPhone SE, Galaxy A" },
    { name: "sm",  prefix: "sm:",   px: "640px",   desc: "Mobile grande / landscape",                     cols: 2, example: "iPhone 14, Pixel 7" },
    { name: "md",  prefix: "md:",   px: "768px",   desc: "Tablet portrait",                               cols: 2, example: "iPad Mini, Surface Go" },
    { name: "lg",  prefix: "lg:",   px: "1024px",  desc: "Tablet landscape / laptop pequeno",             cols: 3, example: "iPad Pro, MacBook Air" },
    { name: "xl",  prefix: "xl:",   px: "1280px",  desc: "Desktop padrão",                               cols: 4, example: "MacBook Pro 13, Dell 1080p" },
    { name: "2xl", prefix: "2xl:",  px: "1536px",  desc: "Desktop grande / widescreen",                  cols: 4, example: "iMac 27\", Ultrawide" },
  ]

  const patterns = [
    {
      title: "Grid responsivo",
      desc: "Colunas que crescem com o viewport",
      code: `<div className="grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-4"
>`,
    },
    {
      title: "Visibilidade condicional",
      desc: "Mostrar/ocultar elementos por breakpoint",
      code: `{/* Só em mobile */}
<div className="block sm:hidden">...</div>

{/* Só em desktop */}
<div className="hidden lg:block">...</div>

{/* Tablet e acima */}
<div className="hidden md:flex">...</div>`,
    },
    {
      title: "Tipografia responsiva",
      desc: "Tamanho de fonte que escala com o viewport",
      code: `<h1 className="
  text-2xl
  sm:text-3xl
  lg:text-[2.441rem]
  xl:text-[3.052rem]
  font-bold
">
  Título responsivo
</h1>`,
    },
    {
      title: "Padding de página",
      desc: "Espaçamento interno que aumenta em telas maiores",
      code: `<main className="
  px-4 py-6
  sm:px-6 sm:py-8
  lg:px-8
  xl:px-12
  max-w-7xl mx-auto
">`,
    },
    {
      title: "Sidebar + conteúdo",
      desc: "Layout de coluna no mobile, lado a lado no desktop",
      code: `<div className="
  flex flex-col
  lg:flex-row
  gap-6
">
  <aside className="w-full lg:w-60 shrink-0">
    ...
  </aside>
  <main className="flex-1 min-w-0">
    ...
  </main>
</div>`,
    },
    {
      title: "Navegação adaptativa",
      desc: "Hamburger no mobile, navbar no desktop",
      code: `{/* Botão mobile */}
<button className="block lg:hidden">
  <MenuIcon />
</button>

{/* Nav desktop */}
<nav className="hidden lg:flex gap-6">
  <Link href="/">Home</Link>
  ...
</nav>`,
    },
  ]

  const containerSizes = [
    { class: "max-w-sm",   px: "384px",  usage: "Formulários estreitos, cards simples" },
    { class: "max-w-md",   px: "448px",  usage: "Modais, formulários de login" },
    { class: "max-w-lg",   px: "512px",  usage: "Dialogs, painéis de configuração" },
    { class: "max-w-xl",   px: "576px",  usage: "Artigos, listas de componentes" },
    { class: "max-w-2xl",  px: "672px",  usage: "Conteúdo editorial, posts" },
    { class: "max-w-3xl",  px: "768px",  usage: "Documentação, páginas de texto" },
    { class: "max-w-4xl",  px: "896px",  usage: "Dashboards compactos" },
    { class: "max-w-5xl",  px: "1024px", usage: "Páginas de produto — padrão deste DS" },
    { class: "max-w-6xl",  px: "1152px", usage: "Dashboards ricos em dados" },
    { class: "max-w-7xl",  px: "1280px", usage: "Layouts de aplicação full-width" },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Breakpoints</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Design responsivo mobile-first. Os prefixos Tailwind aplicam estilos a partir do breakpoint
          especificado — layouts começam estreitos e expandem.
        </p>
      </div>

      {/* Mobile first */}
      <section className="mb-10 rounded-xl border border-border bg-card p-5">
        <h2 className="text-base font-semibold text-foreground mb-2">Mobile-First</h2>
        <p className="text-sm text-muted-foreground mb-3">
          No Tailwind, prefixos de breakpoint significam <strong className="text-foreground">"neste tamanho e acima"</strong>.
          A classe sem prefixo é o estilo base (mobile).
        </p>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {["p-4", "sm:p-6", "lg:p-8", "xl:p-12"].map((c, i) => (
            <span key={c} className={`px-2 py-1 rounded ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {c}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          <span className="bg-primary text-primary-foreground px-1 rounded font-mono">p-4</span> aplica em todos;
          os prefixados sobrescrevem em tamanhos maiores.
        </p>
      </section>

      {/* Escala de breakpoints */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Escala de Breakpoints</h2>
        <div className="space-y-3">
          {breakpoints.map((bp) => (
            <div key={bp.name} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <code className="text-sm font-mono font-bold text-foreground w-6">{bp.name}</code>
                <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{bp.prefix}</code>
                <code className="text-xs font-mono text-muted-foreground">{bp.px}</code>
                <span className="text-xs text-muted-foreground">{bp.example}</span>
              </div>
              {/* Barra visual */}
              <div className="relative h-2 bg-muted rounded-full mb-2 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-primary/30 rounded-full"
                  style={{ width: `${Math.min((parseInt(bp.px) / 1536) * 100, 100)}%`, minWidth: bp.px === "0px" ? "2%" : undefined }}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-primary"
                  style={{ left: `${Math.min((parseInt(bp.px) / 1536) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{bp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual comparativo */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Comparativo Visual</h2>
        <div className="rounded-xl border border-border bg-card p-5 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
              {breakpoints.filter(b => b.px !== "0px").map((bp) => {
                const pct = (parseInt(bp.px) / 1536) * 100
                return (
                  <div
                    key={bp.name}
                    className="absolute top-0 bottom-0 border-l-2 border-primary/50 flex flex-col justify-center pl-1"
                    style={{ left: `${pct}%` }}
                  >
                    <span className="text-[9px] font-mono text-primary font-bold">{bp.name}</span>
                    <span className="text-[8px] font-mono text-muted-foreground">{bp.px}</span>
                  </div>
                )
              })}
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-[10px] font-mono text-muted-foreground">0px (base)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Padrões responsivos */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Padrões Responsivos</h2>
        <p className="text-sm text-muted-foreground mb-5">Receitas prontas para os casos mais comuns.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {patterns.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
              </div>
              <pre className="text-xs font-mono text-foreground p-4 overflow-x-auto bg-muted/30 leading-relaxed">{p.code}</pre>
            </div>
          ))}
        </div>
      </section>

      {/* Container sizes */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-1">Larguras de Container</h2>
        <p className="text-sm text-muted-foreground mb-5">Use <code className="font-mono text-xs bg-muted px-1 rounded">mx-auto</code> para centralizar. Escolha conforme a densidade de conteúdo.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Classe</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Largura</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visual</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Uso ideal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {containerSizes.map((c) => (
                <tr key={c.class} className={`hover:bg-muted/30 transition-colors ${c.class === "max-w-5xl" ? "bg-primary/5" : ""}`}>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">
                    {c.class}
                    {c.class === "max-w-5xl" && <span className="ml-2 text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-sans">este DS</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.px}</td>
                  <td className="px-4 py-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden w-32">
                      <div
                        className="h-full bg-primary/50 rounded-full"
                        style={{ width: `${(parseInt(c.px) / 1280) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
