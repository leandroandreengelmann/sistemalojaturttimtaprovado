"use client"

import { useState } from "react"

// ── shadcn/ui components ─────────────────────────────────────────────────────
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Toaster } from "@/components/ui/sonner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ── icons ────────────────────────────────────────────────────────────────────
import {
  CheckCircle, Warning, XCircle, Info, Plus, ArrowRight, Trash, PencilSimple,
  Download, Bell, User, MagnifyingGlass, CaretDown, CopySimple, Star,
  AlignLeft, AlignCenterHorizontal, AlignRight, TextB, TextItalic, TextUnderline,
  GridFour, List, Columns, Lock, Eye, Package, EnvelopeSimple,
  TrendUp, TrendDown, DotsThree, Gear, ChatCircle, ShoppingCart,
  FilePlus, FileText, Folder, SignOut, UserPlus,
} from "@phosphor-icons/react"
import { toast } from "sonner"
import type { DateRange } from "react-day-picker"

// ── helpers ──────────────────────────────────────────────────────────────────
function Section({ id, title, description, children }: {
  id?: string; title: string; description?: string; children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-16">
      <div className="mb-5">
        <h2 className="text-[1.25rem] font-semibold text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function Sub({ label }: { label: string }) {
  return <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">{label}</p>
}

function Demo({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-wrap items-start gap-3 ${className}`}>
      {children}
    </div>
  )
}

// ── page ─────────────────────────────────────────────────────────────────────
export default function ComponentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [sliderVal, setSliderVal] = useState([40])
  const [otpVal, setOtpVal] = useState("")
  const [collOpen, setCollOpen] = useState(false)
  const [switchA, setSwitchA] = useState(true)
  const [switchB, setSwitchB] = useState(false)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Toaster richColors />

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Componentes</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Componentes</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Todos os componentes shadcn/ui com tokens do design system aplicados.
        </p>
      </div>

      {/* ── 1. ACCORDION ──────────────────────────────────────────────────── */}
      <Section id="accordion" title="Accordion" description="Revela conteúdo progressivamente (Progressive Disclosure). Reduz carga cognitiva inicial.">
        <Accordion type="single" collapsible className="max-w-xl">
          {[
            { value: "q1", q: "O que é um Design System?",       a: "Um conjunto de padrões reutilizáveis — componentes, tokens de design e diretrizes — que garantem consistência visual e de experiência em produtos digitais." },
            { value: "q2", q: "Por que usar tokens de design?",   a: "Tokens desacoplam decisões de design da implementação. Uma mudança no token reflete em todos os componentes automaticamente, facilitando theming e manutenção." },
            { value: "q3", q: "Como contribuir com componentes?", a: "Abra um PR com o novo componente seguindo a estrutura existente, inclua testes e atualize a documentação na página de componentes." },
          ].map(({ value, q, a }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Separator className="mb-16" />

      {/* ── 2. ALERT ──────────────────────────────────────────────────────── */}
      <Section id="alert" title="Alert" description="Feedback semântico imediato (Doherty Threshold). Cores consistentes (Jakob's Law).">
        <div className="space-y-3 max-w-xl">
          <Alert><Info size={16} className="text-info" /><AlertTitle>Info</AlertTitle><AlertDescription>Nota informativa sem ação imediata necessária.</AlertDescription></Alert>
          <Alert className="border-success/40 bg-success/8"><CheckCircle size={16} className="text-success" /><AlertTitle className="text-success">Sucesso</AlertTitle><AlertDescription>Alterações salvas com sucesso.</AlertDescription></Alert>
          <Alert className="border-warning/40 bg-warning/8"><Warning size={16} className="text-warning" /><AlertTitle className="text-warning">Atenção</AlertTitle><AlertDescription>Esta ação não pode ser desfeita.</AlertDescription></Alert>
          <Alert variant="destructive"><XCircle size={16} /><AlertTitle>Erro</AlertTitle><AlertDescription>Não foi possível salvar. Tente novamente.</AlertDescription></Alert>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 3. ALERT DIALOG ───────────────────────────────────────────────── */}
      <Section id="alert-dialog" title="Alert Dialog" description="Confirmação de ações destrutivas — força atenção do usuário (Forced Attention).">
        <Demo>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive"><Trash size={16} weight="bold" />Excluir conta</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir conta permanentemente?</AlertDialogTitle>
                <AlertDialogDescription>Esta ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente dos nossos servidores.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90">Sim, excluir</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline">Arquivar projeto</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Arquivar este projeto?</AlertDialogTitle>
                <AlertDialogDescription>O projeto ficará oculto da lista principal. Você pode restaurá-lo a qualquer momento em Arquivados.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Arquivar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 4. ASPECT RATIO ───────────────────────────────────────────────── */}
      <Section id="aspect-ratio" title="Aspect Ratio" description="Mantém proporções consistentes em mídias responsivas.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          {[{ ratio: 16/9, label: "16/9 — Vídeo" }, { ratio: 1, label: "1/1 — Quadrado" }, { ratio: 4/3, label: "4/3 — Foto" }].map(({ ratio, label }) => (
            <div key={label}>
              <AspectRatio ratio={ratio} className="rounded-xl bg-muted border border-border flex items-center justify-center">
                <span className="text-xs font-mono text-muted-foreground">{label}</span>
              </AspectRatio>
            </div>
          ))}
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 5. AVATAR ─────────────────────────────────────────────────────── */}
      <Section id="avatar" title="Avatar" description="Identidade visual de usuários. Social Proof aumenta confiança.">
        <div className="flex flex-wrap items-end gap-6">
          {[
            { size: "h-8 w-8",   fs: "text-[10px]", init: "JD", label: "xs" },
            { size: "h-10 w-10", fs: "text-xs",     init: "AB", label: "sm" },
            { size: "h-12 w-12", fs: "text-sm",     init: "MR", label: "md" },
            { size: "h-14 w-14", fs: "text-base",   init: "DS", label: "lg" },
            { size: "h-16 w-16", fs: "text-xl",     init: "PK", label: "xl" },
          ].map(({ size, fs, init, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Avatar className={size}><AvatarFallback className={`${fs} bg-primary/10 text-primary`}>{init}</AvatarFallback></Avatar>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex -space-x-3">
              {["JD","AB","MR","DS","+4"].map(i => (
                <Avatar key={i} className="ring-2 ring-background h-10 w-10"><AvatarFallback className="text-xs bg-primary/10 text-primary">{i}</AvatarFallback></Avatar>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">stack</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative">
              <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary/10 text-primary text-sm">ON</AvatarFallback></Avatar>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-background" />
            </div>
            <span className="text-xs text-muted-foreground">online</span>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 6. BADGE ──────────────────────────────────────────────────────── */}
      <Section id="badge" title="Badge" description="Von Restorff Effect — destaque visual para status, categorias e contadores.">
        <div className="space-y-4">
          <div><Sub label="Variantes" />
            <Demo>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </Demo>
          </div>
          <div><Sub label="Semânticos" />
            <Demo>
              <Badge className="bg-success/15 text-success border border-success/25">Success</Badge>
              <Badge className="bg-warning/15 text-warning border border-warning/25">Warning</Badge>
              <Badge className="bg-info/15 text-info border border-info/25">Info</Badge>
              <Badge className="bg-brand-100 text-brand-700 border border-brand-200">Brand</Badge>
            </Demo>
          </div>
          <div><Sub label="Com ícones" />
            <Demo>
              <Badge className="bg-success/15 text-success border border-success/25"><CheckCircle size={10} weight="fill" />Publicado</Badge>
              <Badge variant="secondary"><Warning size={10} weight="fill" />Rascunho</Badge>
              <Badge variant="destructive"><XCircle size={10} weight="fill" />Arquivado</Badge>
            </Demo>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 7. BREADCRUMB ─────────────────────────────────────────────────── */}
      <Section id="breadcrumb" title="Breadcrumb" description="Orientação espacial — o usuário sempre sabe onde está (Spatial Memory).">
        <div className="space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Componentes</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Projetos</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Design System</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 8. BUTTON ─────────────────────────────────────────────────────── */}
      <Section id="button" title="Button" description="Uma ação primária por seção. Altura mínima 44px (Fitts's Law).">
        <div className="space-y-6">
          <div><Sub label="Variantes" />
            <Demo>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </Demo>
          </div>
          <div><Sub label="Tamanhos" />
            <Demo className="items-center">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Bell size={18} /></Button>
            </Demo>
          </div>
          <div><Sub label="Com ícones" />
            <Demo>
              <Button><Plus size={16} weight="bold" />Novo</Button>
              <Button variant="outline"><Download size={16} />Exportar</Button>
              <Button variant="secondary">Próximo<ArrowRight size={16} weight="bold" /></Button>
            </Demo>
          </div>
          <div><Sub label="Estados" />
            <Demo>
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
            </Demo>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 9. CALENDAR ───────────────────────────────────────────────────── */}
      <Section id="calendar" title="Calendar" description="Seleção de datas com navegação intuitiva.">
        <div className="flex flex-wrap gap-8 items-start">
          <div>
            <Sub label="Seleção simples" />
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border border-border" />
          </div>
          <div>
            <Sub label="Intervalo de datas" />
            <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} className="rounded-xl border border-border" />
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 10. CARD ──────────────────────────────────────────────────────── */}
      <Section id="card" title="Card" description="Law of Common Region: cards agrupam elementos relacionados visualmente.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Simples</CardTitle>
              <CardDescription>Descrição breve do conteúdo.</CardDescription>
            </CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Conteúdo principal com informações relevantes para o usuário.</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Com Ações</CardTitle>
              <CardDescription>Botões no rodapé (Jakob's Law).</CardDescription>
            </CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Ações alinhadas à direita seguindo convenção.</p></CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">Cancelar</Button>
              <Button size="sm">Salvar</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Total de Usuários</CardDescription>
                <User size={16} className="text-muted-foreground" />
              </div>
              <CardTitle className="text-[2.441rem] font-bold leading-none">12,543</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-success font-medium flex items-center gap-1">
                <TrendUp size={12} weight="bold" />+12% <span className="text-muted-foreground font-normal">vs. mês anterior</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 11. CAROUSEL ──────────────────────────────────────────────────── */}
      <Section id="carousel" title="Carousel" description="Navegação sequencial de conteúdo. Setas visíveis reduzem fricção (Affordance).">
        <Carousel className="max-w-sm mx-0">
          <CarouselContent>
            {["Brand 600", "Success 600", "Warning 600", "Error 600", "Info"].map((label, i) => {
              const colors = ["bg-brand-600", "bg-success", "bg-warning", "bg-destructive", "bg-info"]
              return (
                <CarouselItem key={i}>
                  <div className={`${colors[i]} rounded-xl h-40 flex items-center justify-center`}>
                    <span className="text-white font-semibold text-lg">{label}</span>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </Section>

      <Separator className="mb-16" />

      {/* ── 12. CHECKBOX ──────────────────────────────────────────────────── */}
      <Section id="checkbox" title="Checkbox" description="Seleção múltipla independente. Estado indeterminado para seleção parcial.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
          <div className="space-y-3">
            <Sub label="Estados" />
            {[
              { id: "cb1", label: "Aceito os termos de uso",         defaultChecked: true  },
              { id: "cb2", label: "Receber newsletter semanal",      defaultChecked: false },
              { id: "cb3", label: "Notificações por push",           defaultChecked: false },
            ].map(({ id, label, defaultChecked }) => (
              <div key={id} className="flex items-center gap-3">
                <Checkbox id={id} defaultChecked={defaultChecked} />
                <Label htmlFor={id} className="text-sm font-normal cursor-pointer">{label}</Label>
              </div>
            ))}
            <div className="flex items-center gap-3 opacity-50">
              <Checkbox id="cbdis" disabled />
              <Label htmlFor="cbdis" className="text-sm font-normal cursor-not-allowed">Desabilitado</Label>
            </div>
          </div>
          <div>
            <Sub label="Lista de tarefas" />
            <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
              {["Definir tokens de cor","Criar componentes base","Documentar padrões","Publicar versão 1.0"].map((task, i) => (
                <div key={task} className="flex items-center gap-3 px-4 py-3">
                  <Checkbox id={`task${i}`} defaultChecked={i < 2} />
                  <Label htmlFor={`task${i}`} className={`text-sm font-normal cursor-pointer ${i < 2 ? "line-through text-muted-foreground" : "text-foreground"}`}>{task}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 13. COLLAPSIBLE ───────────────────────────────────────────────── */}
      <Section id="collapsible" title="Collapsible" description="Oculta conteúdo secundário sem remover contexto (Progressive Disclosure).">
        <Collapsible open={collOpen} onOpenChange={setCollOpen} className="max-w-sm space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3 bg-card">
            <p className="text-sm font-medium text-foreground">Repositórios públicos (3)</p>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <CaretDown size={14} className={`transition-transform ${collOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-lg border border-border px-4 py-3 bg-card text-sm font-mono text-muted-foreground">design-system</div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-lg border border-border px-4 py-3 bg-card text-sm font-mono text-muted-foreground">component-library</div>
            <div className="rounded-lg border border-border px-4 py-3 bg-card text-sm font-mono text-muted-foreground">tokens-docs</div>
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Separator className="mb-16" />

      {/* ── 14. COMMAND ───────────────────────────────────────────────────── */}
      <Section id="command" title="Command" description="Paleta de comandos — poder avançado para usuários experientes (Power Users).">
        <div className="max-w-sm">
          <Command className="rounded-xl border border-border shadow-sm">
            <CommandInput placeholder="Buscar comando..." />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              <CommandGroup heading="Páginas">
                <CommandItem><Gear size={14} className="mr-2" />Configurações<CommandShortcut>⌘S</CommandShortcut></CommandItem>
                <CommandItem><User size={14} className="mr-2" />Perfil<CommandShortcut>⌘P</CommandShortcut></CommandItem>
                <CommandItem><Bell size={14} className="mr-2" />Notificações</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Ações">
                <CommandItem><FilePlus size={14} className="mr-2" />Novo arquivo<CommandShortcut>⌘N</CommandShortcut></CommandItem>
                <CommandItem><Folder size={14} className="mr-2" />Abrir pasta<CommandShortcut>⌘O</CommandShortcut></CommandItem>
                <CommandItem><Trash size={14} className="mr-2" />Mover para lixeira</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Conta">
                <CommandItem><SignOut size={14} className="mr-2" />Sair<CommandShortcut>⌘Q</CommandShortcut></CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 15. CONTEXT MENU ──────────────────────────────────────────────── */}
      <Section id="context-menu" title="Context Menu" description="Ações contextuais pelo clique direito — poder sem poluição visual.">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-36 max-w-sm w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground select-none cursor-default">
            Clique com botão direito aqui
          </ContextMenuTrigger>
          <ContextMenuContent className="w-52">
            <ContextMenuItem><FilePlus size={14} className="mr-2" />Novo arquivo<ContextMenuShortcut>⌘N</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuItem><Folder size={14} className="mr-2" />Nova pasta</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem><CopySimple size={14} className="mr-2" />Copiar</ContextMenuItem>
            <ContextMenuItem><PencilSimple size={14} className="mr-2" />Renomear</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-destructive focus:text-destructive"><Trash size={14} className="mr-2" />Excluir<ContextMenuShortcut>⌫</ContextMenuShortcut></ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Section>

      <Separator className="mb-16" />

      {/* ── 16. DIALOG ────────────────────────────────────────────────────── */}
      <Section id="dialog" title="Dialog" description="Interações focadas que suspendem o fluxo principal (Forced Attention).">
        <Demo>
          <Dialog>
            <DialogTrigger asChild><Button>Abrir dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar perfil</DialogTitle>
                <DialogDescription>Atualize suas informações públicas. Clique em salvar ao concluir.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-1.5"><Label htmlFor="dname">Nome</Label><Input id="dname" defaultValue="Ana Souza" /></div>
                <div className="space-y-1.5"><Label htmlFor="duser">Usuário</Label><Input id="duser" defaultValue="@ana.souza" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild><Button variant="outline"><UserPlus size={16} />Convidar</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Convidar membro</DialogTitle>
                <DialogDescription>Envie um convite por email para adicionar ao time.</DialogDescription>
              </DialogHeader>
              <div className="space-y-1.5 py-4">
                <Label htmlFor="dinvite">Email</Label>
                <Input id="dinvite" type="email" placeholder="colega@empresa.com" />
              </div>
              <DialogFooter><Button className="w-full">Enviar convite</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 17. DRAWER ────────────────────────────────────────────────────── */}
      <Section id="drawer" title="Drawer" description="Painel lateral/inferior para contexto adicional sem sair da página.">
        <Demo>
          <Drawer>
            <DrawerTrigger asChild><Button variant="outline">Abrir drawer</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filtros</DrawerTitle>
                <DrawerDescription>Ajuste os filtros para refinar os resultados.</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-4 space-y-4">
                <div className="space-y-1.5"><Label>Categoria</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent><SelectItem value="design">Design</SelectItem><SelectItem value="eng">Engenharia</SelectItem><SelectItem value="produto">Produto</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5"><Label>Status</Label>
                  <div className="space-y-2">
                    {["Ativo","Pausado","Concluído"].map(s => (
                      <div key={s} className="flex items-center gap-2"><Checkbox id={`drs${s}`} /><Label htmlFor={`drs${s}`} className="font-normal text-sm cursor-pointer">{s}</Label></div>
                    ))}
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button>Aplicar filtros</Button>
                <DrawerClose><Button variant="outline">Cancelar</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 18. DROPDOWN MENU ─────────────────────────────────────────────── */}
      <Section id="dropdown-menu" title="Dropdown Menu" description="Agrupa ações relacionadas em um menu compacto (Hick's Law).">
        <Demo>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Ações<CaretDown size={14} /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User size={14} className="mr-2" />Perfil<DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem><Gear size={14} className="mr-2" />Configurações<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem><Bell size={14} className="mr-2" />Notificações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive"><SignOut size={14} className="mr-2" />Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><DotsThree size={18} weight="bold" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><PencilSimple size={14} className="mr-2" />Editar</DropdownMenuItem>
              <DropdownMenuItem><CopySimple size={14} className="mr-2" />Duplicar</DropdownMenuItem>
              <DropdownMenuItem><Download size={14} className="mr-2" />Exportar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash size={14} className="mr-2" />Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 19. HOVER CARD ────────────────────────────────────────────────── */}
      <Section id="hover-card" title="Hover Card" description="Preview de informações em hover — reduz navegação desnecessária (Fitts's Law).">
        <Demo>
          {[
            { trigger: "@ana.souza", name: "Ana Souza", role: "Design Lead", joined: "Mar 2024" },
            { trigger: "@bruno.lima", name: "Bruno Lima", role: "Frontend Dev", joined: "Jan 2024" },
          ].map(({ trigger, name, role, joined }) => (
            <HoverCard key={trigger}>
              <HoverCardTrigger asChild>
                <Button variant="link" className="p-0 h-auto font-medium">{trigger}</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary/10 text-primary">{name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Star size={10} weight="fill" className="text-yellow-400" />Entrou em {joined}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 20. INPUT ─────────────────────────────────────────────────────── */}
      <Section id="input" title="Input" description="Labels sempre visíveis. Mensagens de erro claras e próximas ao campo.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
          <div className="space-y-1.5"><Label htmlFor="in1">Email</Label><Input id="in1" type="email" placeholder="seu@email.com" /></div>
          <div className="space-y-1.5"><Label htmlFor="in2">Pesquisar</Label>
            <div className="relative"><MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input id="in2" className="pl-9" placeholder="Buscar..." /></div>
          </div>
          <div className="space-y-1.5"><Label htmlFor="in3">Senha</Label>
            <div className="relative"><Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input id="in3" type="password" className="pl-9" placeholder="••••••••" /></div>
          </div>
          <div className="space-y-1.5"><Label htmlFor="in4">Desabilitado</Label><Input id="in4" placeholder="Indisponível" disabled /></div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="in5" className="text-destructive">Com Erro</Label>
            <Input id="in5" placeholder="Campo obrigatório" className="border-destructive focus-visible:ring-destructive/30" />
            <p className="text-xs text-destructive flex items-center gap-1"><XCircle size={12} weight="fill" />Este campo é obrigatório.</p>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 21. INPUT OTP ─────────────────────────────────────────────────── */}
      <Section id="input-otp" title="Input OTP" description="Verificação de código com feedback visual claro — cada slot é uma unidade cognitiva (Miller's Law).">
        <div className="space-y-6">
          <div><Sub label="6 dígitos" />
            <InputOTP maxLength={6} value={otpVal} onChange={setOtpVal}>
              <InputOTPGroup>
                <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {otpVal.length === 6 && <p className="text-xs text-success mt-2 flex items-center gap-1"><CheckCircle size={12} weight="fill" />Código completo: {otpVal}</p>}
          </div>
          <div><Sub label="4 dígitos" />
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /><InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 22. MENUBAR ───────────────────────────────────────────────────── */}
      <Section id="menubar" title="Menubar" description="Padrão de desktop app — organiza ações globais em grupos (Hick's Law).">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Arquivo</MenubarTrigger>
            <MenubarContent>
              <MenubarItem><FilePlus size={14} className="mr-2" />Novo<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
              <MenubarItem><Folder size={14} className="mr-2" />Abrir<MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem><Download size={14} className="mr-2" />Exportar</MenubarItem>
              <MenubarSeparator />
              <MenubarItem><SignOut size={14} className="mr-2" />Sair<MenubarShortcut>⌘Q</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Editar</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Desfazer<MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
              <MenubarItem>Refazer<MenubarShortcut>⌘⇧Z</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Recortar<MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
              <MenubarItem>Copiar<MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
              <MenubarItem>Colar<MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Ver</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Zoom In<MenubarShortcut>⌘+</MenubarShortcut></MenubarItem>
              <MenubarItem>Zoom Out<MenubarShortcut>⌘-</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Tela cheia<MenubarShortcut>⌘⇧F</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Section>

      <Separator className="mb-16" />

      {/* ── 23. NAVIGATION MENU ───────────────────────────────────────────── */}
      <Section id="navigation-menu" title="Navigation Menu" description="Navegação principal com submenus — estrutura hierárquica de informação.">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Fundamentos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-2 p-4 w-[360px]">
                  {[
                    { href: "/colors",    title: "Cores",       desc: "Palettes e tokens semânticos" },
                    { href: "/typography",title: "Tipografia",  desc: "Escala Inter, Major Third" },
                    { href: "/spacing",   title: "Espaçamento", desc: "Grid 4px, escala de spacing" },
                    { href: "/icons",     title: "Ícones",      desc: "Phosphor Icons, 6 pesos" },
                  ].map(({ href, title, desc }) => (
                    <NavigationMenuLink key={href} href={href} className="block rounded-lg p-3 hover:bg-muted transition-colors">
                      <p className="text-sm font-medium text-foreground">{title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Componentes</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-2 p-4 w-[360px]">
                  {[
                    { href: "#button",   title: "Button",   desc: "Ações e CTAs" },
                    { href: "#dialog",   title: "Dialog",   desc: "Modais focados" },
                    { href: "#table",    title: "Table",    desc: "Dados tabulares" },
                    { href: "#card",     title: "Card",     desc: "Agrupamento visual" },
                  ].map(({ href, title, desc }) => (
                    <NavigationMenuLink key={href} href={href} className="block rounded-lg p-3 hover:bg-muted transition-colors">
                      <p className="text-sm font-medium text-foreground">{title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/principles" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Princípios
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Section>

      <Separator className="mb-16" />

      {/* ── 24. PAGINATION ────────────────────────────────────────────────── */}
      <Section id="pagination" title="Pagination" description="Chunking de conteúdo (Miller's Law). Contexto de posição sempre visível.">
        <div className="space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
          <p className="text-xs text-muted-foreground text-center">Página 2 de 10 — 98 resultados</p>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 25. POPOVER ───────────────────────────────────────────────────── */}
      <Section id="popover" title="Popover" description="Conteúdo contextual flutuante sem bloquear a página (Non-Modal).">
        <Demo>
          <Popover>
            <PopoverTrigger asChild><Button variant="outline"><Bell size={16} />Notificações</Button></PopoverTrigger>
            <PopoverContent className="w-72 p-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold">Notificações</p>
                <Badge className="bg-primary text-primary-foreground text-[10px]">3</Badge>
              </div>
              {[
                { icon: CheckCircle, color: "text-success", bg: "bg-success/10", text: "Deploy concluído", sub: "há 2 min" },
                { icon: Warning,     color: "text-warning",     bg: "bg-warning/10",     text: "Limite de API 80%", sub: "há 1h" },
                { icon: User,        color: "text-primary",     bg: "bg-primary/10",     text: "Novo membro", sub: "há 3h" },
              ].map(({ icon: Icon, color, bg, text, sub }) => (
                <div key={text} className="flex items-center gap-3 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/40 cursor-pointer">
                  <div className={`h-7 w-7 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={13} className={color} weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{text}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild><Button variant="outline"><Gear size={16} />Configurações rápidas</Button></PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground">Preferências</p>
                {[
                  { label: "Notificações", id: "pn", val: switchA, set: setSwitchA },
                  { label: "Modo escuro",  id: "pd", val: switchB, set: setSwitchB },
                ].map(({ label, id, val, set }) => (
                  <div key={id} className="flex items-center justify-between">
                    <Label htmlFor={id} className="text-sm font-normal cursor-pointer">{label}</Label>
                    <Switch id={id} checked={val} onCheckedChange={set} />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 26. PROGRESS ──────────────────────────────────────────────────── */}
      <Section id="progress" title="Progress" description="Doherty Threshold: feedback visual de progresso mantém o usuário engajado.">
        <div className="space-y-5 max-w-xl">
          {[
            { label: "Upload",        value: 75, cls: "" },
            { label: "Perfil",        value: 55, cls: "[&>div]:bg-success" },
            { label: "Limite do plano", value: 88, cls: "[&>div]:bg-warning" },
            { label: "Armazenamento", value: 95, cls: "[&>div]:bg-destructive" },
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

      <Separator className="mb-16" />

      {/* ── 27. RADIO GROUP ───────────────────────────────────────────────── */}
      <Section id="radio-group" title="Radio Group" description="Seleção exclusiva entre opções. Visível de uma vez (Hick's Law).">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
          <div>
            <Sub label="Padrão" />
            <RadioGroup defaultValue="design">
              {["Design System","Component Library","Token Studio"].map(v => (
                <div key={v} className="flex items-center gap-3">
                  <RadioGroupItem value={v.toLowerCase().replace(/ /g,"-")} id={v} />
                  <Label htmlFor={v} className="font-normal cursor-pointer">{v}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Sub label="Como cards" />
            <RadioGroup defaultValue="pro" className="gap-2">
              {[
                { value: "free",  label: "Free",       desc: "Até 3 projetos" },
                { value: "pro",   label: "Pro",         desc: "Projetos ilimitados" },
                { value: "team",  label: "Team",        desc: "Colaboração em time" },
              ].map(({ value, label, desc }) => (
                <label key={value} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 cursor-pointer hover:bg-muted/40 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value={value} id={`rp${value}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 28. RESIZABLE ─────────────────────────────────────────────────── */}
      <Section id="resizable" title="Resizable" description="Painéis com divisor arrastável — controle de layout pelo usuário (User Control).">
        <div className="h-48 max-w-xl rounded-xl border border-border overflow-hidden">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={35} minSize={20}>
              <div className="flex h-full items-center justify-center bg-muted/40">
                <span className="text-sm text-muted-foreground font-mono">Painel A</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65} minSize={20}>
              <ResizablePanelGroup orientation="vertical">
                <ResizablePanel defaultSize={60}>
                  <div className="flex h-full items-center justify-center bg-card">
                    <span className="text-sm text-muted-foreground font-mono">Painel B</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40}>
                  <div className="flex h-full items-center justify-center bg-muted/20">
                    <span className="text-sm text-muted-foreground font-mono">Painel C</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 29. SCROLL AREA ───────────────────────────────────────────────── */}
      <Section id="scroll-area" title="Scroll Area" description="Área de rolagem customizada com scrollbar consistente ao design system.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
          <div>
            <Sub label="Lista vertical" />
            <ScrollArea className="h-52 rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                {Array.from({ length: 12 }, (_, i) => ({
                  name: ["Ana Souza","Bruno Lima","Carla Neto","Diego Alves","Eva Moura","Fábio Cruz","Gabi Melo","Hugo Pires","Iris Dias","João Neto","Karla Vaz","Lucas Rey"][i],
                  role: ["Design","Eng","Design","Eng","PM","Eng","Design","PM","Eng","Design","PM","Eng"][i],
                })).map(({ name, role }) => (
                  <div key={name} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7"><AvatarFallback className="text-[9px] bg-primary/10 text-primary">{name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                      <span className="text-sm text-foreground">{name}</span>
                    </div>
                    <Badge variant="outline" className="text-[9px]">{role}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <Sub label="Texto longo" />
            <ScrollArea className="h-52 rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                O Design System é uma coleção viva de componentes, padrões e diretrizes que permitem que times de produto construam interfaces consistentes com eficiência.<br/><br/>
                Cada componente é construído com acessibilidade em mente, seguindo as diretrizes WCAG 2.1 AA. Os tokens de design garantem que mudanças de marca se propaguem automaticamente.<br/><br/>
                A documentação é gerada a partir do código, garantindo que o que você vê é exatamente o que está em produção. Contribuições são bem-vindas através de pull requests.<br/><br/>
                A versão atual inclui 40+ componentes, 29 palettes de cores e suporte completo a dark mode com transições suaves entre temas.
              </p>
            </ScrollArea>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 30. SELECT ────────────────────────────────────────────────────── */}
      <Section id="select" title="Select" description="Hick's Law: limitar opções visíveis reduz tempo de decisão.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-xl">
          <div className="space-y-1.5">
            <Label>País</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="br">🇧🇷 Brasil</SelectItem>
                <SelectItem value="pt">🇵🇹 Portugal</SelectItem>
                <SelectItem value="ar">🇦🇷 Argentina</SelectItem>
                <SelectItem value="us">🇺🇸 Estados Unidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Função</Label>
            <Select defaultValue="design">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Designer</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="pm">Product Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Desabilitado</Label>
            <Select disabled>
              <SelectTrigger><SelectValue placeholder="Indisponível" /></SelectTrigger>
              <SelectContent><SelectItem value="x">x</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 31. SHEET ─────────────────────────────────────────────────────── */}
      <Section id="sheet" title="Sheet" description="Painel lateral para tarefas secundárias sem abandonar o contexto principal.">
        <Demo>
          {(["left","right","top","bottom"] as const).map(side => (
            <Sheet key={side}>
              <SheetTrigger asChild><Button variant="outline" className="capitalize">{side}</Button></SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Painel {side}</SheetTitle>
                  <SheetDescription>Conteúdo deslizante a partir da borda {side} da tela.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div className="space-y-1.5"><Label>Nome</Label><Input placeholder="Seu nome" /></div>
                  <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="seu@email.com" /></div>
                </div>
                <SheetFooter>
                  <SheetClose asChild><Button variant="outline">Fechar</Button></SheetClose>
                  <Button>Salvar</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 32. SKELETON ──────────────────────────────────────────────────── */}
      <Section id="skeleton" title="Skeleton" description="Perceived performance — skeletons reduzem percepção de carregamento.">
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
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
          <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
            {[80,65,90,70].map((w,i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-2.5" style={{ width: `${w}%` }} />
                  <Skeleton className="h-2" style={{ width: `${w-20}%` }} />
                </div>
                <Skeleton className="h-5 w-12 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 33. SLIDER ────────────────────────────────────────────────────── */}
      <Section id="slider" title="Slider" description="Entrada de valor contínuo com feedback visual imediato.">
        <div className="space-y-6 max-w-md">
          <div>
            <div className="flex justify-between mb-3">
              <Label>Volume</Label>
              <span className="text-sm font-semibold text-foreground">{sliderVal[0]}%</span>
            </div>
            <Slider value={sliderVal} onValueChange={(v) => setSliderVal(Array.isArray(v) ? [...v] : [v as number])} max={100} step={1} />
          </div>
          <div>
            <Label className="mb-3 block">Brilho — fixo em 60%</Label>
            <Slider defaultValue={[60]} max={100} step={1} />
          </div>
          <div>
            <Label className="mb-3 block">Desabilitado</Label>
            <Slider defaultValue={[40]} max={100} disabled />
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 34. SONNER (TOAST) ────────────────────────────────────────────── */}
      <Section id="sonner" title="Sonner — Toast" description="Feedback temporário não bloqueante. Posição e duração calibrados (Doherty Threshold).">
        <Demo className="flex-wrap">
          {[
            { label: "Default",  fn: () => toast("Arquivo salvo.", { description: "design-tokens-v2.json" }) },
            { label: "Success",  fn: () => toast.success("Deploy concluído!", { description: "v2.4.1 em produção." }) },
            { label: "Error",    fn: () => toast.error("Falha ao salvar.", { description: "Verifique sua conexão." }) },
            { label: "Warning",  fn: () => toast.warning("Limite 80%", { description: "Você usou 80% da cota de API." }) },
            { label: "Info",     fn: () => toast.info("Nova versão disponível.", { description: "v2.5.0 com melhorias." }) },
            { label: "Com ação", fn: () => toast("Arquivo excluído.", { action: { label: "Desfazer", onClick: () => toast.success("Restaurado!") } }) },
          ].map(({ label, fn }) => (
            <Button key={label} variant="outline" onClick={fn}>{label}</Button>
          ))}
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 35. SWITCH ────────────────────────────────────────────────────── */}
      <Section id="switch" title="Switch" description="Ativar/desativar com feedback imediato. Resultado visível instantaneamente (Doherty Threshold).">
        <div className="space-y-4 max-w-sm">
          {[
            { id: "sw1", label: "Notificações por email",    sub: "Receber alertas de atividade", val: switchA, set: setSwitchA },
            { id: "sw2", label: "Sincronização automática",  sub: "Salvar alterações em tempo real", val: switchB, set: setSwitchB },
          ].map(({ id, label, sub, val, set }) => (
            <div key={id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
              <div>
                <Label htmlFor={id} className="text-sm font-medium cursor-pointer">{label}</Label>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
              <Switch id={id} checked={val} onCheckedChange={set} />
            </div>
          ))}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/40 opacity-50">
            <div>
              <p className="text-sm font-medium text-foreground">Modo offline</p>
              <p className="text-xs text-muted-foreground">Não disponível neste plano</p>
            </div>
            <Switch disabled />
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 36. TABLE ─────────────────────────────────────────────────────── */}
      <Section id="table" title="Table" description="Dados tabulares com ordenação e estados claros. Tipografia condensada para densidade.">
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableCaption className="py-3">Lista de membros da equipe — 4 de 24</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Projetos</TableHead>
                <TableHead className="text-right">Último acesso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Ana Souza",   role: "Design Lead",  status: "active",   projects: 8,  last: "Agora" },
                { name: "Bruno Lima",  role: "Frontend Dev", status: "active",   projects: 12, last: "2h atrás" },
                { name: "Carla Neto",  role: "Product",      status: "pending",  projects: 3,  last: "1d atrás" },
                { name: "Diego Alves", role: "Backend Dev",  status: "inactive", projects: 5,  last: "7d atrás" },
              ].map(({ name, role, status, projects, last }) => (
                <TableRow key={name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className="text-[10px] bg-primary/10 text-primary">{name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{name}</p>
                        <p className="text-xs text-muted-foreground">{name.toLowerCase().replace(" ",".")}@ds.com</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={status === "active" ? "bg-success/15 text-success border border-success/25" : status === "pending" ? "bg-warning/15 text-warning border border-warning/25" : "bg-muted text-muted-foreground border border-border"}>
                      {status === "active" ? "Ativo" : status === "pending" ? "Pendente" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{role}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{projects}</TableCell>
                  <TableCell className="text-sm text-muted-foreground text-right">{last}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 37. TABS ──────────────────────────────────────────────────────── */}
      <Section id="tabs" title="Tabs" description="Miller's Law: máx 7 tabs. Hick's Law: reduz escolhas simultâneas.">
        <div className="space-y-6 max-w-xl">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Config</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground">Tabs organizam informações em grupos menores, reduzindo carga cognitiva (Miller&apos;s Law).</p>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <div className="rounded-lg border border-border bg-card p-5 grid grid-cols-3 gap-4">
                {[{l:"Visitas",v:"8,421"},{l:"Bounce",v:"34%"},{l:"Sessão",v:"2m 14s"}].map(({l,v}) => (
                  <div key={l}><p className="text-xs text-muted-foreground uppercase tracking-widest">{l}</p><p className="text-lg font-bold text-foreground">{v}</p></div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <div className="rounded-lg border border-border bg-card p-5 space-y-3">
                <div className="flex items-center justify-between"><p className="text-sm text-foreground">Visibilidade pública</p><Switch defaultChecked /></div>
                <Separator />
                <div className="flex items-center justify-between"><p className="text-sm text-foreground">Indexar no buscador</p><Switch /></div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 38. TEXTAREA ──────────────────────────────────────────────────── */}
      <Section id="textarea" title="Textarea" description="Entradas de texto longo. Resizable verticalmente para acomodar conteúdo variável.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
          <div className="space-y-1.5">
            <Label htmlFor="ta1">Descrição</Label>
            <Textarea id="ta1" placeholder="Descreva em detalhes..." rows={4} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ta2">Com contagem (desabilitado)</Label>
            <Textarea id="ta2" placeholder="Indisponível no momento..." rows={4} disabled />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="ta3" className="text-destructive">Com Erro</Label>
            <Textarea id="ta3" placeholder="Campo obrigatório" className="border-destructive focus-visible:ring-destructive/30" />
            <p className="text-xs text-destructive flex items-center gap-1"><XCircle size={12} weight="fill" />Este campo é obrigatório.</p>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 39. TOGGLE ────────────────────────────────────────────────────── */}
      <Section id="toggle" title="Toggle" description="Ativação de modo ou estado. Visual claro do que está ativo (Visibility of System Status).">
        <div className="space-y-4">
          <div><Sub label="Individual" />
            <Demo>
              <Toggle aria-label="Negrito"><TextB size={16} weight="bold" /></Toggle>
              <Toggle aria-label="Itálico"><TextItalic size={16} /></Toggle>
              <Toggle aria-label="Sublinhado"><TextUnderline size={16} /></Toggle>
              <Toggle aria-label="Favorito" defaultPressed><Star size={16} weight="fill" className="text-yellow-400" /></Toggle>
            </Demo>
          </div>
          <div><Sub label="Com texto" />
            <Demo>
              <Toggle><Eye size={14} />Preview</Toggle>
              <Toggle><FileText size={14} />Markdown</Toggle>
              <Toggle defaultPressed><GridFour size={14} />Grid</Toggle>
            </Demo>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 40. TOGGLE GROUP ──────────────────────────────────────────────── */}
      <Section id="toggle-group" title="Toggle Group" description="Seleção exclusiva ou múltipla em grupo visual coeso.">
        <div className="space-y-5">
          <div><Sub label="Alinhamento de texto (exclusivo)" />
            <ToggleGroup type="single" defaultValue={["left"]}>
              <ToggleGroupItem value="left" aria-label="Alinhar à esquerda"><AlignLeft size={16} /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Centralizar"><AlignCenterHorizontal size={16} /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Alinhar à direita"><AlignRight size={16} /></ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div><Sub label="Formatação (múltiplo)" />
            <ToggleGroup type="multiple">
              <ToggleGroupItem value="b" aria-label="Negrito"><TextB size={16} weight="bold" /></ToggleGroupItem>
              <ToggleGroupItem value="i" aria-label="Itálico"><TextItalic size={16} /></ToggleGroupItem>
              <ToggleGroupItem value="u" aria-label="Sublinhado"><TextUnderline size={16} /></ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div><Sub label="Visualização (exclusivo)" />
            <ToggleGroup type="single" defaultValue={["grid"]}>
              <ToggleGroupItem value="grid"><GridFour size={16} />Grid</ToggleGroupItem>
              <ToggleGroupItem value="list"><List size={16} />Lista</ToggleGroupItem>
              <ToggleGroupItem value="columns"><Columns size={16} />Colunas</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </Section>

      <Separator className="mb-16" />

      {/* ── 41. TOOLTIP ───────────────────────────────────────────────────── */}
      <Section id="tooltip" title="Tooltip" description="Revela informações extras sem poluir a interface (Progressive Disclosure).">
        <Demo>
          {[
            { trigger: <Button variant="outline" size="icon"><Info size={16} /></Button>,       tip: "Informação adicional" },
            { trigger: <Button variant="ghost" size="icon"><Bell size={16} /></Button>,         tip: "3 notificações pendentes" },
            { trigger: <Button variant="outline" size="icon"><Download size={16} /></Button>,   tip: "Baixar como PDF" },
            { trigger: <Button size="icon"><Eye size={16} /></Button>,                          tip: "Visualizar prévia" },
            { trigger: <Badge variant="outline" className="cursor-default h-8 px-3">Hover me</Badge>, tip: "Tooltip em badge" },
          ].map(({ trigger, tip }, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>{trigger}</TooltipTrigger>
              <TooltipContent>{tip}</TooltipContent>
            </Tooltip>
          ))}
        </Demo>
      </Section>

      <Separator className="mb-16" />

      {/* ── 42. EMPTY STATE ───────────────────────────────────────────────── */}
      <Section id="empty-state" title="Empty State" description="Guia o usuário com próximos passos claros quando não há conteúdo.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
          {[
            { icon: Package,       title: "Nenhum produto",          desc: "Cadastre seu primeiro produto no catálogo.",      action: "Adicionar produto" },
            { icon: EnvelopeSimple, title: "Caixa de entrada vazia",  desc: "Tudo em dia! Nenhuma mensagem pendente.",         action: "Ver arquivo", outline: true },
            { icon: FileText,      title: "Sem documentos",          desc: "Crie ou importe documentos para este projeto.",   action: "Criar documento" },
            { icon: ChatCircle,    title: "Nenhum comentário",       desc: "Seja o primeiro a comentar neste tópico.",        action: "Adicionar comentário", outline: true },
          ].map(({ icon: Icon, title, desc, action, outline }) => (
            <div key={title} className="flex flex-col items-center text-center py-10 px-6 rounded-xl border border-dashed border-border bg-card">
              <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Icon size={28} className="text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground mb-5 max-w-[180px]">{desc}</p>
              <Button size="sm" variant={outline ? "outline" : "default"}>
                <Plus size={14} weight="bold" />{action}
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
