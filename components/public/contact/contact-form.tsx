"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/lib/actions/contacts";
import { CheckCircle } from "@phosphor-icons/react";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const inputCls =
    "w-full px-3 py-2.5 text-sm border border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white rounded-md";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await submitContactForm(fd);
        setSent(true);
      } catch {
        setError("Ocorreu um erro ao enviar. Tente novamente.");
      }
    });
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-gray-100 bg-white rounded-lg">
        <CheckCircle size={48} weight="fill" className="text-primary mb-4" />
        <h2 className="text-lg font-bold text-gray-900 mb-2">Mensagem enviada!</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Recebemos seu contato e retornaremos em breve. Obrigado!
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-xs text-primary hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white border border-gray-200 p-5 lg:p-6 space-y-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nome *</label>
            <input
              name="name"
              required
              placeholder="Seu nome completo"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Telefone / WhatsApp</label>
            <input
              name="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Assunto</label>
          <select name="subject" className={inputCls}>
            <option value="">Selecione o assunto</option>
            <option value="orcamento">Solicitar orçamento</option>
            <option value="informacoes">Informações sobre produtos</option>
            <option value="parceria">Parceria comercial</option>
            <option value="reclamacao">Reclamação / Suporte</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Mensagem *</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Descreva como podemos ajudar..."
            className={inputCls}
          />
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-4 py-3 rounded-md">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">* Campos obrigatórios</p>
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 rounded-md"
        >
          {isPending ? "Enviando..." : "Enviar mensagem"}
        </button>
      </div>
    </form>
  );
}
