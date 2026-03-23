const STEPS = ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const

function Palette({ name, token, hex }: { name: string; token: string; hex: string[] }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">{name}</h2>
        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">--{token}-*</span>
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
        {STEPS.map((step, i) => (
          <div key={step} className="rounded-lg overflow-hidden border border-border">
            <div className="h-10" style={{ backgroundColor: hex[i] }} />
            <div className="px-1.5 py-1.5 bg-card">
              <p className="text-[9px] font-semibold text-foreground leading-none mb-0.5">{step}</p>
              <p className="text-[8px] text-muted-foreground font-mono leading-none">{hex[i]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6 mt-12 first:mt-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <h2 className="text-[1.563rem] font-bold text-foreground">{title}</h2>
    </div>
  )
}

export default function ColorsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Fundamentos</p>
        <h1 className="text-[2.441rem] font-bold tracking-tight text-foreground mb-3">Cores</h1>
        <p className="text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed">
          29 palettes completos com 12 tons cada (25–950), tokens semânticos para light/dark mode e escalas de contraste WCAG.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Palettes",       value: "29",    sub: "Primários + secundários" },
          { label: "Tons por escala", value: "12",   sub: "25 → 950" },
          { label: "Tokens semânticos", value: "20+", sub: "Light & dark mode" },
          { label: "Conformidade",   value: "WCAG",  sub: "AA / AAA contrast" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
            <p className="text-[1.25rem] font-bold text-foreground leading-none">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Semantic tokens */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-5">Tokens Semânticos</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {[
            { token: "--background",      hex: "#FFFFFF",  desc: "Fundo da página" },
            { token: "--foreground",      hex: "#181D27",  desc: "Texto principal" },
            { token: "--card",            hex: "#FFFFFF",  desc: "Fundo de cards" },
            { token: "--muted",           hex: "#F5F5F5",  desc: "Fundo sutil" },
            { token: "--muted-foreground",hex: "#717680",  desc: "Texto secundário" },
            { token: "--primary",         hex: "#7F56D9",  desc: "Ação principal — Brand 600" },
            { token: "--primary-foreground", hex: "#FFFFFF", desc: "Texto sobre primary" },
            { token: "--accent",          hex: "#F9F5FF",  desc: "Fundo accent — Brand 50" },
            { token: "--accent-foreground", hex: "#6941C6", desc: "Texto accent — Brand 700" },
            { token: "--border",          hex: "#E9EAEB",  desc: "Bordas — Gray 200" },
            { token: "--ring",            hex: "#9E77ED",  desc: "Outline de foco" },
            { token: "--destructive",     hex: "#D92D20",  desc: "Erro / destrutivo — Error 600" },
            { token: "--success",         hex: "#079455",  desc: "Confirmação — Success 600" },
            { token: "--warning",         hex: "#DC6803",  desc: "Atenção — Warning 600" },
            { token: "--info",            hex: "#1570EF",  desc: "Informação — Blue 600" },
          ].map((row) => (
            <div key={row.token} className="flex items-center gap-4 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
              <div className="h-6 w-6 rounded border border-border shrink-0" style={{ backgroundColor: row.hex }} />
              <code className="text-[11px] font-mono text-primary bg-primary/8 px-2 py-0.5 rounded shrink-0 w-48">{row.token}</code>
              <span className="text-[11px] font-mono text-muted-foreground w-20 shrink-0">{row.hex}</span>
              <span className="text-sm text-muted-foreground">{row.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Base */}
      <SectionTitle label="Base" title="Cores Base" />
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { name: "White",       hex: "#FFFFFF", border: true },
          { name: "Black",       hex: "#000000", border: false },
          { name: "Transparent", hex: "transparent", border: true },
        ].map((c) => (
          <div key={c.name} className="rounded-xl overflow-hidden border border-border">
            <div className="h-16" style={{ backgroundColor: c.hex, backgroundImage: c.hex === "transparent" ? "repeating-conic-gradient(#e0e0e0 0% 25%, white 0% 50%) 0 0 / 12px 12px" : undefined }} />
            <div className="p-3 bg-card">
              <p className="text-xs font-semibold text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{c.hex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Palettes */}
      <SectionTitle label="Cores Primárias" title="Palettes Principais" />

      <Palette name="Gray" token="gray" hex={["#FDFDFD","#FAFAFA","#F5F5F5","#E9EAEB","#D5D7DA","#A4A7AE","#717680","#535862","#414651","#252B37","#181D27","#0A0D12"]} />
      <Palette name="Brand" token="brand" hex={["#FCFAFF","#F9F5FF","#F4EBFF","#E9D7FE","#D6BBFB","#B692F6","#9E77ED","#7F56D9","#6941C6","#53389E","#42307D","#2C1C5F"]} />
      <Palette name="Error" token="error" hex={["#FFFBFA","#FEF3F2","#FEE4E2","#FECDCA","#FDA29B","#F97066","#F04438","#D92D20","#B42318","#912018","#7A271A","#55160C"]} />
      <Palette name="Warning" token="warning" hex={["#FFFCF5","#FFFAEB","#FEF0C7","#FEDF89","#FEC84B","#FDB022","#F79009","#DC6803","#B54708","#93370D","#7A2E0E","#4E1D09"]} />
      <Palette name="Success" token="success" hex={["#F6FEF9","#ECFDF3","#DCFAE6","#ABEFC6","#75E0A7","#47CD89","#17B26A","#079455","#067647","#085D3A","#074D31","#053321"]} />

      {/* Secondary — Grays */}
      <SectionTitle label="Cores Secundárias" title="Variações de Cinza" />

      <Palette name="Gray Blue" token="gray-blue" hex={["#FCFCFD","#F8F9FC","#EAECF5","#D5D9EB","#B3B8DB","#717BBC","#4E5BA6","#3E4784","#363F72","#293056","#101323","#0D0F1C"]} />
      <Palette name="Gray Cool" token="gray-cool" hex={["#FCFCFD","#F9F9FB","#EFF1F5","#DCDFEA","#B9C0D4","#7D89B0","#5D6B98","#4A5578","#404968","#30374F","#111322","#0E101B"]} />
      <Palette name="Gray Modern" token="gray-modern" hex={["#FCFCFD","#F8FAFC","#EEF2F6","#E3E8EF","#CDD5DF","#9AA4B2","#697586","#4B5565","#364152","#202939","#121926","#0D121C"]} />
      <Palette name="Gray Neutral" token="gray-neutral" hex={["#FCFCFD","#F9FAFB","#F3F4F6","#E5E7EB","#D2D6DB","#9DA4AE","#6C737F","#4D5761","#384250","#1F2A37","#111927","#0D121C"]} />
      <Palette name="Gray Iron" token="gray-iron" hex={["#FCFCFC","#FAFAFA","#F4F4F5","#E4E4E7","#D1D1D6","#A0A0AB","#70707B","#51525C","#3F3F46","#26272B","#1A1A1E","#131316"]} />
      <Palette name="Gray True" token="gray-true" hex={["#FCFCFC","#F7F7F7","#F5F5F5","#E5E5E5","#D6D6D6","#A3A3A3","#737373","#525252","#424242","#292929","#141414","#0F0F0F"]} />
      <Palette name="Gray Warm" token="gray-warm" hex={["#FDFDFC","#FAFAF9","#F5F5F4","#E7E5E4","#D7D3D0","#A9A29D","#79716B","#57534E","#44403C","#292524","#1C1917","#171412"]} />

      {/* Secondary — Greens */}
      <SectionTitle label="Cores Secundárias" title="Verdes & Naturais" />

      <Palette name="Moss" token="moss" hex={["#FAFDF7","#F5FBEE","#E6F4D7","#CEEAB0","#ACDC79","#86CB3C","#669F2A","#4F7A21","#3F621A","#335015","#2B4212","#1A280B"]} />
      <Palette name="Green Light" token="green-light" hex={["#FAFEF5","#F3FEE7","#E4FBCC","#D0F8AB","#A6EF67","#85E13A","#66C61C","#4CA30D","#3B7C0F","#326212","#2B5314","#15290A"]} />
      <Palette name="Green" token="green" hex={["#F6FEF9","#EDFCF2","#D3F8DF","#AAF0C4","#73E2A3","#3CCB7F","#16B364","#099250","#087443","#095C37","#084C2E","#052E1C"]} />
      <Palette name="Teal" token="teal" hex={["#F6FEFC","#F0FDF9","#CCFBEF","#99F6E0","#5FE9D0","#2ED3B7","#15B79E","#0E9384","#107569","#125D56","#134E48","#0A2926"]} />
      <Palette name="Cyan" token="cyan" hex={["#F5FEFF","#ECFDFF","#CFF9FE","#A5F0FC","#67E3F9","#22CCEE","#06AED4","#088AB2","#0E7090","#155B75","#164C63","#0D2D3A"]} />

      {/* Secondary — Blues */}
      <SectionTitle label="Cores Secundárias" title="Azuis" />

      <Palette name="Blue Light" token="blue-light" hex={["#F5FBFF","#F0F9FF","#E0F2FE","#B9E6FE","#7CD4FD","#36BFFA","#0BA5EC","#0086C9","#026AA2","#065986","#0B4A6F","#062C41"]} />
      <Palette name="Blue" token="blue" hex={["#F5FAFF","#EFF8FF","#D1E9FF","#B2DDFF","#84CAFF","#53B1FD","#2E90FA","#1570EF","#175CD3","#1849A9","#194185","#102A56"]} />
      <Palette name="Blue Dark" token="blue-dark" hex={["#F5F8FF","#EFF4FF","#D1E0FF","#B2CCFF","#84ADFF","#528BFF","#2970FF","#155EEF","#004EEB","#0040C1","#00359E","#002266"]} />
      <Palette name="Indigo" token="indigo" hex={["#F5F8FF","#EEF4FF","#E0EAFF","#C7D7FE","#A4BCFD","#8098F9","#6172F3","#444CE7","#3538CD","#2D31A6","#2D3282","#1F235B"]} />

      {/* Secondary — Purples */}
      <SectionTitle label="Cores Secundárias" title="Roxos & Rosas" />

      <Palette name="Violet" token="violet" hex={["#FBFAFF","#F5F3FF","#ECE9FE","#DDD6FE","#C3B5FD","#A48AFB","#875BF7","#7839EE","#6927DA","#5720B7","#491C96","#2E125E"]} />
      <Palette name="Purple" token="purple" hex={["#FAFAFF","#F4F3FF","#EBE9FE","#D9D6FE","#BDB4FE","#9B8AFB","#7A5AF8","#6938EF","#5925DC","#4A1FB8","#3E1C96","#27115F"]} />
      <Palette name="Fuchsia" token="fuchsia" hex={["#FEFAFF","#FDF4FF","#FBE8FF","#F6D0FE","#EEAAFD","#E478FA","#D444F1","#BA24D5","#9F1AB1","#821890","#6F1877","#47104C"]} />
      <Palette name="Pink" token="pink" hex={["#FEF6FB","#FDF2FA","#FCE7F6","#FCCEEE","#FAA7E0","#F670C7","#EE46BC","#DD2590","#C11574","#9E165F","#851651","#4E0D30"]} />
      <Palette name="Rose" token="rose" hex={["#FFF5F6","#FFF1F3","#FFE4E8","#FECDD6","#FEA3B4","#FD6F8E","#F63D68","#E31B54","#C01048","#A11043","#89123E","#510B24"]} />

      {/* Secondary — Warm */}
      <SectionTitle label="Cores Secundárias" title="Quentes" />

      <Palette name="Orange Dark" token="orange-dark" hex={["#FFF9F5","#FFF4ED","#FFE6D5","#FFD6AE","#FF9C66","#FF692E","#FF4405","#E62E05","#BC1B06","#97180C","#771A0D","#57130A"]} />
      <Palette name="Orange" token="orange" hex={["#FEFAF5","#FEF6EE","#FDEAD7","#F9DBAF","#F7B27A","#F38744","#EF6820","#E04F16","#B93815","#932F19","#772917","#511C10"]} />
      <Palette name="Yellow" token="yellow" hex={["#FEFDF0","#FEFBE8","#FEF7C3","#FEEE95","#FDE272","#FAC515","#EAAA08","#CA8504","#A15C07","#854A0E","#713B12","#542C0D"]} />
    </div>
  )
}
