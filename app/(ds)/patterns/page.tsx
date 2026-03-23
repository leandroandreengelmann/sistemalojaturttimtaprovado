"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MagnifyingGlass,
  Bell,
  Gear,
  Plus,
  ArrowRight,
  User,
  ChartBar,
  Package,
  CreditCard,
  CheckCircle,
  DotsThree,
  House,
  CaretRight,
} from "@phosphor-icons/react"


export default function PatternsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">UX & Padrões</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Padrões</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Composições reutilizáveis de componentes. Cada padrão aplica múltiplos
          princípios de UX psychology simultaneamente.
        </p>
      </div>

      {/* Topbar */}
      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">App Header</h2>
          <p className="text-sm text-muted-foreground">Serial Position: ações principais à esquerda e à direita.</p>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-4 px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary-foreground">DS</span>
              </div>
              <span className="font-semibold text-sm text-foreground">Design System</span>
            </div>
            <div className="relative max-w-xs flex-1 hidden sm:block">
              <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8 h-8 text-xs" placeholder="Buscar..." />
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell size={16} className="text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Gear size={16} className="text-muted-foreground" />
              </Button>
              <Avatar className="h-7 w-7 ml-1">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Breadcrumb + Page Header</h2>
          <p className="text-sm text-muted-foreground">Goal Gradient: mostra ao usuário onde está e quanto falta.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <House size={12} />
                  Dashboard
                </button>
                <CaretRight size={10} className="text-muted-foreground" />
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Usuários
                </button>
                <CaretRight size={10} className="text-muted-foreground" />
                <span className="text-xs text-foreground font-medium">João Silva</span>
              </div>
              <h1 className="text-[1.563rem] font-bold text-foreground">João Silva</h1>
              <p className="text-sm text-muted-foreground">Membro desde mar 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <DotsThree size={16} weight="bold" />
              </Button>
              <Button size="sm">
                <PencilSimpleIcon />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Metric Cards</h2>
          <p className="text-sm text-muted-foreground">Focal Point: número grande em destaque. Serial Position: mais importante primeiro.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: User,      label: "Usuários",    value: "12,543", delta: "+12%",  up: true },
            { icon: ChartBar,  label: "Receita",     value: "R$48K",  delta: "+8%",   up: true },
            { icon: Package,   label: "Pedidos",     value: "1,840",  delta: "-3%",   up: false },
            { icon: CreditCard,label: "Conversão",   value: "3.2%",   delta: "+0.4%", up: true },
          ].map((m) => {
            const Icon = m.icon
            return (
              <div key={m.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
                  <Icon size={16} weight="duotone" className="text-muted-foreground" />
                </div>
                <p className="text-[1.953rem] font-bold text-foreground leading-none mb-1">{m.value}</p>
                <p className={`text-xs font-medium ${m.up ? "text-success" : "text-destructive"}`}>
                  {m.delta} vs mês anterior
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Form Pattern */}
      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Formulário</h2>
          <p className="text-sm text-muted-foreground">Hick's Law: campos agrupados. Stepping Stone: campos mais simples primeiro.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 max-w-lg">
          <div className="mb-5">
            <h3 className="font-semibold text-foreground">Criar conta</h3>
            <p className="text-sm text-muted-foreground">Leva menos de 2 minutos</p>
          </div>
          {/* Progress (Goal Gradient) */}
          <div className="flex items-center gap-2 mb-6">
            {["Básico", "Endereço", "Confirmação"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs ${i === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {step}
                </span>
                {i < 2 && <CaretRight size={12} className="text-muted-foreground" />}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="fn">Nome</Label>
                <Input id="fn" placeholder="João" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ln">Sobrenome</Label>
                <Input id="ln" placeholder="Silva" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fe">Email</Label>
              <Input id="fe" type="email" placeholder="joao@email.com" />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="ghost" size="sm">Voltar</Button>
            <Button size="sm">
              Próximo
              <ArrowRight size={14} weight="bold" />
            </Button>
          </div>
        </div>
      </section>

      {/* Table Pattern */}
      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Tabela de Dados</h2>
          <p className="text-sm text-muted-foreground">Serial Position: ações à direita. Von Restorff: status com badge colorido.</p>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Table header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="relative max-w-xs">
              <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8 h-8 text-xs w-48" placeholder="Buscar usuário..." />
            </div>
            <Button size="sm">
              <Plus size={14} weight="bold" />
              Novo
            </Button>
          </div>
          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_100px_80px] px-4 py-2 bg-muted/50 border-b border-border">
            {["Nome", "Email", "Status", ""].map((h) => (
              <span key={h} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{h}</span>
            ))}
          </div>
          {/* Rows */}
          {[
            { name: "Ana Costa",    email: "ana@email.com",   status: "Ativo",    ok: true },
            { name: "Bruno Melo",   email: "bruno@email.com", status: "Pendente", ok: false },
            { name: "Carla Dias",   email: "carla@email.com", status: "Ativo",    ok: true },
            { name: "Diego Rocha",  email: "diego@email.com", status: "Inativo",  ok: false },
          ].map((row) => (
            <div
              key={row.email}
              className="grid grid-cols-[1fr_1fr_100px_80px] px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors items-center"
            >
              <div className="flex items-center gap-2.5">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {row.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground font-medium">{row.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{row.email}</span>
              <Badge
                className={row.ok
                  ? "bg-success/10 text-success border-success/20 hover:bg-success/20 w-fit"
                  : "bg-muted text-muted-foreground border-border hover:bg-muted w-fit"
                }
                variant="outline"
              >
                {row.ok && <CheckCircle size={10} weight="fill" />}
                {row.status}
              </Badge>
              <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto">
                <DotsThree size={16} weight="bold" />
              </Button>
            </div>
          ))}
          {/* Footer */}
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">4 usuários</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Anterior</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">Próximo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Empty State */}
      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Empty State</h2>
          <p className="text-sm text-muted-foreground">Peak-End Rule: transforme estados vazios em oportunidades de ação positiva.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Package,
              title: "Nenhum pedido ainda",
              desc: "Quando você criar seu primeiro pedido, ele aparecerá aqui.",
              action: "Criar primeiro pedido",
              variant: "default" as const,
            },
            {
              icon: MagnifyingGlass,
              title: "Nenhum resultado",
              desc: 'Nenhum item corresponde a "design system". Tente outros termos.',
              action: "Limpar busca",
              variant: "outline" as const,
            },
            {
              icon: CheckCircle,
              title: "Tudo em dia!",
              desc: "Você respondeu todas as notificações. Aproveite a pausa.",
              action: null,
              variant: "default" as const,
            },
          ].map((state) => {
            const Icon = state.icon
            return (
              <div key={state.title} className="rounded-xl border border-border bg-card p-8 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Icon size={28} weight="duotone" className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">{state.title}</h3>
                <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{state.desc}</p>
                {state.action && (
                  <Button size="sm" variant={state.variant}>
                    <Plus size={14} weight="bold" />
                    {state.action}
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Upload / Drag & Drop */}
      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Upload & Drag-and-Drop</h2>
          <p className="text-sm text-muted-foreground">Affordance: dashed border comunica área droppable. Feedback imediato ao arrastar.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Idle */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Estado padrão</p>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center text-center bg-background cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors group">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                <ArrowRight size={20} weight="duotone" className="text-muted-foreground rotate-[-90deg] group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-medium text-foreground mb-0.5">
                Arraste arquivos aqui ou{" "}
                <span className="text-primary cursor-pointer hover:underline">clique para selecionar</span>
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, PDF — máx. 10MB por arquivo</p>
            </div>
          </div>

          {/* Drag over */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Ao arrastar (drag over)</p>
            <div className="border-2 border-dashed border-primary rounded-xl p-8 flex flex-col items-center text-center bg-primary/5">
              <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                <ArrowRight size={20} weight="duotone" className="text-primary rotate-[-90deg]" />
              </div>
              <p className="text-sm font-medium text-primary mb-0.5">Solte para fazer upload</p>
              <p className="text-xs text-primary/70">2 arquivos detectados</p>
            </div>
          </div>

          {/* With files */}
          <div className="rounded-xl border border-border bg-card p-5 sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Com arquivos</p>
            <div className="border-2 border-dashed border-border rounded-xl p-4 bg-background space-y-2">
              {[
                { name: "design-brief.pdf",  size: "2.4 MB", status: "done" },
                { name: "mockup-v2.fig",     size: "8.1 MB", status: "uploading", progress: 65 },
                { name: "assets.zip",        size: "14.2 MB", status: "error" },
              ].map((file) => (
                <div key={file.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    file.status === "done" ? "bg-success/10 text-success" :
                    file.status === "error" ? "bg-destructive/10 text-destructive" :
                    "bg-primary/10 text-primary"
                  }`}>
                    {file.name.split(".").pop()?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <span className="text-xs text-muted-foreground ml-2 shrink-0">{file.size}</span>
                    </div>
                    {file.status === "uploading" && (
                      <div className="h-1 bg-muted rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${file.progress}%` }} />
                      </div>
                    )}
                    {file.status === "error" && (
                      <p className="text-xs text-destructive mt-0.5">Falha no upload. Tente novamente.</p>
                    )}
                  </div>
                  <button className="text-muted-foreground hover:text-foreground text-sm shrink-0">✕</button>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center py-1">
                + Arraste mais arquivos ou <span className="text-primary cursor-pointer">clique para adicionar</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Master / Detail */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Master / Detail</h2>
          <p className="text-sm text-muted-foreground">Progressive Disclosure: lista compacta + detalhe completo sem troca de página.</p>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex h-80">
            {/* List (master) */}
            <div className="w-56 shrink-0 border-r border-border flex flex-col">
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <MagnifyingGlass size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-7 h-7 text-xs" placeholder="Buscar..." />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {[
                  { name: "Ana Costa",   role: "Designer",    active: false },
                  { name: "Bruno Melo",  role: "Dev Frontend", active: true  },
                  { name: "Carla Dias",  role: "Product",      active: false },
                  { name: "Diego Rocha", role: "Dev Backend",  active: false },
                  { name: "Eva Lima",    role: "QA",           active: false },
                ].map((person) => (
                  <div
                    key={person.name}
                    className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer border-b border-border/50 transition-colors ${
                      person.active ? "bg-primary/8 border-l-2 border-l-primary" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold ${
                      person.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {person.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-medium truncate ${person.active ? "text-primary" : "text-foreground"}`}>
                        {person.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail */}
            <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                    BM
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Bruno Melo</p>
                    <p className="text-xs text-muted-foreground">Dev Frontend · Ativo</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs">Mensagem</Button>
                  <Button size="sm" className="h-7 text-xs">Editar</Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Projetos",  value: "12" },
                  { label: "Tarefas",   value: "34" },
                  { label: "Reviews",   value: "8" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-border bg-background p-3 text-center">
                    <p className="text-lg font-bold text-foreground leading-none">{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex-1 rounded-lg border border-border bg-background p-3 overflow-hidden">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Atividade recente</p>
                <div className="space-y-2">
                  {[
                    "Fez merge do PR #142 — Refactor auth flow",
                    "Comentou em Design System v2",
                    "Criou tarefa: Implementar dark mode toggle",
                  ].map((a) => (
                    <p key={a} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-primary shrink-0">·</span>
                      {a}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Lista: w-56 border-r — Ativo: bg-primary/8 border-l-2 border-l-primary — Detalhe: flex-1
        </p>
      </section>
    </div>
  )
}

function PencilSimpleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
    </svg>
  )
}
