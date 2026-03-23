import { createClient } from "@/lib/supabase/server";
import { IdentidadeEditor } from "@/components/admin/identidade-editor";

const KEYS = [
  "header_logo_url",
  "footer_logo_url",
  "site_name",
  "site_tagline",
  "whatsapp",
  "email",
  "instagram",
  "facebook",
  "seo_title",
  "seo_description",
];

export default async function IdentidadePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("key, value").in("key", KEYS);
  const s = Object.fromEntries((data ?? []).map((r) => [r.key, r.value as string]));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Identidade Visual</h1>
        <p className="text-sm text-gray-500 mt-1">Logos, dados do site e configurações de SEO.</p>
      </div>
      <IdentidadeEditor
        headerLogoUrl={s["header_logo_url"]}
        footerLogoUrl={s["footer_logo_url"]}
        siteName={s["site_name"]}
        siteTagline={s["site_tagline"]}
        whatsapp={s["whatsapp"]}
        email={s["email"]}
        instagram={s["instagram"]}
        facebook={s["facebook"]}
        seoTitle={s["seo_title"]}
        seoDescription={s["seo_description"]}
      />
    </div>
  );
}
