const toneAttributes = [
  { attr: "Claro",      desc: "Prefira palavras simples. Evite jargão técnico desnecessário." },
  { attr: "Direto",     desc: "Vá ao ponto. Sem rodeios nem frases de preenchimento." },
  { attr: "Útil",       desc: "Cada texto deve ajudar o usuário a completar uma tarefa." },
  { attr: "Humano",     desc: "Escreva como uma pessoa, não como um manual técnico." },
]

const buttonExamples = [
  { good: "Salvar alterações",  bad: "OK",             context: "Confirmar edição" },
  { good: "Excluir projeto",    bad: "Confirmar",      context: "Ação destrutiva" },
  { good: "Criar conta grátis", bad: "Submit",         context: "CTA de cadastro" },
  { good: "Fazer upload",       bad: "Processar",      context: "Upload de arquivo" },
  { good: "Continuar",          bad: "Próximo passo",  context: "Stepper / wizard" },
  { good: "Ver detalhes",       bad: "Clique aqui",    context: "Link de ação" },
]

const errorMessages = [
  { good: "E-mail inválido. Use o formato nome@dominio.com", bad: "Formato inválido",         field: "Email" },
  { good: "Senha com mínimo de 8 caracteres",                bad: "Campo obrigatório",        field: "Senha" },
  { good: "Não foi possível salvar. Tente novamente.",        bad: "Erro 500",                field: "Genérico" },
  { good: "Você atingiu o limite de 10 projetos do plano Free.", bad: "Limite atingido.",     field: "Limite" },
]

const capitalization = [
  { rule: "Títulos de página",   style: "Title Case",       example: "Configurações de Conta" },
  { rule: "Rótulos de campo",    style: "Sentence case",    example: "Nome completo" },
  { rule: "Botões",              style: "Sentence case",    example: "Salvar alterações" },
  { rule: "Categorias / badges", style: "ALL CAPS",         example: "NOVO · PRO · BETA" },
  { rule: "Tooltips",            style: "Sentence case",    example: "Clique para copiar o link" },
  { rule: "Placeholders",        style: "Sentence case",    example: "Ex: leandro@email.com" },
]

const microcopy = [
  {
    context: "Placeholder",
    good: "Ex: leandro@empresa.com",
    bad: "Digite seu e-mail aqui",
    why: "Mostra o formato esperado, não repete o label",
  },
  {
    context: "Helper text",
    good: "Mínimo 8 caracteres, 1 número e 1 maiúscula",
    bad: "Campo obrigatório",
    why: "Instrução proativa evita erros",
  },
  {
    context: "Loading",
    good: "Salvando suas alterações…",
    bad: "Carregando…",
    why: "Específico sobre o que está acontecendo",
  },
  {
    context: "Empty state",
    good: "Nenhum projeto ainda. Crie o primeiro.",
    bad: "Sem dados",
    why: "Sugere a próxima ação claramente",
  },
  {
    context: "Sucesso",
    good: "Projeto criado! Você pode editar a qualquer momento.",
    bad: "Operação realizada com sucesso.",
    why: "Confirma e orienta o próximo passo",
  },
  {
    context: "Erro de rede",
    good: "Sem conexão. Verifique o Wi-Fi e tente novamente.",
    bad: "Erro de rede",
    why: "Diz o que fazer, não só o que deu errado",
  },
]

export default function WritingPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">UX & Padrões</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Writing Guidelines</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Tom de voz, microcopy e regras de escrita para uma interface consistente, clara e humana.
        </p>
      </div>

      {/* Tom de voz */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Tom de Voz</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {toneAttributes.map((t) => (
            <div key={t.attr} className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold text-foreground mb-2">{t.attr}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-success/20 bg-success/5 p-4">
            <p className="text-xs font-semibold text-success mb-2 uppercase tracking-widest">Somos</p>
            <p className="text-sm text-foreground leading-relaxed">
              Claros, diretos e prestáveis. Usamos a segunda pessoa ("você"), frases curtas e verbos de ação.
            </p>
          </div>
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-xs font-semibold text-destructive mb-2 uppercase tracking-widest">Não somos</p>
            <p className="text-sm text-foreground leading-relaxed">
              Formais em excesso, técnicos sem necessidade, vagos ou condescendentes ("facilmente", "simplesmente").
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Labels de Botão</h2>
        <p className="text-sm text-muted-foreground mb-5">Sempre: Verbo + Objeto. Seja específico sobre o que vai acontecer.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Contexto</th>
                <th className="text-left px-4 py-3 font-semibold text-success">✓ Use</th>
                <th className="text-left px-4 py-3 font-semibold text-destructive">✗ Evite</th>
              </tr>
            </thead>
            <tbody>
              {buttonExamples.map((ex, i) => (
                <tr key={ex.context} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                  <td className="px-4 py-3 text-muted-foreground">{ex.context}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-medium">
                      {ex.good}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border text-muted-foreground text-xs line-through">
                      {ex.bad}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Error messages */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Mensagens de Erro</h2>
        <p className="text-sm text-muted-foreground mb-5">Diga o que deu errado + o que o usuário pode fazer. Nunca culpe o usuário.</p>
        <div className="space-y-3">
          {errorMessages.map((err) => (
            <div key={err.field} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{err.field}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-success/8 border border-success/20 px-3 py-2">
                  <p className="text-xs font-semibold text-success mb-1">✓ Bom</p>
                  <p className="text-sm text-foreground">{err.good}</p>
                </div>
                <div className="rounded-lg bg-destructive/8 border border-destructive/20 px-3 py-2">
                  <p className="text-xs font-semibold text-destructive mb-1">✗ Ruim</p>
                  <p className="text-sm text-foreground">{err.bad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capitalização */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Capitalização</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Elemento</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Estilo</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {capitalization.map((row, i) => (
                <tr key={row.rule} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                  <td className="px-4 py-3 text-foreground">{row.rule}</td>
                  <td className="px-4 py-3">
                    <code className="text-xs font-mono text-primary bg-primary/8 px-2 py-0.5 rounded">{row.style}</code>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Microcopy */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Microcopy</h2>
        <p className="text-sm text-muted-foreground mb-5">Textos pequenos com grande impacto na experiência.</p>
        <div className="space-y-3">
          {microcopy.map((m) => (
            <div key={m.context} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{m.context}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                <div className="rounded-lg bg-success/8 border border-success/20 px-3 py-2">
                  <p className="text-xs font-semibold text-success mb-1">✓ Use</p>
                  <p className="text-sm text-foreground">{m.good}</p>
                </div>
                <div className="rounded-lg bg-destructive/8 border border-destructive/20 px-3 py-2">
                  <p className="text-xs font-semibold text-destructive mb-1">✗ Evite</p>
                  <p className="text-sm text-foreground">{m.bad}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{m.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Regras de Escrita</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Use a 2ª pessoa: 'Você' em vez de 'O usuário'",                ok: true },
            { rule: "Prefira verbos de ação: Salvar, Criar, Excluir, Enviar",       ok: true },
            { rule: "Frases curtas. Máximo 15-20 palavras por sentença.",            ok: true },
            { rule: "Escreva o que vai acontecer, não o que o usuário deve fazer",  ok: true },
            { rule: "Usar palavras que minimizam: 'apenas', 'simplesmente', 'fácil'", ok: false },
            { rule: "Textos em maiúsculas para ênfase (use negrito ou cor)",        ok: false },
            { rule: "Mensagens vagas: 'Ocorreu um erro' sem mais detalhes",         ok: false },
            { rule: "Ponto de exclamação em contextos sérios (erro, alerta)",       ok: false },
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
