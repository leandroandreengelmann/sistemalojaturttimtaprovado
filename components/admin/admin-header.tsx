"use client";

import { useState } from "react";
import { List } from "@phosphor-icons/react";
import { AdminSidebar } from "./admin-sidebar";

interface AdminHeaderProps {
  title: string;
  logoUrl?: string | null;
}

export function AdminHeader({ title, logoUrl }: AdminHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 text-white border-b border-gray-800">
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="p-1 text-gray-400 hover:text-white"
        >
          <List size={22} />
        </button>
        <p className="text-sm font-semibold">{title}</p>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0">
            <AdminSidebar onClose={() => setOpen(false)} logoUrl={logoUrl} />
          </div>
        </div>
      )}
    </>
  );
}
