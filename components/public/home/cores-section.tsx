import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Marquee } from "@/components/ui/marquee";

interface Color {
  id: string;
  name: string;
  hex: string;
  code: string;
  family: string | null;
}

interface CoresSectionProps {
  title?: string;
  colors: Color[];
}

function ColorCard({ color }: { color: Color }) {
  return (
    <div className="flex flex-col items-center gap-2 w-[120px] shrink-0 select-none mx-3">
      <div
        className="w-[120px] h-[120px] rounded-xl border border-black/8 shadow-sm transition-transform hover:scale-105"
        style={{ backgroundColor: color.hex }}
        title={color.name}
      />
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-800 leading-tight truncate w-[120px] text-center">
          {color.name}
        </p>
        {color.code && (
          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{color.code}</p>
        )}
      </div>
    </div>
  );
}

export function CoresTintasSection({ title, colors }: CoresSectionProps) {
  if (colors.length === 0) return null;

  // Each row uses all colors with a different starting offset for visual variety
  const rotate = (arr: Color[], offset: number): Color[] => [
    ...arr.slice(offset),
    ...arr.slice(0, offset),
  ];

  const rows = [
    rotate(colors, 0),
    rotate(colors, Math.floor(colors.length / 3)),
    rotate(colors, Math.floor((colors.length * 2) / 3)),
  ];

  const durations = [35, 28, 42];

  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {title ?? "Cores de Tintas"}
            </h2>
            <p className="text-sm text-gray-500 mt-1.5">
              Explore nossa coleção completa de cores
            </p>
          </div>
          <Link
            href="/cores"
            className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors shrink-0"
          >
            Ver todas
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="space-y-5">
        {rows.map((row, i) => (
          <Marquee
            key={i}
            reverse={i % 2 === 1}
            pauseOnHover
            durationSeconds={durations[i] ?? 35}
            className="[--gap:2rem] px-4"
          >
            {row.map((color, j) => (
              <ColorCard key={`${color.id}-${j}`} color={color} />
            ))}
          </Marquee>
        ))}
      </div>

      {/* Mobile button */}
      <div className="sm:hidden mt-8 text-center">
        <Link
          href="/cores"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors"
        >
          Ver todas as cores
          <ArrowRight size={14} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
