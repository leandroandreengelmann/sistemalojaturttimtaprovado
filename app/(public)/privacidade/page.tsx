import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("institutional_pages")
    .select("seo_title, seo_desc")
    .eq("slug", "privacidade")
    .maybeSingle();
  return {
    title: data?.seo_title ?? "Política de Privacidade | Turatti",
    description: data?.seo_desc ?? undefined,
  };
}

const defaultContent = `
<h2>1. Informações que coletamos</h2>
<p>Coletamos informações fornecidas diretamente por você quando entra em contato, como nome, e-mail, telefone e mensagem. Não coletamos dados de pagamento ou dados sensíveis.</p>

<h2>2. Como usamos as informações</h2>
<p>As informações coletadas são utilizadas exclusivamente para responder às suas solicitações de contato, orçamento ou suporte. Não compartilhamos seus dados com terceiros sem seu consentimento, exceto quando exigido por lei.</p>

<h2>3. Cookies</h2>
<p>Utilizamos cookies essenciais para o funcionamento do site. Não utilizamos cookies de rastreamento ou publicidade comportamental.</p>

<h2>4. Segurança</h2>
<p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou alteração.</p>

<h2>5. Seus direitos (LGPD)</h2>
<p>De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a acessar, corrigir ou solicitar a exclusão de seus dados pessoais. Para exercer esses direitos, entre em contato pelo nosso formulário de contato.</p>

<h2>6. Contato</h2>
<p>Dúvidas sobre esta política podem ser enviadas pelo nosso <a href="/contato">formulário de contato</a>.</p>

<h2>7. Atualizações</h2>
<p>Esta política pode ser atualizada periodicamente. A data da última revisão é exibida abaixo.</p>
`;

export default async function PrivacidadePage() {
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("institutional_pages")
    .select("title, content, updated_at")
    .eq("slug", "privacidade")
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
            {page?.title ?? "Política de Privacidade"}
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
