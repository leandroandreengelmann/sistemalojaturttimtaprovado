export default function TypographyPage() {
  const scale = [
    { name: "5xl", size: "3.815rem", px: "61px",   weight: "800", use: "Display Hero",   lh: "1.1",  tracking: "-0.04em" },
    { name: "4xl", size: "3.052rem", px: "48.8px",  weight: "700", use: "H1 Principal",   lh: "1.15", tracking: "-0.03em" },
    { name: "3xl", size: "2.441rem", px: "39.1px",  weight: "700", use: "H2 Seção",       lh: "1.2",  tracking: "-0.02em" },
    { name: "2xl", size: "1.953rem", px: "31.3px",  weight: "600", use: "H3 Subseção",    lh: "1.25", tracking: "-0.01em" },
    { name: "xl",  size: "1.563rem", px: "25px",    weight: "600", use: "H4 Destaque",    lh: "1.3",  tracking: "-0.005em" },
    { name: "lg",  size: "1.25rem",  px: "20px",    weight: "500", use: "Lead / Intro",   lh: "1.5",  tracking: "0" },
    { name: "base",size: "1rem",     px: "16px",    weight: "400", use: "Body Text",       lh: "1.6",  tracking: "0" },
    { name: "sm",  size: "0.875rem", px: "14px",    weight: "400", use: "Caption / Meta", lh: "1.5",  tracking: "+0.01em" },
    { name: "xs",  size: "0.75rem",  px: "12px",    weight: "600", use: "Label / Badge",  lh: "1.4",  tracking: "+0.08em" },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Tipografia</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Inter com Modular Scale de Major Third (1.25×). Base 16px, 9 níveis de escala,
          tracking ajustado por tamanho.
        </p>
      </div>

      {/* Princípios */}
      <section className="mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Font Family",  value: "Inter",           sub: "Variable font" },
            { label: "Ratio",        value: "1.25×",           sub: "Major Third" },
            { label: "Base Size",    value: "16px",            sub: "1rem" },
            { label: "Line Length",  value: "65ch",            sub: "Ideal reading" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
              <p className="text-[1.25rem] font-bold text-foreground leading-none">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Escala tipográfica */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Escala — Major Third (×1.25)</h2>
        <div className="space-y-1">
          {scale.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              {/* Token */}
              <div className="w-12 shrink-0">
                <code className="text-xs font-mono text-muted-foreground">text-{item.name}</code>
              </div>
              {/* Size info */}
              <div className="w-24 shrink-0 text-right hidden sm:block">
                <span className="text-xs font-mono text-muted-foreground">{item.px}</span>
              </div>
              {/* Preview */}
              <div
                className="flex-1 text-foreground truncate"
                style={{
                  fontSize: item.size,
                  fontWeight: item.weight,
                  lineHeight: item.lh,
                  letterSpacing: item.tracking,
                }}
              >
                {item.use}
              </div>
              {/* Metadata */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-muted-foreground/60">lh {item.lh}</span>
                <span className="text-xs font-mono text-muted-foreground/60">ls {item.tracking}</span>
                <span className="text-xs font-mono text-muted-foreground/60">w{item.weight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hierarquia em contexto */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Hierarquia em Contexto</h2>
        <div className="rounded-xl border border-border bg-card p-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Categoria · Publicado em 16 mar 2026
          </p>
          <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground leading-[1.2] mb-3">
            Título principal do artigo
          </h1>
          <p className="text-[1.25rem] text-muted-foreground leading-relaxed mb-6">
            Lead text que introduz o conteúdo com mais detalhes sobre o tema abordado.
          </p>
          <h2 className="text-[1.563rem] font-semibold text-foreground mb-3">Subtítulo da seção</h2>
          <p className="text-base text-foreground leading-[1.7] mb-4 max-w-[65ch]">
            Parágrafo de corpo com a fonte base de 16px e line-height de 1.7 para leitura
            confortável. A largura máxima de 65ch garante o comprimento de linha ideal segundo
            as boas práticas de tipografia.
          </p>
          <h3 className="text-[1.25rem] font-semibold text-foreground mb-2">Subtópico</h3>
          <p className="text-base text-muted-foreground leading-[1.7] mb-4 max-w-[65ch]">
            Texto de corpo em muted para variação visual e hierarquia de conteúdo.
          </p>
          <p className="text-[0.8rem] text-muted-foreground">
            Caption · Última atualização: 16 mar 2026 · Leitura: 3 min
          </p>
        </div>
      </section>

      {/* Weights */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Pesos da Inter</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { weight: "300", name: "Light",    use: "Subtexto" },
            { weight: "400", name: "Regular",  use: "Body text" },
            { weight: "500", name: "Medium",   use: "Emphasis" },
            { weight: "600", name: "Semibold", use: "Labels, nav" },
            { weight: "700", name: "Bold",     use: "Headings" },
            { weight: "800", name: "Extrabold",use: "Display" },
            { weight: "900", name: "Black",    use: "Hero" },
          ].map((w) => (
            <div key={w.weight} className="rounded-lg border border-border bg-card p-4">
              <p
                className="text-[1.563rem] text-foreground mb-1"
                style={{ fontWeight: w.weight }}
              >
                Aa
              </p>
              <p className="text-xs font-semibold text-foreground">{w.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{w.weight}</p>
              <p className="text-xs text-muted-foreground mt-1">{w.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Regras de Tipografia</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Máximo 2-3 pesos por página",         ok: true  },
            { rule: "Contraste de peso: pular 2 níveis",   ok: true  },
            { rule: "Body text: max-width de 65ch",        ok: true  },
            { rule: "ALL CAPS: tracking +8% a +10%",       ok: true  },
            { rule: "Fonte decorativa para body text",     ok: false },
            { rule: "Pesos adjacentes para hierarquia",    ok: false },
            { rule: "Mais de 3 famílias de fonte",         ok: false },
            { rule: "Tamanhos fixos sem responsividade",   ok: false },
          ].map((item) => (
            <div
              key={item.rule}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${
                item.ok
                  ? "bg-success/10 text-foreground"
                  : "bg-destructive/10 text-foreground"
              }`}
            >
              <span className={`text-base ${item.ok ? "text-success" : "text-destructive"}`}>
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
