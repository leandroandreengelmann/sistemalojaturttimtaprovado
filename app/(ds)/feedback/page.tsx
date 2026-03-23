export default function FeedbackPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Componentes</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Feedback & Notificações</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Sistema de feedback ao usuário: toasts, banners, dialogs de confirmação, estados vazios e de erro.
        </p>
      </div>

      {/* Hierarquia de feedback */}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { level: "1", label: "Inline",   desc: "Erro de campo, helper text — menor disrupção" },
            { level: "2", label: "Toast",    desc: "Confirmação de ação — efêmero, canto da tela" },
            { level: "3", label: "Banner",   desc: "Aviso de sistema — persiste até dismissal" },
            { level: "4", label: "Dialog",   desc: "Confirmação destrutiva — bloqueia interação" },
          ].map((item) => (
            <div key={item.level} className="rounded-xl border border-border bg-card p-4">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mb-2">
                {item.level}
              </div>
              <p className="font-semibold text-foreground text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Toast notifications */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Toast Notifications</h2>
        <p className="text-sm text-muted-foreground mb-5">Aparecem no canto inferior direito, desaparecem automaticamente em 4-5s.</p>
        <div className="space-y-3 max-w-sm">
          {[
            { type: "success",     icon: "✓", title: "Salvo com sucesso",      desc: "Suas alterações foram salvas.",        borderCls: "border-l-success", iconCls: "text-success", bgCls: "" },
            { type: "error",       icon: "✕", title: "Erro ao enviar",         desc: "Verifique sua conexão e tente novamente.", borderCls: "border-l-destructive", iconCls: "text-destructive", bgCls: "" },
            { type: "warning",     icon: "!", title: "Sessão expirando",       desc: "Você será desconectado em 5 minutos.", borderCls: "border-l-warning", iconCls: "text-warning", bgCls: "" },
            { type: "info",        icon: "i", title: "Atualização disponível", desc: "Uma nova versão está disponível.",     borderCls: "border-l-info", iconCls: "text-info", bgCls: "" },
          ].map((toast) => (
            <div
              key={toast.type}
              className={`flex items-start gap-3 p-4 rounded-xl border border-border bg-card shadow-lg border-l-4 ${toast.borderCls}`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${toast.iconCls}`}>
                {toast.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{toast.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{toast.desc}</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground text-sm shrink-0 mt-0.5">✕</button>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 font-mono">border-l-4 + shadow-lg — posição: fixed bottom-4 right-4 z-[600]</p>
      </section>

      {/* Alert banners */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Alert Banners</h2>
        <p className="text-sm text-muted-foreground mb-5">Comunicados persistentes de sistema. Podem ter ação secundária.</p>
        <div className="space-y-3">
          {[
            {
              type: "info",
              icon: "ℹ",
              title: "Manutenção programada",
              desc: "O sistema ficará indisponível no dia 20/03 das 02h às 04h.",
              action: "Saber mais",
              bg: "bg-info/8",
              border: "border-info/20",
              iconCls: "text-info",
            },
            {
              type: "warning",
              icon: "⚠",
              title: "Plano próximo do limite",
              desc: "Você usou 87% do armazenamento. Faça upgrade para continuar.",
              action: "Fazer upgrade",
              bg: "bg-warning/8",
              border: "border-warning/20",
              iconCls: "text-warning",
            },
            {
              type: "error",
              icon: "✕",
              title: "Pagamento recusado",
              desc: "Não foi possível cobrar o cartão. Atualize o método de pagamento.",
              action: "Atualizar",
              bg: "bg-destructive/8",
              border: "border-destructive/20",
              iconCls: "text-destructive",
            },
            {
              type: "success",
              icon: "✓",
              title: "Conta verificada",
              desc: "Seu e-mail foi confirmado. Você tem acesso completo.",
              action: null,
              bg: "bg-success/8",
              border: "border-success/20",
              iconCls: "text-success",
            },
          ].map((banner) => (
            <div
              key={banner.type}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${banner.bg} ${banner.border}`}
            >
              <span className={`text-base shrink-0 ${banner.iconCls}`}>{banner.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-foreground">{banner.title} </span>
                <span className="text-sm text-muted-foreground">{banner.desc}</span>
              </div>
              {banner.action && (
                <button className="text-sm font-medium text-primary shrink-0 hover:underline">
                  {banner.action}
                </button>
              )}
              <button className="text-muted-foreground hover:text-foreground text-sm shrink-0">✕</button>
            </div>
          ))}
        </div>
      </section>

      {/* Confirmation dialogs */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Dialogs de Confirmação</h2>
        <p className="text-sm text-muted-foreground mb-5">Para ações destrutivas ou irreversíveis. Sempre descreva a consequência.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Destrutivo */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <span className="text-destructive text-lg">🗑</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Excluir projeto</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tem certeza? O projeto <strong className="text-foreground">Design System v2</strong> e todos os seus arquivos serão excluídos permanentemente. Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex gap-2 px-6 pb-6">
              <button className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Cancelar
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Sim, excluir
              </button>
            </div>
          </div>

          {/* Confirmação simples */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary text-lg">📤</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Publicar artigo</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ao publicar, o artigo ficará visível para todos os usuários. Você poderá editar ou despublicar a qualquer momento.
              </p>
            </div>
            <div className="flex gap-2 px-6 pb-6">
              <button className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Cancelar
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Publicar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Empty states */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Estados Vazios</h2>
        <p className="text-sm text-muted-foreground mb-5">Mostre o próximo passo, nunca deixe o usuário em branco.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              emoji: "📋",
              title: "Nenhum projeto ainda",
              desc: "Crie seu primeiro projeto para começar a organizar seu trabalho.",
              action: "Criar projeto",
            },
            {
              emoji: "🔍",
              title: "Nenhum resultado",
              desc: 'Nenhum item corresponde a "figma". Tente outros termos.',
              action: "Limpar busca",
            },
            {
              emoji: "📬",
              title: "Caixa de entrada vazia",
              desc: "Você respondeu tudo! Aproveite a pausa.",
              action: null,
            },
          ].map((state) => (
            <div key={state.title} className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="text-3xl mb-3">{state.emoji}</div>
              <p className="font-semibold text-foreground mb-1 text-sm">{state.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{state.desc}</p>
              {state.action && (
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium">
                  {state.action}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Progress */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Indicadores de Progresso</h2>
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          {[
            { label: "Upload concluído",   value: 100, color: "bg-success" },
            { label: "Processando dados",  value: 68,  color: "bg-primary" },
            { label: "Aguardando aprovação", value: 35, color: "bg-warning" },
            { label: "Falha no processo",  value: 20,  color: "bg-destructive" },
          ].map((p) => (
            <div key={p.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-foreground">{p.label}</span>
                <span className="text-sm font-mono text-muted-foreground">{p.value}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${p.color}`}
                  style={{ width: `${p.value}%` }}
                />
              </div>
            </div>
          ))}

          {/* Skeleton */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Skeleton Loading</p>
            <div className="space-y-2.5">
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
              <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
            </div>
          </div>
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Regras de Feedback</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Feedback imediato (< 100ms) para toda ação do usuário",       ok: true },
            { rule: "Toast para confirmações; dialog apenas para ações destrutivas", ok: true },
            { rule: "Estado vazio sempre com contexto e próximo passo",             ok: true },
            { rule: "Mensagem de erro: específica, nunca 'Erro desconhecido'",      ok: true },
            { rule: "Usar dialog para notificações informativas (use toast)",       ok: false },
            { rule: "Empilhar mais de 3 toasts simultâneos na tela",               ok: false },
            { rule: "Omitir botão 'Cancelar' em dialogs de confirmação",            ok: false },
            { rule: "Loading spinner sem tempo máximo estimado em operações longas", ok: false },
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
