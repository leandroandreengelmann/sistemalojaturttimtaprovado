"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { useWhatsapp } from "@/components/public/whatsapp-provider";

export function WhatsappButton() {
  const { open } = useWhatsapp();

  return (
    <button
      onClick={open}
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      style={{ willChange: "transform" }}
    >
      <WhatsappLogo size={28} weight="fill" />
    </button>
  );
}
