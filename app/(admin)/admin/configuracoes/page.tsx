import { createClient } from "@/lib/supabase/server";
import { updateSettings } from "@/lib/actions/contacts";

const fields = [
  { key: "site_name",       label: "Nome do site",         type: "text",  placeholder: "Turatti" },
  { key: "site_tagline",    label: "Tagline",              type: "text",  placeholder: "Qualidade e tradição" },
  { key: "whatsapp",        label: "WhatsApp (com DDI)",   type: "text",  placeholder: "5511999999999" },
  { key: "email",           label: "E-mail de contato",    type: "email", placeholder: "contato@turatti.com.br" },
  { key: "instagram",       label: "Instagram (URL)",      type: "url",   placeholder: "https://instagram.com/turatti" },
  { key: "facebook",        label: "Facebook (URL)",       type: "url",   placeholder: "https://facebook.com/turatti" },
  { key: "seo_title",       label: "Título SEO (home)",    type: "text",  placeholder: "Turatti — Catálogo de Produtos" },
  { key: "seo_description", label: "Descrição SEO (home)", type: "text",  placeholder: "Conheça nosso catálogo..." },
];

export default async function ConfiguracoesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("key, value");
  const settings = Object.fromEntries((data ?? []).map((s) => [s.key, s.value as string]));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Configurações</h1>
        <p className="text-xs text-gray-500 mt-0.5">Dados gerais do site, SEO e integrações</p>
      </div>

      <form action={updateSettings} className="bg-white border border-gray-200 p-6 space-y-5 rounded-lg">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              {f.label}
            </label>
            <input
              type={f.type}
              name={f.key}
              defaultValue={settings[f.key] ?? ""}
              placeholder={f.placeholder}
              className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
            />
          </div>
        ))}

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all rounded-md"
          >
            Salvar configurações
          </button>
        </div>
      </form>
    </div>
  );
}
