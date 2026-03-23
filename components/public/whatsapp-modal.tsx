"use client";

import { useState, useEffect, useCallback } from "react";
import { X, WhatsappLogo, ArrowLeft, Storefront, User } from "@phosphor-icons/react";

interface Contact {
  id: string;
  name: string;
  role: string | null;
  phone: string;
}

interface Department {
  id: string;
  name: string;
  description: string | null;
  whatsapp_contacts: Contact[];
}

interface WhatsappModalProps {
  open: boolean;
  onClose: () => void;
}

const WA_MESSAGE = "Olá%2C%20gostaria%20de%20falar%20com%20um%20atendente.";

export function WhatsappModal({ open, onClose }: WhatsappModalProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selected, setSelected] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/whatsapp-departments");
      const data = await res.json();
      setDepartments(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setSelected(null);
      fetchDepartments();
    }
  }, [open, fetchDepartments]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  function openWhatsapp(phone: string) {
    const number = phone.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${WA_MESSAGE}`, "_blank");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {selected && (
              <button
                onClick={() => setSelected(null)}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
              <WhatsappLogo size={18} weight="fill" className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {selected ? selected.name : "Falar pelo WhatsApp"}
              </p>
              <p className="text-xs text-gray-400">
                {selected ? "Escolha um atendente" : "Escolha a loja ou setor"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !selected ? (
            /* Step 1: departments */
            <div className="space-y-2">
              {departments.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">Nenhum departamento disponível.</p>
              )}
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelected(dept)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-100 hover:border-[#25D366]/40 hover:bg-green-50 transition-all text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-[#25D366]/10 flex items-center justify-center shrink-0 transition-colors">
                    <Storefront size={18} className="text-gray-500 group-hover:text-[#25D366]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{dept.name}</p>
                    {dept.description && (
                      <p className="text-xs text-gray-400 truncate">{dept.description}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">
                    {dept.whatsapp_contacts.length} atendente{dept.whatsapp_contacts.length !== 1 ? "s" : ""}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            /* Step 2: contacts */
            <div className="space-y-2">
              {selected.whatsapp_contacts.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">Nenhum atendente disponível.</p>
              )}
              {selected.whatsapp_contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => openWhatsapp(contact.phone)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-100 hover:border-[#25D366]/40 hover:bg-green-50 transition-all text-left group"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-[#25D366]/10 flex items-center justify-center shrink-0 transition-colors">
                    <User size={18} className="text-gray-500 group-hover:text-[#25D366]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{contact.name}</p>
                    {contact.role && (
                      <p className="text-xs text-gray-400">{contact.role}</p>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <WhatsappLogo size={16} weight="fill" className="text-white" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
