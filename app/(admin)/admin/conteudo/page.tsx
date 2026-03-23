import { createClient } from "@/lib/supabase/server";
import { DiferenciaisEditor, type DiferencialItem, type DiferenciaisSize } from "@/components/admin/diferenciais-editor";
import { QuemSomosEditor } from "@/components/admin/quem-somos-editor";
import { CtaEditor } from "@/components/admin/cta-editor";

const KEYS = [
  "diferenciais", "diferenciais_size", "diferenciais_carousel_cols",
  "quem_somos_badge", "quem_somos_titulo", "quem_somos_texto", "quem_somos_bullets", "quem_somos_anos", "quem_somos_imagem",
  "cta_badge", "cta_titulo", "cta_subtitulo",
];

export default async function ConteudoPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("key, value").in("key", KEYS);
  const s = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));

  const diferenciais = Array.isArray(s["diferenciais"]) ? (s["diferenciais"] as unknown as DiferencialItem[]) : null;
  const diferenciaisSize = (typeof s["diferenciais_size"] === "string" ? s["diferenciais_size"] : "compact") as DiferenciaisSize;
  const diferenciaisCarouselCols = (s["diferenciais_carousel_cols"] === "2" ? 2 : 1) as 1 | 2;

  const quemSomos = {
    badge:    typeof s["quem_somos_badge"]   === "string" ? s["quem_somos_badge"]   : undefined,
    titulo:   typeof s["quem_somos_titulo"]  === "string" ? s["quem_somos_titulo"]  : undefined,
    texto:    typeof s["quem_somos_texto"]   === "string" ? s["quem_somos_texto"]   : undefined,
    bullets:  Array.isArray(s["quem_somos_bullets"]) ? (s["quem_somos_bullets"] as string[]).join("\n") : undefined,
    anos:     typeof s["quem_somos_anos"]    === "string" ? s["quem_somos_anos"]    : undefined,
    imageUrl: typeof s["quem_somos_imagem"]  === "string" ? s["quem_somos_imagem"]  : undefined,
  };

  const cta = {
    badge:     typeof s["cta_badge"]     === "string" ? s["cta_badge"]     : undefined,
    titulo:    typeof s["cta_titulo"]    === "string" ? s["cta_titulo"]    : undefined,
    subtitulo: typeof s["cta_subtitulo"] === "string" ? s["cta_subtitulo"] : undefined,
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Conteúdo das Seções</h1>
        <p className="text-xs text-gray-500 mt-0.5">Edite o texto das seções estáticas da home</p>
      </div>

      <div className="space-y-6">
        <DiferenciaisEditor initial={diferenciais} initialSize={diferenciaisSize} initialCarouselCols={diferenciaisCarouselCols} />
        <QuemSomosEditor initial={quemSomos} />
        <CtaEditor initial={cta} />
      </div>
    </div>
  );
}
