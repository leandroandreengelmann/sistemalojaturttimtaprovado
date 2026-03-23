import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePage } from "@/lib/actions/menus";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

interface Props { params: Promise<{ id: string }> }

type QuemSomosContent = {
  body?: string;
  missao?: string;
  visao?: string;
  valores?: string;
  anos_mercado?: string;
  pilares?: { title: string; desc: string }[];
};

const defaultPilares = [
  { title: "Qualidade",    desc: "Produtos rigorosamente selecionados com os mais altos padrões." },
  { title: "Confiança",    desc: "Décadas de relacionamento sólido com clientes e fornecedores." },
  { title: "Inovação",     desc: "Sempre atentos às novidades e tendências do mercado." },
  { title: "Atendimento",  desc: "Consultores especializados prontos para orientar cada cliente." },
];

export default async function EditarPaginaPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("institutional_pages")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!page) notFound();

  const raw = page.content as QuemSomosContent | null;
  const body = raw?.body ?? "";
  const isQuemSomos = page.slug === "quem-somos";

  const qs: QuemSomosContent = isQuemSomos ? {
    missao:       raw?.missao       ?? "Oferecer produtos de qualidade com atendimento consultivo e personalizado.",
    visao:        raw?.visao        ?? "Ser a referência de confiança no nosso segmento em todo o Brasil.",
    valores:      raw?.valores      ?? "Qualidade, integridade, inovação e foco no cliente.",
    anos_mercado: raw?.anos_mercado ?? "20",
    pilares:      raw?.pilares?.length ? raw.pilares : defaultPilares,
  } : {};

  async function save(fd: FormData) {
    "use server";
    await updatePage(id, fd);
  }

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";
  const sectionCls = "bg-white border border-gray-200 p-5 space-y-4 rounded-lg";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/paginas" className="p-2 text-gray-400 hover:text-gray-700">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Editar: {page.title}</h1>
          <p className="text-xs text-gray-400">/{page.slug}</p>
        </div>
      </div>

      <form action={save} className="space-y-5">

        {/* Conteúdo principal */}
        <div className={sectionCls}>
          <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Conteúdo</h2>
          <div>
            <label className={labelCls}>Título da página</label>
            <input name="title" defaultValue={page.title} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Texto principal (HTML permitido)</label>
            <textarea
              name="content"
              defaultValue={body}
              rows={10}
              className={`${inputCls} resize-y`}
              placeholder="<p>Texto da página...</p>"
            />
          </div>
        </div>

        {/* Seção exclusiva: Quem Somos */}
        {isQuemSomos && (
          <>
            {/* Missão / Visão / Valores */}
            <div className={sectionCls}>
              <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Missão, Visão e Valores</h2>
              <div>
                <label className={labelCls}>Missão</label>
                <textarea name="missao" defaultValue={qs.missao} rows={2} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className={labelCls}>Visão</label>
                <textarea name="visao" defaultValue={qs.visao} rows={2} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className={labelCls}>Valores</label>
                <textarea name="valores" defaultValue={qs.valores} rows={2} className={`${inputCls} resize-none`} />
              </div>
            </div>

            {/* Destaque numérico */}
            <div className={sectionCls}>
              <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Destaque</h2>
              <div className="w-40">
                <label className={labelCls}>Anos de mercado</label>
                <input
                  name="anos_mercado"
                  defaultValue={qs.anos_mercado}
                  className={inputCls}
                  placeholder="20"
                />
                <p className="text-[11px] text-gray-400 mt-1">Exibido como "+20 anos de mercado"</p>
              </div>
            </div>

            {/* Nossos Pilares */}
            <div className={sectionCls}>
              <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">Nossos Pilares</h2>
              <div className="space-y-5">
                {(qs.pilares ?? defaultPilares).map((p, i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 items-start border border-gray-100 p-3 rounded-md">
                    <div>
                      <label className={labelCls}>Título {i + 1}</label>
                      <input name={`pilar_${i + 1}_title`} defaultValue={p.title} className={inputCls} placeholder="Ex: Qualidade" />
                    </div>
                    <div className="col-span-2">
                      <label className={labelCls}>Descrição {i + 1}</label>
                      <input name={`pilar_${i + 1}_desc`} defaultValue={p.desc} className={inputCls} placeholder="Breve descrição..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SEO */}
        <div className={sectionCls}>
          <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">SEO</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Título SEO</label>
              <input name="seo_title" defaultValue={page.seo_title ?? ""} className={inputCls} placeholder="Título para Google" />
            </div>
            <div>
              <label className={labelCls}>Descrição SEO</label>
              <input name="seo_desc" defaultValue={page.seo_desc ?? ""} className={inputCls} placeholder="Descrição para Google" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link href="/admin/paginas" className="text-sm text-gray-500 hover:text-gray-700">Cancelar</Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all rounded-md"
          >
            Salvar página
          </button>
        </div>
      </form>
    </div>
  );
}
