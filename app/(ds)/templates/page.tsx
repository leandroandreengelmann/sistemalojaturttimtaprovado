export default function TemplatesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">UX & Padrões</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Templates de Página</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Layouts prontos para as principais telas de aplicação: dashboard, settings, auth, lista e detalhe.
        </p>
      </div>

      {/* Dashboard */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Dashboard</h2>
        <p className="text-sm text-muted-foreground mb-5">
          KPI cards + gráfico principal + tabela recente. Estrutura padrão para telas de início de aplicações.
        </p>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Mockup */}
          <div className="flex h-72">
            {/* Sidebar */}
            <div className="w-10 shrink-0 border-r border-border bg-sidebar p-2 flex flex-col gap-2">
              <div className="w-6 h-6 rounded-md bg-primary mx-auto" />
              {[0,1,2,3,4].map((i) => (
                <div key={i} className={`w-6 h-6 rounded-md mx-auto ${i === 0 ? "bg-primary/20" : "bg-muted"}`} />
              ))}
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="h-3 bg-muted rounded w-24" />
                <div className="h-6 w-16 bg-primary rounded-lg" />
              </div>
              {/* KPI cards */}
              <div className="grid grid-cols-4 gap-2">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="rounded-lg border border-border bg-background p-2">
                    <div className="h-2 bg-muted rounded w-3/4 mb-1.5" />
                    <div className="h-4 bg-muted rounded w-1/2 mb-1" />
                    <div className="h-1.5 bg-success/30 rounded w-1/3" />
                  </div>
                ))}
              </div>
              {/* Charts row */}
              <div className="flex gap-2 flex-1 min-h-0">
                <div className="flex-1 rounded-lg border border-border bg-background p-2 flex flex-col gap-1">
                  <div className="h-2 bg-muted rounded w-1/3" />
                  <div className="flex-1 flex items-end gap-1">
                    {[60,80,55,90,75,95,70].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-primary/30" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="w-28 rounded-lg border border-border bg-background p-2 flex flex-col gap-1">
                  <div className="h-2 bg-muted rounded w-2/3" />
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm" style={{ background: ["var(--chart-1)","var(--chart-2)","var(--chart-3)","var(--chart-4)"][i] }} />
                      <div className="flex-1 h-1.5 bg-muted rounded" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Table */}
              <div className="rounded-lg border border-border bg-background p-2">
                <div className="h-2 bg-muted rounded w-1/4 mb-2" />
                {[0,1,2].map((i) => (
                  <div key={i} className="flex gap-2 py-1 border-b border-border last:border-0">
                    <div className="h-2 bg-muted/60 rounded flex-1" />
                    <div className="h-2 bg-muted/60 rounded w-12" />
                    <div className="h-2 bg-muted/40 rounded w-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Spec */}
          <div className="border-t border-border p-4 bg-muted/30 flex flex-wrap gap-3">
            {["Sidebar w-52", "KPI grid-cols-4", "Chart 2/3 + Legend 1/3", "Recent table"].map((spec) => (
              <code key={spec} className="text-xs font-mono text-muted-foreground bg-background border border-border px-2 py-1 rounded">
                {spec}
              </code>
            ))}
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Settings</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Nav lateral de categorias + área de conteúdo com seções de form. Padrão para páginas de configuração.
        </p>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex h-64">
            {/* Settings sidebar */}
            <div className="w-36 shrink-0 border-r border-border p-3 flex flex-col gap-0.5">
              {["Perfil", "Conta", "Segurança", "Notificações", "Faturamento", "Equipe"].map((item, i) => (
                <div
                  key={item}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium ${
                    i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            {/* Form area */}
            <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden">
              <div>
                <div className="h-3 bg-muted rounded w-20 mb-0.5" />
                <div className="h-2 bg-muted/50 rounded w-40" />
              </div>
              <div className="rounded-lg border border-border p-4 space-y-3">
                <div className="h-2 bg-muted rounded w-16 mb-2" />
                <div className="grid grid-cols-2 gap-3">
                  {[0,1].map((i) => (
                    <div key={i}>
                      <div className="h-2 bg-muted/60 rounded w-12 mb-1" />
                      <div className="h-7 bg-background border border-border rounded-md" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="h-2 bg-muted/60 rounded w-16 mb-1" />
                  <div className="h-7 bg-background border border-border rounded-md" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <div className="h-7 w-16 border border-border rounded-lg" />
                <div className="h-7 w-24 bg-primary rounded-lg" />
              </div>
            </div>
          </div>
          <div className="border-t border-border p-4 bg-muted/30 flex flex-wrap gap-3">
            {["Sidebar w-36", "Form seções em card", "Sticky footer com actions", "max-w-2xl content"].map((spec) => (
              <code key={spec} className="text-xs font-mono text-muted-foreground bg-background border border-border px-2 py-1 rounded">
                {spec}
              </code>
            ))}
          </div>
        </div>
      </section>

      {/* Auth */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Auth (Login / Cadastro)</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Dois padrões: split screen (marketing + form) e form centralizado (mínimo).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Split screen */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex h-48">
              <div className="flex-1 bg-primary/10 p-4 flex flex-col justify-end">
                <div className="h-2 bg-primary/30 rounded w-3/4 mb-1" />
                <div className="h-2 bg-primary/20 rounded w-1/2" />
              </div>
              <div className="w-36 bg-card p-4 flex flex-col justify-center gap-2">
                <div className="h-3 bg-muted rounded w-1/2 mb-1" />
                {[0,1].map((i) => (
                  <div key={i}>
                    <div className="h-1.5 bg-muted/60 rounded w-2/3 mb-1" />
                    <div className="h-6 bg-background border border-border rounded-md" />
                  </div>
                ))}
                <div className="h-6 bg-primary rounded-md mt-1" />
                <div className="h-1.5 bg-muted/40 rounded w-full" />
              </div>
            </div>
            <div className="border-t border-border p-3 bg-muted/30">
              <code className="text-xs font-mono text-muted-foreground">Split: hero 1/2 + form 1/2</code>
            </div>
          </div>

          {/* Centered */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="h-48 bg-muted/20 flex items-center justify-center p-4">
              <div className="w-48 bg-card border border-border rounded-xl p-4 shadow-lg flex flex-col gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg mx-auto" />
                <div className="h-2.5 bg-muted rounded w-2/3 mx-auto" />
                <div className="h-2 bg-muted/50 rounded w-3/4 mx-auto mb-1" />
                {[0,1].map((i) => (
                  <div key={i} className="h-6 bg-background border border-border rounded-md" />
                ))}
                <div className="h-6 bg-primary rounded-md" />
                <div className="h-1.5 bg-muted/40 rounded" />
              </div>
            </div>
            <div className="border-t border-border p-3 bg-muted/30">
              <code className="text-xs font-mono text-muted-foreground">Centered: max-w-sm mx-auto</code>
            </div>
          </div>
        </div>
      </section>

      {/* List + Detail */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Lista + Detalhe</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Padrão master/detail. Lista à esquerda, detalhe à direita. Ou lista separada com página de detalhe.
        </p>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex h-64">
            {/* List */}
            <div className="w-52 shrink-0 border-r border-border flex flex-col">
              <div className="p-3 border-b border-border">
                <div className="h-6 bg-background border border-border rounded-md" />
              </div>
              <div className="flex-1 overflow-auto">
                {[0,1,2,3,4].map((i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 border-b border-border/50 ${i === 1 ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full shrink-0 ${["bg-primary/20","bg-success/20","bg-warning/20","bg-info/20","bg-muted"][i]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="h-2 bg-muted rounded w-3/4 mb-1" />
                      <div className="h-1.5 bg-muted/50 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Detail */}
            <div className="flex-1 p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20" />
                  <div>
                    <div className="h-3 bg-muted rounded w-24 mb-1" />
                    <div className="h-2 bg-muted/50 rounded w-16" />
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-7 w-16 border border-border rounded-lg" />
                  <div className="h-7 w-16 bg-primary rounded-lg" />
                </div>
              </div>
              <div className="flex gap-3">
                {[0,1,2].map((i) => (
                  <div key={i} className="flex-1 rounded-lg border border-border bg-background p-2">
                    <div className="h-1.5 bg-muted/60 rounded w-2/3 mb-1" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
              <div className="flex-1 rounded-lg border border-border bg-background p-3 space-y-2">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="h-2 bg-muted/40 rounded" style={{ width: `${[100,80,90,65][i]}%` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border p-4 bg-muted/30 flex flex-wrap gap-3">
            {["List w-52", "Ativo: border-l-2 border-l-primary", "Detail flex-1", "Header + metrics + content"].map((spec) => (
              <code key={spec} className="text-xs font-mono text-muted-foreground bg-background border border-border px-2 py-1 rounded">
                {spec}
              </code>
            ))}
          </div>
        </div>
      </section>

      {/* Boas práticas */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Boas Práticas de Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Mantenha padding de página consistente: p-6 ou p-8",         ok: true },
            { rule: "Page header sempre com título, descrição e ação primária",    ok: true },
            { rule: "Conteúdo principal com max-w para legibilidade",              ok: true },
            { rule: "Sticky header em listas longas com filtros e actions",        ok: true },
            { rule: "Misturar múltiplos padrões de layout em uma única tela",     ok: false },
            { rule: "Sidebar de conteúdo + sidebar de navegação sem diferenciação", ok: false },
            { rule: "Actions importantes enterradas no rodapé sem visibilidade",   ok: false },
            { rule: "Formulário de settings sem feedback de save/cancel",          ok: false },
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
