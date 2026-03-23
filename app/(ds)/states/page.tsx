"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, XCircle, Warning, Info, Spinner } from "@phosphor-icons/react"

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-lg font-semibold text-foreground mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-6">{description}</p>}
      {!description && <div className="mb-6" />}
      {children}
    </section>
  )
}

function StateLabel({ label, active }: { label: string; active?: boolean }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-widest mt-2 ${active ? "text-primary" : "text-muted-foreground"}`}>
      {label}
    </p>
  )
}

export default function StatesPage() {
  const [loading, setLoading] = useState(false)

  function simulateLoad() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Componentes</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Estados</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Cada componente comunica seu estado atual ao usuário — default, hover, focus, active,
          disabled, loading, error e success. Consistência nos estados reduz erros e aumenta confiança.
        </p>
      </div>

      {/* Botões */}
      <Section title="Button" description="Todos os estados interativos de ação primária.">
        <div className="flex flex-wrap gap-8 items-start">
          <div className="flex flex-col items-center">
            <Button>Default</Button>
            <StateLabel label="Default" />
          </div>
          <div className="flex flex-col items-center">
            <Button className="ring-2 ring-ring ring-offset-2">Focus</Button>
            <StateLabel label="Focus" active />
          </div>
          <div className="flex flex-col items-center">
            <Button className="opacity-90 scale-[0.98]">Active</Button>
            <StateLabel label="Active" />
          </div>
          <div className="flex flex-col items-center">
            <Button disabled>Disabled</Button>
            <StateLabel label="Disabled" />
          </div>
          <div className="flex flex-col items-center">
            <Button disabled={loading} onClick={simulateLoad}>
              {loading && <Spinner size={14} className="animate-spin" />}
              {loading ? "Carregando..." : "Clique para testar"}
            </Button>
            <StateLabel label="Loading" />
          </div>
          <div className="flex flex-col items-center">
            <Button className="bg-destructive text-white hover:bg-destructive/90">Destructive</Button>
            <StateLabel label="Destructive" />
          </div>
        </div>
      </Section>

      {/* Inputs */}
      <Section title="Input" description="Estados de campo de texto — cada um comunica uma informação diferente ao usuário.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
          <div>
            <Label>Default</Label>
            <Input className="mt-1.5" placeholder="Placeholder..." />
            <StateLabel label="Default" />
          </div>
          <div>
            <Label>Focus</Label>
            <Input className="mt-1.5 border-ring ring-3 ring-ring/50" placeholder="Em foco..." />
            <StateLabel label="Focus" active />
          </div>
          <div>
            <Label>Preenchido</Label>
            <Input className="mt-1.5" defaultValue="valor preenchido" />
            <StateLabel label="Filled" />
          </div>
          <div>
            <Label className="text-destructive">Erro</Label>
            <Input className="mt-1.5 border-destructive ring-3 ring-destructive/20" defaultValue="valor inválido" />
            <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
              <XCircle size={12} weight="fill" />Campo obrigatório
            </p>
            <StateLabel label="Error" />
          </div>
          <div>
            <Label className="text-success">Sucesso</Label>
            <Input className="mt-1.5 border-success/50 ring-3 ring-success/20" defaultValue="valor@válido.com" />
            <p className="text-xs text-success mt-1.5 flex items-center gap-1">
              <CheckCircle size={12} weight="fill" />Email válido
            </p>
            <StateLabel label="Success" active />
          </div>
          <div>
            <Label className="opacity-50">Desabilitado</Label>
            <Input className="mt-1.5" placeholder="Indisponível" disabled />
            <StateLabel label="Disabled" />
          </div>
          <div>
            <Label>Readonly</Label>
            <Input className="mt-1.5 bg-muted cursor-default" defaultValue="Somente leitura" readOnly />
            <StateLabel label="Readonly" />
          </div>
          <div>
            <Label>Carregando</Label>
            <div className="relative mt-1.5">
              <Input placeholder="Buscando..." disabled className="pr-8" />
              <Spinner size={14} className="animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            <StateLabel label="Loading" />
          </div>
        </div>
      </Section>

      {/* Badge */}
      <Section title="Badge" description="Estados de status — comunicam condição de um item.">
        <div className="flex flex-wrap gap-6 items-start">
          {[
            { label: "Ativo",     cls: "bg-success/15 text-success border border-success/25",    state: "Success" },
            { label: "Pendente",  cls: "bg-warning/15 text-warning border border-warning/25",    state: "Warning" },
            { label: "Inativo",   cls: "bg-muted text-muted-foreground border border-border",    state: "Neutral" },
            { label: "Erro",      cls: "bg-destructive/10 text-destructive border border-destructive/25", state: "Error" },
            { label: "Info",      cls: "bg-info/10 text-info border border-info/25",             state: "Info" },
            { label: "Novo",      cls: "bg-primary text-primary-foreground",                     state: "Primary" },
          ].map(({ label, cls, state }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Badge className={cls}>{label}</Badge>
              <StateLabel label={state} />
            </div>
          ))}
        </div>
      </Section>

      {/* Checkbox & Switch */}
      <Section title="Checkbox & Switch" description="Seleção binária com estados visuais distintos.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Checkbox */}
          <div className="flex flex-col items-center gap-2">
            <Checkbox />
            <StateLabel label="Unchecked" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Checkbox defaultChecked />
            <StateLabel label="Checked" active />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Checkbox disabled />
            <StateLabel label="Disabled" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Checkbox defaultChecked disabled />
            <StateLabel label="Disabled checked" />
          </div>
          {/* Switch */}
          <div className="flex flex-col items-center gap-2">
            <Switch />
            <StateLabel label="Off" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch defaultChecked />
            <StateLabel label="On" active />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch disabled />
            <StateLabel label="Disabled off" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch defaultChecked disabled />
            <StateLabel label="Disabled on" />
          </div>
        </div>
      </Section>

      {/* Progress */}
      <Section title="Progress" description="Feedback de progresso — mantém o usuário engajado durante operações longas.">
        <div className="space-y-5 max-w-md">
          {[
            { label: "Iniciando",   value: 5,   cls: "" },
            { label: "Em progresso",value: 45,  cls: "" },
            { label: "Quase lá",    value: 80,  cls: "[&>div]:bg-warning" },
            { label: "Concluído",   value: 100, cls: "[&>div]:bg-success" },
            { label: "Erro",        value: 60,  cls: "[&>div]:bg-destructive" },
          ].map(({ label, value, cls }) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-foreground">{label}</span>
                <span className="text-sm font-semibold text-foreground">{value}%</span>
              </div>
              <Progress value={value} className={cls} />
            </div>
          ))}
        </div>
      </Section>

      {/* Loading / Skeleton */}
      <Section title="Loading & Skeleton" description="Perceived performance — feedback visual enquanto o conteúdo carrega.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </div>
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-5/6" />
            <Skeleton className="h-2.5 w-4/6" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-2.5 w-3/4" />
                  <Skeleton className="h-2 w-1/2" />
                </div>
                <Skeleton className="h-5 w-12 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feedback messages */}
      <Section title="Mensagens de Feedback" description="Comunicação clara de resultado — o usuário sempre sabe o que aconteceu.">
        <div className="space-y-3 max-w-xl">
          {[
            { icon: CheckCircle, color: "text-success", bg: "bg-success/10 border-success/30", title: "Sucesso",   body: "Alterações salvas com sucesso." },
            { icon: Warning,     color: "text-warning",  bg: "bg-warning/10 border-warning/30",   title: "Atenção",   body: "Esta ação afetará todos os usuários." },
            { icon: XCircle,     color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", title: "Erro", body: "Não foi possível salvar. Tente novamente." },
            { icon: Info,        color: "text-info",    bg: "bg-info/10 border-info/30",         title: "Info",      body: "Nova versão disponível. Atualize quando puder." },
          ].map(({ icon: Icon, color, bg, title, body }) => (
            <div key={title} className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${bg}`}>
              <Icon size={16} className={`${color} mt-0.5 shrink-0`} weight="fill" />
              <div>
                <p className={`text-sm font-semibold ${color}`}>{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Empty state */}
      <Section title="Empty State" description="Quando não há conteúdo — oriente o próximo passo em vez de mostrar vazio.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          {[
            { emoji: "📭", title: "Nenhum resultado",    body: "Tente ajustar os filtros.",     action: "Limpar filtros",  variant: "outline" as const },
            { emoji: "📁", title: "Pasta vazia",         body: "Adicione o primeiro arquivo.",  action: "Fazer upload",    variant: "default" as const },
            { emoji: "🔒", title: "Sem permissão",       body: "Solicite acesso ao admin.",     action: "Solicitar acesso",variant: "outline" as const },
          ].map(({ emoji, title, body, action, variant }) => (
            <div key={title} className="flex flex-col items-center text-center p-8 rounded-xl border border-dashed border-border bg-card">
              <span className="text-3xl mb-3">{emoji}</span>
              <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
              <p className="text-xs text-muted-foreground mb-4">{body}</p>
              <Button size="sm" variant={variant}>{action}</Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Princípios dos estados */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-5">Princípios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { n: "01", t: "Visibilidade do status", b: "O sistema sempre informa o usuário sobre o que está acontecendo — Nielsen's Heuristic #1." },
            { n: "02", t: "7 estados fundamentais", b: "Default → Hover → Focus → Active → Loading → Success/Error → Disabled. Cubra todos." },
            { n: "03", t: "Feedback ≤ 100ms",       b: "Estados de hover e focus devem responder em menos de 100ms para parecerem instantâneos." },
            { n: "04", t: "Nunca mude tamanho",     b: "Estados não devem alterar o tamanho do elemento — causam layout shift e desorientam." },
            { n: "05", t: "Disabled ≠ Invisível",   b: "Elementos desabilitados ainda comunicam que a funcionalidade existe — só não está disponível agora." },
            { n: "06", t: "Loading tem limite",      b: "Após 3s mostre progresso real. Após 10s mostre feedback e opção de cancelar." },
          ].map(({ n, t, b }) => (
            <div key={n} className="rounded-xl border border-border bg-card p-4 flex gap-3">
              <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0 h-fit mt-0.5">{n}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{t}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
