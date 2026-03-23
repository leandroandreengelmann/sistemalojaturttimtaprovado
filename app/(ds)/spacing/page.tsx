export default function SpacingPage() {
  const scale = [
    { token: "0",   px: "0px",   rem: "0" },
    { token: "px",  px: "1px",   rem: "1px" },
    { token: "0.5", px: "2px",   rem: "0.125rem" },
    { token: "1",   px: "4px",   rem: "0.25rem" },
    { token: "1.5", px: "6px",   rem: "0.375rem" },
    { token: "2",   px: "8px",   rem: "0.5rem" },
    { token: "2.5", px: "10px",  rem: "0.625rem" },
    { token: "3",   px: "12px",  rem: "0.75rem" },
    { token: "4",   px: "16px",  rem: "1rem" },
    { token: "5",   px: "20px",  rem: "1.25rem" },
    { token: "6",   px: "24px",  rem: "1.5rem" },
    { token: "8",   px: "32px",  rem: "2rem" },
    { token: "10",  px: "40px",  rem: "2.5rem" },
    { token: "12",  px: "48px",  rem: "3rem" },
    { token: "16",  px: "64px",  rem: "4rem" },
    { token: "20",  px: "80px",  rem: "5rem" },
    { token: "24",  px: "96px",  rem: "6rem" },
    { token: "32",  px: "128px", rem: "8rem" },
  ]

  const usages = [
    { context: "Entre elementos inline",      values: "gap-1 · gap-2",       px: "4-8px" },
    { context: "Padding de botão",            values: "px-4 py-2",           px: "8×16px" },
    { context: "Gap em grupos de botões",     values: "gap-3",               px: "12px" },
    { context: "Padding interno de card",     values: "p-6",                 px: "24px" },
    { context: "Gap entre cards",             values: "gap-4 · gap-6",       px: "16-24px" },
    { context: "Padding de seção",            values: "p-8",                 px: "32px" },
    { context: "Gap entre seções",            values: "gap-8 · gap-12",      px: "32-48px" },
    { context: "Padding da página",           values: "p-8",                 px: "32px" },
    { context: "Gap de layout de coluna",     values: "gap-6 · gap-8",       px: "24-32px" },
    { context: "Margem de componente grande", values: "mb-12 · mb-16",       px: "48-64px" },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Espaçamento</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Grid de 4px. Todos os valores são múltiplos de 4. Espaçamento consistente
          cria ritmo visual e reduz carga cognitiva (Gestalt — Law of Proximity).
        </p>
      </div>

      {/* Escala visual */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Escala de Espaçamento</h2>
        <div className="space-y-2">
          {scale.map((item) => (
            <div key={item.token} className="flex items-center gap-4">
              <code className="text-xs font-mono text-muted-foreground w-12 shrink-0 text-right">
                {item.token}
              </code>
              <div
                className="h-5 bg-primary rounded shrink-0"
                style={{ width: item.px === "0px" ? "2px" : item.px }}
              />
              <div className="flex gap-3 text-xs text-muted-foreground font-mono">
                <span>{item.px}</span>
                <span className="text-muted-foreground/50">·</span>
                <span>{item.rem}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Uso por contexto */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Uso por Contexto</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-3 px-4 py-2 bg-muted border-b border-border">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contexto</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tokens Tailwind</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pixels</span>
          </div>
          {usages.map((u) => (
            <div key={u.context} className="grid grid-cols-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">{u.context}</span>
              <code className="text-xs font-mono text-primary">{u.values}</code>
              <span className="text-xs text-muted-foreground font-mono">{u.px}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Demonstração visual de Proximity */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Lei de Proximidade em Prática</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Espaçamento interno menor que espaçamento externo comunica agrupamento sem bordas.
        </p>
        <div className="flex gap-12">
          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest font-semibold">Certo</p>
            <div className="flex flex-col gap-6">
              {["Grupo A", "Grupo B"].map((group) => (
                <div key={group}>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">{group}</p>
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3 w-40 rounded bg-primary/30" />
                    <div className="h-3 w-32 rounded bg-primary/30" />
                    <div className="h-3 w-36 rounded bg-primary/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest font-semibold">Errado</p>
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-3 w-40 rounded bg-muted-foreground/20" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
