"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const headingId = `faq-heading-${i}`;
        return (
          <div key={i} className="bg-white">
            <h3 id={headingId} className="m-0">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">{item.q}</span>
                <span className="shrink-0 text-primary" aria-hidden="true">
                  {isOpen ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className="px-5 pb-5"
            >
              <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
