"use client"

import { Brain, Cursor, Stack, Layout, Timer, Eye } from "@phosphor-icons/react"

const laws = [
  {
    icon: Brain,
    name: "Hick's Law",
    tagline: "Menos escolhas = decisão mais rápida",
    description: "O tempo de decisão cresce com o número de opções disponíveis.",
    dos: [
      "Máximo 5-7 itens de navegação",
      "Formulários em etapas (progressive disclosure)",
      "Selecionar opção padrão quando possível",
      "Ocultar filtros avançados",
    ],
    donts: [
      "15 itens em um menu",
      "20 campos em um único formulário",
    ],
  },
  {
    icon: Cursor,
    name: "Fitts' Law",
    tagline: "Alvos maiores e mais próximos = clique mais rápido",
    description: "O tempo para atingir um alvo é função de sua distância e tamanho.",
    dos: [
      "Botões primários: mín. 48px de altura",
      "Touch targets mobile: 44×44px mínimo",
      "CTAs perto do conteúdo relacionado",
      'Usar "magic corners" (bordas infinitas)',
    ],
    donts: [
      "Botão importante no canto oposto da tela",
      "Links de texto tiny em mobile",
    ],
  },
  {
    icon: Stack,
    name: "Miller's Law",
    tagline: "7 ± 2 itens na memória de trabalho",
    description: "A pessoa média retém 7 (±2) chunks de informação simultaneamente.",
    dos: [
      "Agrupar listas em blocos de 5-7",
      "Quebrar conteúdo longo com subtítulos",
      "Formatar telefones como 555-123-4567",
      "Máximo 7 itens de menu",
    ],
    donts: [
      "Lista contínua sem agrupamento",
      "Formulário com 15 campos de uma vez",
    ],
  },
  {
    icon: Eye,
    name: "Von Restorff",
    tagline: "O que se destaca é lembrado",
    description: "Um item que se diferencia dos demais é mais provável de ser memorizado.",
    dos: [
      "CTA com cor distinta de todos outros elementos",
      "Plano recomendado em destaque no pricing",
      "Badge/callout para funcionalidade nova",
      "Apenas 1 botão primário por seção",
    ],
    donts: [
      "5 botões da mesma cor e tamanho",
      "Destaque para muitos elementos ao mesmo tempo",
    ],
  },
  {
    icon: Layout,
    name: "Jakob's Law",
    tagline: "Usuários preferem o que já conhecem",
    description: "Pessoas passam mais tempo em outros sites — preferem que o seu funcione igual.",
    dos: [
      "Logo no canto superior esquerdo = Home",
      'Usar "Entrar" não "Acesse o Portal"',
      "Ícone lixeira = deletar",
      "Vermelho = erro, verde = sucesso",
    ],
    donts: [
      "Logo leva para 'Sobre Nós'",
      "Ícone estrela significa deletar",
    ],
  },
  {
    icon: Timer,
    name: "Doherty Threshold",
    tagline: "Resposta em < 400ms mantém o usuário engajado",
    description: "Produtividade dispara quando usuário e sistema interagem abaixo de 400ms.",
    dos: [
      "Feedback visual imediato no clique",
      "Skeleton screens durante loading",
      "UI otimista (atualiza antes da resposta)",
      "Micro-animações para mascarar delay",
    ],
    donts: [
      "Botão sem feedback após clique",
      "Tela em branco durante carregamento",
    ],
  },
]

const gestalt = [
  {
    name: "Proximidade",
    description: "Elementos próximos são percebidos como grupo. Use espaçamento menor dentro do grupo e maior entre grupos.",
  },
  {
    name: "Similaridade",
    description: "Elementos com aparência similar são agrupados. Use mesma cor para todos os links, mesmo peso para H2s.",
  },
  {
    name: "Região Comum",
    description: "Elementos dentro de um limite comum formam grupo. Cards, bordas e backgrounds comunicam agrupamento.",
  },
  {
    name: "Figura e Fundo",
    description: "O olho diferencia objeto do fundo. Use sombras para modals, overlay escuro, blur de fundo.",
  },
  {
    name: "Pregnância",
    description: "O cérebro interpreta como a forma mais simples possível. Prefira formas geométricas e ícones simples.",
  },
  {
    name: "Continuidade",
    description: "Elementos conectados visualmente são percebidos como relacionados. Use linhas para conectar etapas.",
  },
]

export default function PrinciplesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">UX & Padrões</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Princípios UX</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Leis psicológicas aplicadas ao design de interfaces. Não são regras rígidas —
          são ferramentas para tomar decisões de design embasadas.
        </p>
      </div>

      {/* UX Laws */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-foreground mb-6">Leis de UX</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {laws.map((law) => {
            const Icon = law.icon
            return (
              <div key={law.name} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} weight="duotone" className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{law.name}</h3>
                    <p className="text-xs text-muted-foreground">{law.tagline}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{law.description}</p>
                <div className="space-y-1">
                  {law.dos.map((d) => (
                    <div key={d} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="text-success mt-0.5 shrink-0">✓</span>
                      {d}
                    </div>
                  ))}
                  {law.donts.map((d) => (
                    <div key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-destructive mt-0.5 shrink-0">✗</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Gestalt */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-foreground mb-2">Princípios Gestalt</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Como o olho humano percebe e agrupa elementos visuais.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gestalt.map((g) => (
            <div key={g.name} className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-1.5">{g.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Emocional */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Design Emocional (Don Norman)</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Três níveis de processamento emocional — projete para todos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              level: "Visceral",
              subtitle: "Primeiro impacto (< 50ms)",
              color: "bg-primary/10 border-primary/20",
              items: ["Cores e formas bonitas", "Fotografia de qualidade", "Microinterações", "Impressão inicial"],
            },
            {
              level: "Comportamental",
              subtitle: "Usabilidade e função",
              color: "bg-success/10 border-success/20",
              items: ["Funciona como esperado", "Feedback imediato", "Performance", "Confiabilidade"],
            },
            {
              level: "Reflexivo",
              subtitle: "Significado e identidade",
              color: "bg-accent/10 border-accent/20",
              items: ["Story da marca", "Valores compartilhados", "Memória de longo prazo", '"Esse produto sou eu"'],
            },
          ].map((level) => (
            <div key={level.level} className={`rounded-xl border p-5 ${level.color}`}>
              <h3 className="font-semibold text-foreground mb-0.5">{level.level}</h3>
              <p className="text-xs text-muted-foreground mb-3">{level.subtitle}</p>
              <ul className="space-y-1.5">
                {level.items.map((item) => (
                  <li key={item} className="text-xs text-foreground flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-foreground/40 shrink-0" />
                    {item}
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
