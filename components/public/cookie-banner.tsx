"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "@phosphor-icons/react";

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Cookie size={28} weight="fill" className="shrink-0 text-primary mt-0.5 sm:mt-0" />
        <div className="flex-1 text-sm text-gray-300 leading-relaxed">
          Usamos cookies essenciais para o funcionamento do site.{" "}
          <Link href="/cookies" className="text-primary underline hover:text-primary/80 transition-colors">
            Saiba mais
          </Link>{" "}
          sobre nossa Política de Cookies.
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
          >
            <X size={13} />
            Rejeitar
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  );
}
