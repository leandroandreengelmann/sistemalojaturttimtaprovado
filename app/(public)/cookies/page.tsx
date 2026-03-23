import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("institutional_pages")
    .select("seo_title, seo_desc")
    .eq("slug", "cookies")
    .maybeSingle();
  return {
    title: data?.seo_title ?? "Política de Cookies | Turatti",
    description: data?.seo_desc ?? undefined,
  };
}

const defaultContent = `
<h2>1. O que são cookies?</h2>
<p>Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles permitem que o site reconheça seu dispositivo em visitas futuras e melhore sua experiência de navegação.</p>

<h2>2. Como usamos os cookies</h2>
<p>Utilizamos cookies estritamente necessários para o funcionamento do site, como manter sua sessão ativa e lembrar suas preferências de navegação. Não utilizamos cookies de rastreamento, publicidade comportamental ou análise de perfil.</p>

<h2>3. Tipos de cookies que usamos</h2>
<p><strong>Cookies essenciais:</strong> Indispensáveis para o funcionamento básico do site. Sem eles, o site não funciona corretamente. Esses cookies não armazenam informações pessoais identificáveis.</p>
<p><strong>Cookies de preferências:</strong> Permitem que o site lembre escolhas que você fez, como seu aceite desta política de cookies.</p>

<h2>4. Cookies de terceiros</h2>
<p>Este site pode incluir conteúdo de serviços de terceiros, como mapas incorporados. Esses serviços podem definir seus próprios cookies. Não temos controle sobre cookies de terceiros e recomendamos a leitura das políticas de privacidade desses serviços.</p>

<h2>5. Como gerenciar os cookies</h2>
<p>Você pode controlar e/ou excluir cookies conforme desejar. Para detalhes, consulte <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>. Você pode excluir todos os cookies já armazenados no seu computador e configurar a maioria dos navegadores para bloqueá-los. No entanto, se fizer isso, pode ser necessário ajustar manualmente algumas preferências toda vez que visitar o site.</p>

<h2>6. Consentimento</h2>
<p>Ao continuar navegando neste site após ser informado sobre o uso de cookies, você concorda com o armazenamento e acesso a cookies no seu dispositivo conforme descrito nesta política.</p>

<h2>7. Alterações nesta política</h2>
<p>Podemos atualizar esta Política de Cookies periodicamente. Recomendamos que você revise esta página regularmente. A data da última revisão é exibida abaixo.</p>

<h2>8. Contato</h2>
<p>Dúvidas sobre esta política podem ser enviadas pelo nosso <a href="/contato">formulário de contato</a>.</p>
`;

export default async function CookiesPage() {
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("institutional_pages")
    .select("title, content, updated_at")
    .eq("slug", "cookies")
    .maybeSingle();

  const content = (page?.content as { body?: string } | null)?.body ?? defaultContent;
  const updatedAt = page?.updated_at
    ? new Date(page.updated_at).toLocaleDateString("pt-BR")
    : new Date().toLocaleDateString("pt-BR");

  return (
    <>
      <div className="h-1 w-full bg-primary" />
      <section className="bg-gray-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Legal
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            {page?.title ?? "Política de Cookies"}
          </h1>
          <p className="mt-3 text-gray-500 text-xs">
            Última atualização: {updatedAt}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-sm prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-base prose-h2:mt-8 prose-h2:mb-2
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </>
  );
}
