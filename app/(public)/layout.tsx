import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/public/header/header";
import { Footer } from "@/components/public/footer/footer";
import { WhatsappButton } from "@/components/public/whatsapp-button";
import { WhatsappProvider } from "@/components/public/whatsapp-provider";
import { CookieBanner } from "@/components/public/cookie-banner";

async function getLayoutData() {
  const supabase = await createClient();

  const [categoriesRes, settingsRes] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, parent_id, sort_order")
      .eq("active", true)
      .order("sort_order"),
    supabase
      .from("settings")
      .select("key, value")
      .in("key", ["site_name", "whatsapp", "email", "instagram", "facebook", "header_logo_url", "footer_logo_url"]),
  ]);

  const allCats = categoriesRes.data ?? [];
  const settings = Object.fromEntries(
    (settingsRes.data ?? []).map((s) => [s.key, s.value as string])
  );

  // Build tree: root categories with their children
  const roots = allCats
    .filter((c) => !c.parent_id)
    .map((cat) => ({
      ...cat,
      children: allCats.filter((c) => c.parent_id === cat.id),
    }));

  return {
    categories: roots,
    siteName: settings.site_name ?? "Turatti",
    whatsapp: settings.whatsapp ?? "",
    email: settings.email ?? "",
    instagram: settings.instagram ?? "",
    facebook: settings.facebook ?? "",
    headerLogoUrl: settings.header_logo_url ?? "",
    footerLogoUrl: settings.footer_logo_url ?? "",
  };
}

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const { categories, siteName, whatsapp, email, instagram, facebook, headerLogoUrl, footerLogoUrl } =
    await getLayoutData();

  return (
    <WhatsappProvider>
      <div className="flex flex-col min-h-screen">
        <Header categories={categories} whatsapp={whatsapp} logoUrl={headerLogoUrl} siteName={siteName} />
        <main className="flex-1">{children}</main>
        <Footer
          siteName={siteName}
          whatsapp={whatsapp}
          email={email}
          instagram={instagram}
          facebook={facebook}
          logoUrl={footerLogoUrl}
        />
        <WhatsappButton />
        <CookieBanner />
      </div>
    </WhatsappProvider>
  );
}
