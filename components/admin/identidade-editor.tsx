"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { FloppyDisk } from "@phosphor-icons/react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveSetting } from "@/lib/actions/settings";

interface IdentidadeEditorProps {
  headerLogoUrl?: string;
  footerLogoUrl?: string;
  siteName?: string;
  siteTagline?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export function IdentidadeEditor({
  headerLogoUrl: initialHeaderLogo,
  footerLogoUrl: initialFooterLogo,
  siteName: initialSiteName = "",
  siteTagline: initialTagline = "",
  whatsapp: initialWhatsapp = "",
  email: initialEmail = "",
  instagram: initialInstagram = "",
  facebook: initialFacebook = "",
  seoTitle: initialSeoTitle = "",
  seoDescription: initialSeoDescription = "",
}: IdentidadeEditorProps) {
  const [headerLogo, setHeaderLogo] = useState(initialHeaderLogo ?? "");
  const [footerLogo, setFooterLogo] = useState(initialFooterLogo ?? "");
  const [siteName, setSiteName] = useState(initialSiteName);
  const [siteTagline, setSiteTagline] = useState(initialTagline);
  const [whatsapp, setWhatsapp] = useState(initialWhatsapp);
  const [email, setEmail] = useState(initialEmail);
  const [instagram, setInstagram] = useState(initialInstagram);
  const [facebook, setFacebook] = useState(initialFacebook);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      const results = await Promise.all([
        saveSetting("header_logo_url", headerLogo),
        saveSetting("footer_logo_url", footerLogo),
        saveSetting("site_name", siteName),
        saveSetting("site_tagline", siteTagline),
        saveSetting("whatsapp", whatsapp),
        saveSetting("email", email),
        saveSetting("instagram", instagram),
        saveSetting("facebook", facebook),
        saveSetting("seo_title", seoTitle),
        saveSetting("seo_description", seoDescription),
      ]);

      const hasError = results.some((r) => r.error);
      if (hasError) {
        toast.error("Erro ao salvar. Tente novamente.");
      } else {
        toast.success("Identidade visual salva com sucesso!");
      }
    });
  }

  return (
    <div className="space-y-6">

      {/* Logos */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Logos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">Logo do Cabeçalho</p>
            <p className="text-[11px] text-gray-400 mb-3">PNG/SVG com fundo transparente, altura ~40px</p>
            <ImageUpload
              bucket="banners"
              folder="logos"
              defaultValue={initialHeaderLogo}
              onChange={setHeaderLogo}
              hint="PNG, SVG ou WebP"
            />
            {headerLogo && (
              <div className="mt-3 bg-white border border-gray-200 rounded-md px-4 py-3 flex items-center">
                <Image src={headerLogo} alt="Logo cabeçalho" width={160} height={40} className="h-8 w-auto object-contain" unoptimized />
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">Logo do Rodapé</p>
            <p className="text-[11px] text-gray-400 mb-3">Versão clara/branca para fundo escuro</p>
            <ImageUpload
              bucket="banners"
              folder="logos"
              defaultValue={initialFooterLogo}
              onChange={setFooterLogo}
              hint="PNG, SVG ou WebP"
            />
            {footerLogo && (
              <div className="mt-3 bg-gray-900 rounded-md px-4 py-3 flex items-center">
                <Image src={footerLogo} alt="Logo rodapé" width={160} height={40} className="h-8 w-auto object-contain" unoptimized />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dados do Site */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Dados do Site</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nome do site</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Turatti"
                className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tagline</label>
              <input
                type="text"
                value={siteTagline}
                onChange={(e) => setSiteTagline(e.target.value)}
                placeholder="Qualidade e tradição"
                className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">WhatsApp (com DDI)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="5511999999999"
                className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">E-mail de contato</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contato@turatti.com.br"
                className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Instagram (URL)</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/turatti"
                className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Facebook (URL)</label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/turatti"
                className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Título SEO (home)</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Turatti — Catálogo de Produtos"
              className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Descrição SEO (home)</label>
            <input
              type="text"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Conheça nosso catálogo..."
              className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Salvar */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <FloppyDisk size={16} weight="bold" />
          {isPending ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
