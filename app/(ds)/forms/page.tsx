export default function FormsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Componentes</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Formulários</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Padrões completos de formulário: campos, validação, agrupamento e layouts para coleta de dados eficiente.
        </p>
      </div>

      {/* Anatomia de um field */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Anatomia de um Campo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Default */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Default</p>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground block">
                E-mail <span className="text-destructive">*</span>
              </label>
              <input
                readOnly
                value="leandro@exemplo.com"
                placeholder="seu@email.com"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground outline-none"
              />
              <p className="text-xs text-muted-foreground">Usaremos para enviar confirmações.</p>
            </div>
            <div className="mt-4 space-y-1 text-xs font-mono text-muted-foreground">
              <p>① Label — text-sm font-medium</p>
              <p>② Input — border border-input</p>
              <p>③ Helper — text-xs text-muted-foreground</p>
            </div>
          </div>

          {/* Error */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Com erro</p>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground block">
                E-mail <span className="text-destructive">*</span>
              </label>
              <input
                readOnly
                value="email-invalido"
                className="w-full px-3 py-2 rounded-md border border-destructive bg-background text-sm text-foreground outline-none ring-1 ring-destructive/30"
              />
              <p className="text-xs text-destructive flex items-center gap-1">
                <span>✕</span> Endereço de e-mail inválido.
              </p>
            </div>
            <div className="mt-4 space-y-1 text-xs font-mono text-muted-foreground">
              <p>① Input — border-destructive + ring</p>
              <p>② Erro — text-destructive + ícone ✕</p>
            </div>
          </div>

          {/* Success */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Válido</p>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground block">Username</label>
              <div className="relative">
                <input
                  readOnly
                  value="leandro_dev"
                  className="w-full px-3 py-2 pr-9 rounded-md border border-success bg-background text-sm text-foreground outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-success text-sm">✓</span>
              </div>
              <p className="text-xs text-success">Username disponível!</p>
            </div>
          </div>

          {/* Disabled */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Desabilitado</p>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground block">Plano atual</label>
              <input
                readOnly
                disabled
                value="Pro — R$ 49/mês"
                className="w-full px-3 py-2 rounded-md border border-border bg-muted text-sm text-muted-foreground cursor-not-allowed outline-none"
              />
              <p className="text-xs text-muted-foreground">Altere em Configurações → Plano.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de campo */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Tipos de Campo</h2>
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">

          {/* Textarea */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground block">Descrição</label>
            <textarea
              readOnly
              rows={3}
              value="Texto de exemplo para demonstrar o textarea..."
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground outline-none resize-y"
            />
            <p className="text-xs text-muted-foreground text-right">0 / 500 caracteres</p>
          </div>

          {/* Select */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground block">País</label>
            <div className="relative">
              <select className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground outline-none appearance-none cursor-pointer">
                <option>Brasil</option>
                <option>Portugal</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-xs">▼</span>
            </div>
          </div>

          {/* Input com ícone e prefix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground block">Busca</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
                <input
                  readOnly
                  placeholder="Buscar..."
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm text-foreground outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground block">Preço</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                  R$
                </span>
                <input
                  readOnly
                  value="99,90"
                  className="flex-1 px-3 py-2 rounded-r-md border border-input bg-background text-sm text-foreground outline-none"
                />
              </div>
            </div>
          </div>

          {/* Checkbox e Radio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Preferências</p>
              <div className="space-y-2">
                {["Notificações por e-mail", "Newsletter semanal", "Alertas de segurança"].map((label, i) => (
                  <label key={label} className="flex items-center gap-2.5 cursor-pointer">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      i !== 1 ? "bg-primary border-primary" : "border-border bg-background"
                    }`}>
                      {i !== 1 && <span className="text-primary-foreground text-xs leading-none">✓</span>}
                    </div>
                    <span className="text-sm text-foreground">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Plano</p>
              <div className="space-y-2">
                {["Gratuito", "Pro — R$ 49/mês", "Enterprise"].map((label, i) => (
                  <label key={label} className="flex items-center gap-2.5 cursor-pointer">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      i === 1 ? "border-primary" : "border-border"
                    }`}>
                      {i === 1 && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-sm text-foreground">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* File upload */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground block">Upload de arquivo</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background">
              <p className="text-2xl mb-2">📁</p>
              <p className="text-sm font-medium text-foreground">Arraste arquivos aqui ou <span className="text-primary cursor-pointer">clique para selecionar</span></p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF até 10MB</p>
            </div>
          </div>
        </div>
      </section>

      {/* Layouts de formulário */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Layouts de Formulário</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Stacked */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Empilhado (padrão)</p>
            <div className="space-y-3">
              {["Nome", "E-mail", "Senha"].map((f) => (
                <div key={f} className="space-y-1">
                  <div className="h-3 bg-muted rounded w-12" />
                  <div className="h-8 bg-background border border-border rounded-md" />
                </div>
              ))}
              <div className="h-8 bg-primary rounded-md" />
            </div>
          </div>

          {/* Inline */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Inline (busca/filtros)</p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 h-8 bg-background border border-border rounded-md" />
                <div className="h-8 w-20 bg-primary rounded-md" />
              </div>
              <div className="flex gap-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex-1 h-8 bg-background border border-border rounded-md" />
                ))}
              </div>
            </div>
          </div>

          {/* Two column */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Duas colunas</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {["Nome", "Sobrenome", "CEP", "Cidade"].map((f) => (
                  <div key={f} className="space-y-1">
                    <div className="h-3 bg-muted rounded w-10" />
                    <div className="h-8 bg-background border border-border rounded-md" />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-muted rounded w-14" />
                <div className="h-8 bg-background border border-border rounded-md" />
              </div>
              <div className="h-8 bg-primary rounded-md" />
            </div>
          </div>

          {/* Card sections */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Com seções</p>
            <div className="space-y-3">
              <div className="rounded-lg border border-border p-3 space-y-2">
                <div className="h-3 bg-muted rounded w-16" />
                {[0,1].map((i) => <div key={i} className="h-7 bg-background border border-border rounded" />)}
              </div>
              <div className="rounded-lg border border-border p-3 space-y-2">
                <div className="h-3 bg-muted rounded w-20" />
                {[0,1].map((i) => <div key={i} className="h-7 bg-background border border-border rounded" />)}
              </div>
              <div className="h-8 bg-primary rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Validação */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Padrões de Validação</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Quando validar</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Padrão</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Uso</th>
              </tr>
            </thead>
            <tbody>
              {[
                { when: "onBlur",    pattern: "Ao sair do campo",    use: "Campos obrigatórios, formato fixo" },
                { when: "onChange",  pattern: "Em tempo real",       use: "Disponibilidade (username, email)" },
                { when: "onSubmit",  pattern: "Ao enviar",           use: "Validação geral + campos dependentes" },
                { when: "debounced", pattern: "Após 400ms parado",   use: "Busca async, verificação no servidor" },
              ].map((row, i) => (
                <tr key={row.when} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                  <td className="px-4 py-3"><code className="font-mono text-primary text-xs">{row.when}</code></td>
                  <td className="px-4 py-3 text-foreground">{row.pattern}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Regras de Formulário</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Label sempre acima do campo, nunca só placeholder",    ok: true },
            { rule: "Mensagem de erro inline, abaixo do campo afetado",     ok: true },
            { rule: "Campos obrigatórios marcados com asterisco (*)",        ok: true },
            { rule: "Botão de submit desabilitado apenas se form inválido",  ok: true },
            { rule: "Usar placeholder como substituto de label",             ok: false },
            { rule: "Validar todos os campos somente no submit",             ok: false },
            { rule: "Mais de 7 campos sem seções ou grupos",                 ok: false },
            { rule: "Resetar o form sem confirmação do usuário",             ok: false },
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
