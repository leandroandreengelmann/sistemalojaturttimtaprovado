const chartColors = [
  { name: "chart-1", token: "--chart-1", light: "#7F56D9", dark: "#B692F6", use: "Série primária / linha principal" },
  { name: "chart-2", token: "--chart-2", light: "#17B26A", dark: "#47CD89", use: "Série secundária / comparativo" },
  { name: "chart-3", token: "--chart-3", light: "#2E90FA", dark: "#53B1FD", use: "Série terciária / informação" },
  { name: "chart-4", token: "--chart-4", light: "#F79009", dark: "#FDB022", use: "Série quaternária / alerta" },
  { name: "chart-5", token: "--chart-5", light: "#F04438", dark: "#F97066", use: "Série quinária / crítico" },
]

const barData = [
  { label: "Jan", value: 65 },
  { label: "Fev", value: 82 },
  { label: "Mar", value: 74 },
  { label: "Abr", value: 91 },
  { label: "Mai", value: 88 },
  { label: "Jun", value: 95 },
]

const lineData = [42, 58, 52, 71, 68, 85, 79, 92]

const donutData = [
  { label: "Direto",   value: 35, color: "#7F56D9" },
  { label: "Orgânico", value: 28, color: "#17B26A" },
  { label: "Social",   value: 22, color: "#2E90FA" },
  { label: "Email",    value: 15, color: "#F79009" },
]

export default function DataVizPage() {
  const maxBar = Math.max(...barData.map((d) => d.value))

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">UX & Padrões</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Data Visualization</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Paleta de gráficos, tipos de visualização e princípios para comunicar dados de forma clara e acessível.
        </p>
      </div>

      {/* Chart colors */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Paleta de Gráficos</h2>
        <div className="space-y-3">
          {chartColors.map((c) => (
            <div key={c.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="flex gap-2 shrink-0">
                <div className="w-7 h-7 rounded-md border border-border" style={{ background: c.light }} title="Light" />
                <div className="w-7 h-7 rounded-md border border-border bg-gray-900" style={{ background: c.dark }} title="Dark" />
              </div>
              <code className="w-20 shrink-0 text-sm font-mono font-semibold text-primary">{c.name}</code>
              <code className="text-xs font-mono text-muted-foreground hidden sm:block w-24 shrink-0">{c.token}</code>
              <span className="text-sm text-muted-foreground">{c.use}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bar chart */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Gráfico de Barras</h2>
        <p className="text-sm text-muted-foreground mb-5">Comparação de valores categóricos. Ideal para rankings e evolução mensal.</p>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-semibold text-foreground">Visitantes mensais</p>
              <p className="text-xs text-muted-foreground mt-0.5">Jan — Jun 2026</p>
            </div>
            <span className="text-[1.563rem] font-bold text-foreground">+18%</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {barData.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs font-mono text-muted-foreground">{d.value}</span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${(d.value / maxBar) * 100}%`,
                    background: "var(--chart-1)",
                    opacity: d.label === "Jun" ? 1 : 0.6,
                  }}
                />
                <span className="text-xs text-muted-foreground">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Line chart */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Gráfico de Linha</h2>
        <p className="text-sm text-muted-foreground mb-5">Tendências ao longo do tempo. Ideal para séries temporais contínuas.</p>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-semibold text-foreground">Taxa de conversão</p>
              <p className="text-xs text-muted-foreground mt-0.5">Últimas 8 semanas</p>
            </div>
            <div className="flex gap-3">
              {[{ label: "Atual", color: "var(--chart-1)" }, { label: "Anterior", color: "var(--chart-2)" }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 rounded" style={{ background: l.color }} />
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-32">
            {/* Grid lines */}
            {[0,1,2,3].map((i) => (
              <div key={i} className="absolute w-full border-t border-border/50" style={{ top: `${i * 33.3}%` }} />
            ))}
            {/* SVG line */}
            <svg className="w-full h-full" viewBox="0 0 280 100" preserveAspectRatio="none">
              <polyline
                points={lineData.map((v, i) => `${(i / (lineData.length - 1)) * 280},${100 - v}`).join(" ")}
                fill="none"
                stroke="var(--chart-1)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points={lineData.map((v, i) => `${(i / (lineData.length - 1)) * 280},${100 - (v * 0.8)}`).join(" ")}
                fill="none"
                stroke="var(--chart-2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 3"
              />
              {lineData.map((v, i) => (
                <circle
                  key={i}
                  cx={(i / (lineData.length - 1)) * 280}
                  cy={100 - v}
                  r="3"
                  fill="var(--chart-1)"
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Donut */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">Gráfico de Rosca (Donut)</h2>
        <p className="text-sm text-muted-foreground mb-5">Proporções de um todo. Máximo de 5-6 fatias para clareza.</p>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-8 flex-wrap">
            {/* Donut SVG */}
            <div className="relative shrink-0">
              <svg width="140" height="140" viewBox="0 0 36 36">
                {donutData.reduce<{ offset: number; elements: React.ReactNode[] }>(
                  (acc, d) => {
                    const pct = d.value
                    const el = (
                      <circle
                        key={d.label}
                        cx="18" cy="18" r="15.9"
                        fill="transparent"
                        stroke={d.color}
                        strokeWidth="3.5"
                        strokeDasharray={`${pct} ${100 - pct}`}
                        strokeDashoffset={-(acc.offset - 25)}
                        strokeLinecap="butt"
                      />
                    )
                    return { offset: acc.offset + pct, elements: [...acc.elements, el] }
                  },
                  { offset: 0, elements: [] }
                ).elements}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">100%</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3 flex-1">
              {donutData.map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: d.color }} />
                  <span className="text-sm text-foreground flex-1">{d.label}</span>
                  <span className="text-sm font-semibold text-foreground">{d.value}%</span>
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden hidden sm:block">
                    <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sparklines / KPI */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">KPI Cards com Sparkline</h2>
        <p className="text-sm text-muted-foreground mb-5">Métricas-chave com mini gráfico de tendência. Padrão de dashboard.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Receita",    value: "R$ 48.2k", delta: "+12%", positive: true,  data: [30,45,38,52,48,62,58,72] },
            { label: "Usuários",   value: "2.840",    delta: "+8%",  positive: true,  data: [60,55,65,58,70,65,75,80] },
            { label: "Churn",      value: "2.1%",     delta: "+0.4%", positive: false, data: [18,20,17,22,19,23,21,25] },
            { label: "NPS",        value: "72",       delta: "+5",   positive: true,  data: [55,60,58,65,62,68,65,72] },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
              <p className="text-xl font-bold text-foreground leading-none">{kpi.value}</p>
              <p className={`text-xs font-medium mt-1 ${kpi.positive ? "text-success" : "text-destructive"}`}>
                {kpi.delta} vs mês ant.
              </p>
              <svg className="w-full h-8 mt-3" viewBox="0 0 60 24" preserveAspectRatio="none">
                <polyline
                  points={kpi.data.map((v, i) => `${(i / (kpi.data.length - 1)) * 60},${24 - (v / 100) * 20}`).join(" ")}
                  fill="none"
                  stroke={kpi.positive ? "var(--chart-2)" : "var(--chart-5)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* Princípios */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Princípios de Data Viz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Data-ink ratio",    desc: "Maximize dados, minimize tinta. Remova grades, bordas e decorações desnecessárias." },
            { title: "Contexto sempre",   desc: "Inclua baseline, período e unidade. Um número sem contexto não comunica." },
            { title: "Cor com propósito", desc: "Use a paleta de chart tokens. Não adicione cores só para diferenciar séries sem significado." },
            { title: "Tooltip acessível", desc: "Hover sozinho não é suficiente. Adicione labels, legenda ou tabela alternativa." },
            { title: "Escala honesta",    desc: "Eixo Y sempre começa em zero em bar charts. Truncar a escala distorce a percepção." },
            { title: "Mobile first",      desc: "Gráficos em mobile: prefira barras horizontais a verticais e reduza o número de séries." },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold text-foreground mb-1.5 text-sm">{p.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quando usar cada tipo */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quando Usar Cada Tipo</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Tipo</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Use quando</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Evite quando</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Barras",       use: "Comparar categorias, rankings",         avoid: "Mais de 12 barras, séries temporais longas" },
                { type: "Linha",        use: "Tendências contínuas no tempo",          avoid: "Dados categóricos, poucas amostras (< 4)" },
                { type: "Donut/Pie",    use: "Proporções de um todo (< 6 partes)",    avoid: "Comparar magnitudes, muitas categorias" },
                { type: "Área",         use: "Volume e tendência acumulada",           avoid: "Múltiplas séries sobrepostas opacas" },
                { type: "Tabela",       use: "Precisão numérica, lookup, exportação", avoid: "Visualizar tendências ou padrões" },
                { type: "KPI / Number", use: "Métricas únicas com contexto delta",    avoid: "Comparações múltiplas simultâneas" },
              ].map((row, i) => (
                <tr key={row.type} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                  <td className="px-4 py-3 font-semibold text-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.use}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
