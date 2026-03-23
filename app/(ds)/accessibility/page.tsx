export default function AccessibilityPage() {
  const contrastRatios = [
    { level: "AA Normal",  ratio: "4.5:1", size: "< 18px regular / < 14px bold", pass: true },
    { level: "AA Large",   ratio: "3:1",   size: "≥ 18px regular / ≥ 14px bold",  pass: true },
    { level: "AAA Normal", ratio: "7:1",   size: "< 18px regular",               pass: true },
    { level: "AAA Large",  ratio: "4.5:1", size: "≥ 18px regular",               pass: true },
  ]

  const colorPairs = [
    { bg: "var(--primary)",     fg: "var(--primary-foreground)", bgLabel: "--primary",     fgLabel: "--primary-foreground", ratio: "5.2:1", level: "AA" },
    { bg: "var(--destructive)", fg: "#ffffff",                   bgLabel: "--destructive", fgLabel: "white",                ratio: "4.8:1", level: "AA" },
    { bg: "var(--success)",     fg: "#ffffff",                   bgLabel: "--success",     fgLabel: "white",                ratio: "4.6:1", level: "AA" },
    { bg: "var(--background)",  fg: "var(--foreground)",         bgLabel: "--background",  fgLabel: "--foreground",         ratio: "16:1",  level: "AAA" },
    { bg: "var(--muted)",       fg: "var(--muted-foreground)",   bgLabel: "--muted",       fgLabel: "--muted-foreground",   ratio: "5.1:1", level: "AA" },
    { bg: "var(--card)",        fg: "var(--foreground)",         bgLabel: "--card",        fgLabel: "--foreground",         ratio: "16:1",  level: "AAA" },
  ]

  const keyboardPatterns = [
    { component: "Button",          keys: ["Enter", "Space"],                    action: "Ativa o botão" },
    { component: "Link",            keys: ["Enter"],                             action: "Navega para o destino" },
    { component: "Checkbox",        keys: ["Space"],                             action: "Marca/desmarca" },
    { component: "Radio Group",     keys: ["↑", "↓", "←", "→"],               action: "Seleciona opção" },
    { component: "Select",          keys: ["Enter/Space", "↑↓", "Esc"],        action: "Abre, navega, fecha" },
    { component: "Dialog",          keys: ["Esc", "Tab"],                        action: "Fecha, navega dentro" },
    { component: "Tabs",            keys: ["←", "→", "Home", "End"],           action: "Troca de aba" },
    { component: "Accordion",       keys: ["Enter/Space"],                       action: "Expande/colapsa" },
    { component: "Slider",          keys: ["←", "→", "Home", "End"],           action: "Ajusta valor" },
    { component: "Menu/Dropdown",   keys: ["↑↓", "Enter", "Esc"],              action: "Navega, seleciona, fecha" },
    { component: "Toast",           keys: ["Esc"],                              action: "Dispensa a notificação" },
    { component: "Popover/Tooltip", keys: ["Esc", "Tab"],                       action: "Fecha, avança foco" },
  ]

  const ariaPatterns = [
    {
      title: "Botão com ícone",
      bad:  `<button><Icon /></button>`,
      good: `<button aria-label="Fechar janela"><Icon /></button>`,
      why:  "Leitores de tela precisam de texto descritivo.",
    },
    {
      title: "Imagem decorativa",
      bad:  `<img src="bg.png" />`,
      good: `<img src="bg.png" alt="" role="presentation" />`,
      why:  "alt vazio sinaliza que a imagem é decorativa.",
    },
    {
      title: "Input com erro",
      bad:  `<input /><p>Campo obrigatório</p>`,
      good: `<input aria-invalid="true" aria-describedby="err" />\n<p id="err">Campo obrigatório</p>`,
      why:  "Associa a mensagem ao campo para leitores de tela.",
    },
    {
      title: "Loading state",
      bad:  `<button disabled>Salvando...</button>`,
      good: `<button aria-busy="true" aria-live="polite">Salvando...</button>`,
      why:  "aria-busy e aria-live anunciam o estado para tecnologias assistivas.",
    },
    {
      title: "Modal/Dialog",
      bad:  `<div className="modal">...</div>`,
      good: `<div role="dialog" aria-modal="true" aria-labelledby="title">...</div>`,
      why:  "role=dialog cria contexto e aria-modal prende o foco.",
    },
    {
      title: "Lista de navegação",
      bad:  `<div><a>Home</a><a>Sobre</a></div>`,
      good: `<nav aria-label="Principal"><ul><li><a>Home</a></li></ul></nav>`,
      why:  "nav + aria-label identificam a região corretamente.",
    },
  ]

  const checklist = [
    { category: "Foco",         items: [
      "Todos os elementos interativos são alcançáveis por Tab",
      "Focus ring sempre visível (nunca outline: none sem alternativa)",
      "Ordem de foco segue a ordem visual lógica",
      "Modais prendem o foco dentro (focus trap)",
    ]},
    { category: "Contraste",    items: [
      "Texto normal: mínimo 4.5:1",
      "Texto grande: mínimo 3:1",
      "Componentes UI (border de inputs, ícones): mínimo 3:1",
      "Não depender apenas de cor para transmitir informação",
    ]},
    { category: "ARIA",         items: [
      "Labels descritivos em todos os inputs",
      "Botões com ícone têm aria-label",
      "Imagens decorativas têm alt=\"\"",
      "Estados dinâmicos usam aria-live para anunciar mudanças",
    ]},
    { category: "Teclado",      items: [
      "Toda funcionalidade acessível por teclado",
      "Atalhos não conflitam com atalhos do sistema/SO",
      "Skip-to-content link no início da página",
    ]},
    { category: "Motion",       items: [
      "Respeitar prefers-reduced-motion",
      "Sem conteúdo piscando mais de 3x por segundo",
      "Animações essenciais têm alternativa estática",
    ]},
    { category: "Semântica",    items: [
      "Hierarquia de headings correta (h1 → h2 → h3)",
      "Landmarks: <main>, <nav>, <aside>, <footer>",
      "Listas usam <ul>/<ol>, não divs",
      "Tabelas têm <caption> e <th> com scope",
    ]},
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Acessibilidade</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Interfaces acessíveis funcionam para todos — com ou sem deficiência visual, motora ou cognitiva.
          Este design system segue as diretrizes WCAG 2.1 nível AA.
        </p>
      </div>

      {/* WCAG Levels */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Níveis WCAG 2.1</h2>
        <p className="text-sm text-muted-foreground mb-5">Web Content Accessibility Guidelines — padrão internacional de acessibilidade.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { level: "A",   color: "bg-warning/15 border-warning/30 text-warning",   title: "Nível A",   desc: "Requisitos básicos. Mínimo absoluto. Falhar aqui bloqueia usuários com deficiência." },
            { level: "AA",  color: "bg-primary/10 border-primary/30 text-primary",   title: "Nível AA",  desc: "Padrão adotado por este DS. Exigido legalmente em muitos países." },
            { level: "AAA", color: "bg-success/15 border-success/30 text-success",   title: "Nível AAA", desc: "Máxima acessibilidade. Ideal para serviços públicos e saúde." },
          ].map(({ level, color, title, desc }) => (
            <div key={level} className={`rounded-xl border p-5 ${color.split(' ').filter(c => c.startsWith('border')).join(' ')} bg-card`}>
              <div className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-sm font-bold mb-3 ${color}`}>{level}</div>
              <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contraste */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Contraste de Cor</h2>
        <p className="text-sm text-muted-foreground mb-5">Razões mínimas de contraste entre texto e fundo.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {contrastRatios.map((r) => (
            <div key={r.level} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-success/15 text-success border border-success/25 px-1.5 py-0.5 rounded font-semibold">✓ Pass</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{r.ratio}</p>
              <p className="text-xs font-semibold text-foreground mt-1">{r.level}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{r.size}</p>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-foreground mb-3">Pares de cores do sistema</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {colorPairs.map((pair) => (
            <div key={pair.bgLabel} className="rounded-xl border border-border overflow-hidden">
              <div
                className="h-16 flex items-center justify-center text-sm font-semibold"
                style={{ background: pair.bg, color: pair.fg }}
              >
                Texto de exemplo
              </div>
              <div className="p-3 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <code className="text-xs font-mono text-muted-foreground block">{pair.bgLabel}</code>
                    <code className="text-xs font-mono text-muted-foreground block">{pair.fgLabel}</code>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-foreground">{pair.ratio}</span>
                    <span className="text-xs bg-success/15 text-success px-1.5 py-0.5 rounded font-semibold block mt-1">{pair.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teclado */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Navegação por Teclado</h2>
        <p className="text-sm text-muted-foreground mb-5">Padrões de interação por teclado seguindo WAI-ARIA Authoring Practices.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Componente</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Teclas</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {keyboardPatterns.map((p) => (
                <tr key={p.component} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{p.component}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.keys.map((k) => (
                        <kbd key={k} className="text-xs font-mono bg-muted border border-border px-1.5 py-0.5 rounded text-foreground">{k}</kbd>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{p.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ARIA */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-1">Padrões ARIA</h2>
        <p className="text-sm text-muted-foreground mb-5">Comparativo certo vs. errado nos casos mais comuns.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ariaPatterns.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.why}</p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="p-3">
                  <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">✗ Errado</p>
                  <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap leading-relaxed">{p.bad}</pre>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-success uppercase tracking-wider mb-2">✓ Correto</p>
                  <pre className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed">{p.good}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-1">Checklist de Lançamento</h2>
        <p className="text-sm text-muted-foreground mb-5">Revise estes itens antes de colocar qualquer feature em produção.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {checklist.map(({ category, items }) => (
            <div key={category} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{category}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-muted-foreground/40 mt-0.5 shrink-0">☐</span>
                    <span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
