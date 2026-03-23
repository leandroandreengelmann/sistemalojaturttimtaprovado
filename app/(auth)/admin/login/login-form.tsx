"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeSlash, SignIn, ArrowRight, LockKey } from "@phosphor-icons/react";
import Link from "next/link";

interface LoginFormProps {
  siteName: string;
}

export function LoginForm({ siteName }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-mail ou senha incorretos. Verifique suas credenciais.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 p-6 lg:p-12">
      {/* Logo mobile */}
      <div className="lg:hidden text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
            <LockKey size={14} weight="fill" className="text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Painel</p>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">{siteName}</h1>
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Entre com suas credenciais para acessar o painel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white text-sm placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors rounded-lg"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Senha
              </label>
              <Link
                href="/admin/recuperar-senha"
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 bg-gray-800 border border-gray-700 text-white text-sm placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPwd ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 text-xs text-red-400 bg-red-950/50 border border-red-900/60 px-3.5 py-3 rounded-lg">
              <span className="mt-px shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded-lg mt-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                <SignIn size={16} weight="bold" />
                Entrar no painel
                <ArrowRight
                  size={14}
                  className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-700 mt-8">
          Acesso restrito à equipe administrativa.
        </p>
      </div>
    </div>
  );
}
