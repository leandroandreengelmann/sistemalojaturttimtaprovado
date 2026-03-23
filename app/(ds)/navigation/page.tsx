export default function NavigationPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Componentes</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Navegação</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Padrões de navegação para orientar o usuário pela interface: sidebar, tabs, breadcrumbs, pagination e steppers.
        </p>
      </div>

      {/* Sidebar nav */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Sidebar Navigation</h2>
        <p className="text-sm text-muted-foreground mb-5">Navegação lateral agrupada por seções. Ideal para aplicações com muitas rotas.</p>
        <div className="rounded-xl border border-border overflow-hidden bg-card">
          <div className="flex h-80">
            {/* Sidebar mockup */}
            <aside className="w-52 shrink-0 border-r border-border bg-sidebar flex flex-col">
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-primary" />
                  <span className="font-semibold text-sm text-foreground">App</span>
                </div>
              </div>
              <nav className="flex-1 p-3 overflow-y-auto">
                <div className="mb-4">
                  <p className="px-2 mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">Principal</p>
                  {[
                    { label: "Dashboard", active: true },
                    { label: "Projetos",  active: false },
                    { label: "Tarefas",   active: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer mb-0.5 ${
                        item.active
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-sm shrink-0 ${item.active ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      {item.label}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="px-2 mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">Config.</p>
                  {["Configurações", "Perfil"].map((label) => (
                    <div key={label} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground cursor-pointer mb-0.5">
                      <div className="w-3 h-3 rounded-sm bg-muted-foreground/40 shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>
              </nav>
            </aside>
            {/* Content */}
            <div className="flex-1 p-5 flex flex-col gap-3">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted/60 rounded w-1/2" />
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="h-14 rounded-lg border border-border bg-background" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-mono">w-52 border-r border-border bg-sidebar — item ativo: bg-primary/10 text-primary</p>
      </section>

      {/* Tabs */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Tabs</h2>
        <p className="text-sm text-muted-foreground mb-5">Para alternar entre views do mesmo contexto. Máximo de 5-6 tabs.</p>
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          {/* Line tabs */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Line tabs</p>
            <div className="border-b border-border flex gap-0">
              {["Visão Geral", "Analytics", "Configurações", "Membros"].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    i === 0
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-4 h-16 rounded-lg bg-muted/30 border border-border" />
          </div>

          {/* Pill tabs */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Pill tabs</p>
            <div className="inline-flex items-center gap-1 bg-muted p-1 rounded-lg">
              {["Mensal", "Semanal", "Diário"].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    i === 0
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Breadcrumbs</h2>
        <p className="text-sm text-muted-foreground mb-5">Localização hierárquica. Use a partir de 3 níveis de profundidade.</p>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          {[
            ["Home", "Projetos", "Design System"],
            ["Home", "Configurações", "Equipe", "Permissões"],
          ].map((crumbs, idx) => (
            <div key={idx} className="flex items-center gap-1.5 flex-wrap">
              {crumbs.map((crumb, i) => (
                <div key={crumb} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-muted-foreground/50 text-sm">/</span>}
                  <span
                    className={`text-sm ${
                      i === crumbs.length - 1
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    }`}
                  >
                    {crumb}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {/* Collapsed */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground cursor-pointer">Home</span>
            <span className="text-muted-foreground/50 text-sm">/</span>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded cursor-pointer">···</span>
            <span className="text-muted-foreground/50 text-sm">/</span>
            <span className="text-sm font-medium text-foreground">Página atual</span>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Pagination</h2>
        <p className="text-sm text-muted-foreground mb-5">Para listas longas. Mostre sempre a página atual, primeira, última e adjacentes.</p>
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          {/* Full pagination */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Completa</p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 rounded-md text-sm text-muted-foreground border border-border hover:bg-muted transition-colors">
                ← Anterior
              </button>
              {[1,2,3,"...",8,9,10].map((page, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-md text-sm transition-colors ${
                    page === 3
                      ? "bg-primary text-primary-foreground font-medium"
                      : page === "..."
                      ? "text-muted-foreground cursor-default"
                      : "text-muted-foreground hover:bg-muted border border-transparent hover:border-border"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-md text-sm text-muted-foreground border border-border hover:bg-muted transition-colors">
                Próxima →
              </button>
            </div>
          </div>

          {/* Simple */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Simples</p>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 rounded-md text-sm border border-border text-muted-foreground hover:bg-muted transition-colors">
                ← Anterior
              </button>
              <span className="text-sm text-muted-foreground">Página <strong className="text-foreground">3</strong> de 10</span>
              <button className="px-3 py-1.5 rounded-md text-sm border border-border text-muted-foreground hover:bg-muted transition-colors">
                Próxima →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stepper */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Stepper</h2>
        <p className="text-sm text-muted-foreground mb-5">Para fluxos multi-etapa como formulários, checkout e onboarding.</p>
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          {/* Horizontal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Horizontal</p>
            <div className="flex items-center">
              {["Conta", "Perfil", "Confirmação", "Concluído"].map((step, i) => {
                const status = i < 2 ? "done" : i === 2 ? "active" : "pending"
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                        status === "done"
                          ? "bg-primary border-primary text-primary-foreground"
                          : status === "active"
                          ? "bg-background border-primary text-primary"
                          : "bg-background border-border text-muted-foreground"
                      }`}>
                        {status === "done" ? "✓" : i + 1}
                      </div>
                      <span className={`text-xs mt-1.5 font-medium ${
                        status === "active" ? "text-primary" : status === "done" ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {step}
                      </span>
                    </div>
                    {i < 3 && (
                      <div className={`flex-1 h-0.5 mx-2 mb-5 ${i < 2 ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Vertical */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Vertical</p>
            <div className="space-y-0 max-w-xs">
              {[
                { step: "Informações pessoais", status: "done",   desc: "Nome, email e telefone" },
                { step: "Endereço",             status: "active", desc: "CEP, rua e complemento" },
                { step: "Pagamento",            status: "pending", desc: "Cartão ou boleto" },
              ].map((item, i) => (
                <div key={item.step} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 shrink-0 ${
                      item.status === "done"
                        ? "bg-primary border-primary text-primary-foreground"
                        : item.status === "active"
                        ? "bg-background border-primary text-primary"
                        : "bg-background border-border text-muted-foreground"
                    }`}>
                      {item.status === "done" ? "✓" : i + 1}
                    </div>
                    {i < 2 && <div className={`w-0.5 h-8 ${item.status === "done" ? "bg-primary" : "bg-border"}`} />}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${item.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                      {item.step}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Regras de Navegação</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Sempre indicar a página/seção ativa visualmente",           ok: true },
            { rule: "Breadcrumb a partir de 3 níveis de hierarquia",             ok: true },
            { rule: "Tabs com labels curtos (1-2 palavras)",                      ok: true },
            { rule: "Stepper: máximo de 5-6 etapas por fluxo",                   ok: true },
            { rule: "Tabs para navegar entre páginas diferentes (use links)",     ok: false },
            { rule: "Sidebar com mais de 3 níveis de aninhamento",               ok: false },
            { rule: "Pagination sem indicação de total de páginas",              ok: false },
            { rule: "Breadcrumb em fluxos lineares (use stepper)",               ok: false },
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
