"use client"

import { useState } from "react"
import {
  House, Palette, TextT, SquaresFour, Star, Ruler, Sparkle, GitBranch,
  MagnifyingGlass, Bell, User, Gear, Heart, Bookmark, Share, Download,
  Upload, Trash, PencilSimple, Plus, Minus, X, Check, ArrowRight, ArrowLeft,
  ArrowUp, ArrowDown, CaretRight, CaretLeft, CaretUp, CaretDown,
  CheckCircle, Warning, XCircle, Info, Question,
  Eye, EyeSlash, Lock, LockOpen, ShieldCheck, Key,
  Image, FileText, FilePdf, Folder, FolderOpen, CloudArrowUp, CloudArrowDown,
  ChatCircle, Envelope, Phone, At,
  Sun, Moon, Lightning, Fire, Leaf,
  CreditCard, Money, ShoppingCart, Tag, Receipt,
  MapPin, Globe, Compass, Crosshair,
  Play, Pause, Stop, SkipBack, SkipForward, SpeakerHigh, SpeakerSlash,
  Laptop, DeviceMobile, Monitor, Cpu, HardDrive, Rss,
  ChartBar, ChartLine, TrendUp, TrendDown, List, Table,
  Copy, Link,
  Spinner, DotsThree, DotsThreeVertical, Rows, Columns,
  ToggleLeft, ToggleRight, Sliders, SlidersHorizontal,
} from "@phosphor-icons/react"

type IconWeight = "regular" | "bold" | "fill" | "duotone" | "light" | "thin"

const CATEGORIES = [
  {
    name: "Navegação",
    icons: [
      { Icon: House,         label: "House" },
      { Icon: ArrowRight,    label: "ArrowRight" },
      { Icon: ArrowLeft,     label: "ArrowLeft" },
      { Icon: ArrowUp,       label: "ArrowUp" },
      { Icon: ArrowDown,     label: "ArrowDown" },
      { Icon: CaretRight,    label: "CaretRight" },
      { Icon: CaretLeft,     label: "CaretLeft" },
      { Icon: CaretUp,       label: "CaretUp" },
      { Icon: CaretDown,     label: "CaretDown" },
    ],
  },
  {
    name: "Ações",
    icons: [
      { Icon: Plus,          label: "Plus" },
      { Icon: Minus,         label: "Minus" },
      { Icon: X,             label: "X" },
      { Icon: Check,         label: "Check" },
      { Icon: PencilSimple,  label: "PencilSimple" },
      { Icon: Trash,         label: "Trash" },
      { Icon: Download,      label: "Download" },
      { Icon: Upload,        label: "Upload" },
      { Icon: Copy,          label: "Copy" },
      { Icon: Share,         label: "Share" },
    ],
  },
  {
    name: "Feedback",
    icons: [
      { Icon: CheckCircle,   label: "CheckCircle" },
      { Icon: Warning,       label: "Warning" },
      { Icon: XCircle,       label: "XCircle" },
      { Icon: Info,          label: "Info" },
      { Icon: Question,      label: "Question" },
      { Icon: Bell,          label: "Bell" },
      { Icon: Spinner,       label: "Spinner" },
    ],
  },
  {
    name: "Interface",
    icons: [
      { Icon: MagnifyingGlass, label: "Search" },
      { Icon: Gear,          label: "Gear" },
      { Icon: Sliders,       label: "Sliders" },
      { Icon: SlidersHorizontal, label: "SlidersH" },
      { Icon: ToggleLeft,    label: "ToggleLeft" },
      { Icon: ToggleRight,   label: "ToggleRight" },
      { Icon: DotsThree,     label: "DotsThree" },
      { Icon: DotsThreeVertical, label: "DotsThreeV" },
      { Icon: List,          label: "List" },
      { Icon: Table,         label: "Table" },
    ],
  },
  {
    name: "Usuário & Segurança",
    icons: [
      { Icon: User,          label: "User" },
      { Icon: Heart,         label: "Heart" },
      { Icon: Bookmark,      label: "Bookmark" },
      { Icon: Eye,           label: "Eye" },
      { Icon: EyeSlash,      label: "EyeSlash" },
      { Icon: Lock,          label: "Lock" },
      { Icon: LockOpen,      label: "LockOpen" },
      { Icon: ShieldCheck,   label: "ShieldCheck" },
      { Icon: Key,           label: "Key" },
    ],
  },
  {
    name: "Arquivos & Mídia",
    icons: [
      { Icon: Image,         label: "Image" },
      { Icon: FileText,      label: "FileText" },
      { Icon: FilePdf,       label: "FilePdf" },
      { Icon: Folder,        label: "Folder" },
      { Icon: FolderOpen,    label: "FolderOpen" },
      { Icon: CloudArrowUp,  label: "CloudUp" },
      { Icon: CloudArrowDown,label: "CloudDown" },
    ],
  },
  {
    name: "Comunicação",
    icons: [
      { Icon: ChatCircle,    label: "ChatCircle" },
      { Icon: Envelope,      label: "Envelope" },
      { Icon: Phone,         label: "Phone" },
      { Icon: At,            label: "At" },
      { Icon: Link,          label: "Link" },
    ],
  },
  {
    name: "Tecnologia",
    icons: [
      { Icon: Laptop,        label: "Laptop" },
      { Icon: DeviceMobile,  label: "Mobile" },
      { Icon: Monitor,       label: "Monitor" },
      { Icon: Cpu,           label: "Cpu" },
      { Icon: HardDrive,     label: "HardDrive" },
      { Icon: Rss,           label: "Rss" },
      { Icon: Globe,         label: "Globe" },
    ],
  },
  {
    name: "Dados",
    icons: [
      { Icon: ChartBar,      label: "ChartBar" },
      { Icon: ChartLine,     label: "ChartLine" },
      { Icon: TrendUp,       label: "TrendUp" },
      { Icon: TrendDown,     label: "TrendDown" },
      { Icon: Rows,          label: "Rows" },
      { Icon: Columns,       label: "Columns" },
    ],
  },
  {
    name: "Comércio",
    icons: [
      { Icon: CreditCard,    label: "CreditCard" },
      { Icon: Money,         label: "Money" },
      { Icon: ShoppingCart,  label: "Cart" },
      { Icon: Tag,           label: "Tag" },
      { Icon: Receipt,       label: "Receipt" },
    ],
  },
  {
    name: "Mapa & Local",
    icons: [
      { Icon: MapPin,        label: "MapPin" },
      { Icon: Compass,       label: "Compass" },
      { Icon: Crosshair,     label: "Crosshair" },
    ],
  },
  {
    name: "Mídia & Tema",
    icons: [
      { Icon: Play,          label: "Play" },
      { Icon: Pause,         label: "Pause" },
      { Icon: Stop,          label: "Stop" },
      { Icon: SkipBack,      label: "SkipBack" },
      { Icon: SkipForward,   label: "SkipForward" },
      { Icon: SpeakerHigh,   label: "Speaker" },
      { Icon: SpeakerSlash,  label: "SpeakerOff" },
      { Icon: Sun,           label: "Sun" },
      { Icon: Moon,          label: "Moon" },
      { Icon: Lightning,     label: "Lightning" },
    ],
  },
]

const WEIGHTS: { value: IconWeight; label: string; desc: string }[] = [
  { value: "thin",    label: "Thin",    desc: "Decorativo, hero" },
  { value: "light",   label: "Light",   desc: "Subtil, secundário" },
  { value: "regular", label: "Regular", desc: "Uso geral, body" },
  { value: "bold",    label: "Bold",    desc: "Destaque, CTA" },
  { value: "fill",    label: "Fill",    desc: "Estado ativo, selected" },
  { value: "duotone", label: "Duotone", desc: "Ilustração, vazio" },
]

const SIZES = [
  { px: 12, token: "w-3",  use: "Badge, tag" },
  { px: 16, token: "w-4",  use: "Inline, label" },
  { px: 20, token: "w-5",  use: "Padrão, nav" },
  { px: 24, token: "w-6",  use: "Botão, ação" },
  { px: 32, token: "w-8",  use: "Card, seção" },
  { px: 40, token: "w-10", use: "Feature, vazio" },
  { px: 48, token: "w-12", use: "Hero, display" },
]

export default function IconsPage() {
  const [activeWeight, setActiveWeight] = useState<IconWeight>("regular")
  const [search, setSearch] = useState("")

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    icons: cat.icons.filter((i) =>
      i.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.icons.length > 0)

  const totalIcons = CATEGORIES.reduce((acc, c) => acc + c.icons.length, 0)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Componentes</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Ícones</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          Phosphor Icons — biblioteca com 6 pesos por ícone, desenhados em grid
          de 32px para legibilidade em qualquer escala.
        </p>
      </div>

      {/* Stats */}
      <section className="mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Biblioteca",   value: "Phosphor",       sub: "@phosphor-icons/react" },
            { label: "Ícones aqui",  value: `${totalIcons}+`, sub: "Curados para o DS" },
            { label: "Pesos",        value: "6",              sub: "Thin → Duotone" },
            { label: "Grid base",    value: "32px",           sub: "Escala 1:1" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
              <p className="text-[1.25rem] font-bold text-foreground leading-none">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weight selector + search */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Biblioteca de Ícones</h2>
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar ícone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Weight pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {WEIGHTS.map((w) => (
            <button
              key={w.value}
              onClick={() => setActiveWeight(w.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeWeight === w.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Categories */}
        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <MagnifyingGlass size={32} weight="light" />
            <p className="text-sm">Nenhum ícone encontrado para &ldquo;{search}&rdquo;</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((cat) => (
              <div key={cat.name}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  {cat.name}
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1">
                  {cat.icons.map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-muted/60 transition-colors cursor-default group"
                      title={label}
                    >
                      <Icon size={24} weight={activeWeight} className="text-foreground group-hover:text-primary transition-colors" />
                      <span className="text-[9px] text-muted-foreground text-center leading-tight truncate w-full text-center">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pesos */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Pesos Disponíveis</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-7 text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border px-4 py-3">
            <span className="col-span-1">Ícone</span>
            {WEIGHTS.map((w) => (
              <span key={w.value} className="text-center">{w.label}</span>
            ))}
          </div>
          {[Star, Bell, Heart, Bookmark, Gear, Lock].map((Icon, i) => (
            <div
              key={i}
              className="grid grid-cols-7 items-center px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
            >
              <span className="text-xs font-mono text-muted-foreground">
                {["Star","Bell","Heart","Bookmark","Gear","Lock"][i]}
              </span>
              {WEIGHTS.map((w) => (
                <div key={w.value} className="flex justify-center">
                  <Icon size={22} weight={w.value} className="text-foreground" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {WEIGHTS.map((w) => (
            <div key={w.value} className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs font-semibold text-foreground">{w.label}</p>
              <p className="text-xs font-mono text-muted-foreground">{w.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tamanhos */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Escala de Tamanhos</h2>
        <div className="space-y-1">
          {SIZES.map((s) => (
            <div
              key={s.px}
              className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-16 shrink-0">
                <code className="text-xs font-mono text-muted-foreground">{s.token}</code>
              </div>
              <div className="w-12 shrink-0 text-right">
                <span className="text-xs font-mono text-muted-foreground">{s.px}px</span>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <Star size={s.px} weight="regular" className="text-foreground shrink-0" />
                <Bell size={s.px} weight="regular" className="text-muted-foreground shrink-0" />
                <Heart size={s.px} weight="fill" className="text-primary shrink-0" />
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">{s.use}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Uso no código */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Uso no Código</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {[
            { code: `import { Star } from "@phosphor-icons/react"`, desc: "Importação padrão (Cliente e SSR)" },
            { code: `<Star size={24} weight="regular" />`, desc: "Uso básico" },
            { code: `<Star size={24} weight="fill" className="text-primary" />`, desc: "Com cor e peso" },
            { code: `<Star size={20} weight="bold" aria-label="Favorito" />`, desc: "Com acessibilidade" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3 border-b border-border/50 last:border-0">
              <code className="flex-1 text-[11px] font-mono text-foreground bg-muted/50 rounded px-2 py-1">{item.code}</code>
              <span className="text-xs text-muted-foreground sm:w-40 shrink-0">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Regras */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Boas Práticas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { rule: "Usar 1 peso por contexto de interface",        ok: true  },
            { rule: "fill para estado ativo/selecionado",           ok: true  },
            { rule: "Mínimo 20px em áreas interativas (Fitts)",     ok: true  },
            { rule: "aria-label em ícones sem texto visível",       ok: true  },
            { rule: "Tamanho consistente em um mesmo componente",   ok: true  },
            { rule: "Misturar thin e bold no mesmo grupo",          ok: false },
            { rule: "Ícone < 12px em texto corrido",               ok: false },
            { rule: "Ícone sem label em ação crítica",              ok: false },
          ].map((item) => (
            <div
              key={item.rule}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${
                item.ok
                  ? "bg-success/10 text-foreground"
                  : "bg-destructive/10 text-foreground"
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
