"use client";

import { createContext, useContext, useState } from "react";
import { WhatsappModal } from "@/components/public/whatsapp-modal";

const WhatsappContext = createContext<{ open: () => void }>({ open: () => {} });

export function useWhatsapp() {
  return useContext(WhatsappContext);
}

export function WhatsappProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WhatsappContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <WhatsappModal open={isOpen} onClose={() => setIsOpen(false)} />
    </WhatsappContext.Provider>
  );
}
