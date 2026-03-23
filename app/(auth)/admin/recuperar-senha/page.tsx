"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
} from "@phosphor-icons/react";
import Link from "next/link";

type Step = "email" | "codigo" | "nova-senha" | "sucesso";

export default function RecuperarSenhaPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1 — enviar e-mail com OTP
  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

    if (error) {
      setError(
        error.message.includes("not found") || error.message.includes("invalid")
          ? "E-mail não encontrado. Verifique e tente novamente."
          : "Não foi possível enviar o código. Tente novamente."
      );
      setLoading(false);
      return;
    }

    setStep("codigo");
    setLoading(false);
  }

  // Step 2 — verificar código OTP
  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    const token = code.join("");
    if (token.length < 6) {
      setError("Digite todos os 6 dígitos do código.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      setError("Código inválido ou expirado. Verifique o e-mail e tente novamente.");
      setLoading(false);
      return;
    }

    setStep("nova-senha");
    setLoading(false);
  }

  // Step 3 — definir nova senha
  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setError("Não foi possível atualizar a senha. Tente novamente.");
      setLoading(false);
      return;
    }

    setStep("sucesso");
    setLoading(false);
  }

  // Controle dos inputs de código OTP
  function handleCodeChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  }

  function handleCodePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...code];
    pasted.split("").forEach((char, i) => { next[i] = char; });
    setCode(next);
    const nextIndex = Math.min(pasted.length, 5);
    codeRefs.current[nextIndex]?.focus();
  }

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: "email", label: "E-mail", icon: <NumberCircleOne size={18} weight="fill" /> },
    { id: "codigo", label: "Código", icon: <NumberCircleTwo size={18} weight="fill" /> },
    { id: "nova-senha", label: "Nova senha", icon: <NumberCircleThree size={18} weight="fill" /> },
  ];

  const activeStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-sm">

          {/* Voltar ao login */}
          {step !== "sucesso" && (
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors mb-8"
            >
              <ArrowLeft size={13} />
              Voltar ao login
            </Link>
          )}

          {/* Indicador de progresso */}
          {step !== "sucesso" && (
            <div className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      i <= activeStepIndex ? "text-primary" : "text-gray-700"
                    }`}
                  >
                    {s.icon}
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`flex-1 h-px w-6 transition-colors ${
                        i < activeStepIndex ? "bg-primary" : "bg-gray-800"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Step 1: E-mail ── */}
          {step === "email" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Recuperar senha
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Informe seu e-mail e enviaremos um código de 6 dígitos.
                </p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                    E-mail cadastrado
                  </label>
                  <div className="relative">
                    <EnvelopeSimple
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="seu@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 text-white text-sm placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors rounded-lg"
                    />
                  </div>
                </div>

                {error && <ErrorBox message={error} />}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded-lg"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando código...
                    </>
                  ) : (
                    <>
                      Enviar código por e-mail
                      <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* ── Step 2: Código OTP ── */}
          {step === "codigo" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Digite o código
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Enviamos um código de 6 dígitos para{" "}
                  <span className="text-gray-300 font-medium">{email}</span>.
                  Verifique sua caixa de entrada.
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-6">
                {/* Inputs do código */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                    Código de verificação
                  </label>
                  <div className="flex gap-2 justify-center" onPaste={handleCodePaste}>
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { codeRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                        className="w-11 h-11 text-center text-base font-bold bg-gray-800 border border-gray-700 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {error && <ErrorBox message={error} />}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded-lg"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Verificar código"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep("email"); setCode(["","","","","",""]); setError(""); }}
                  className="w-full text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  Não recebeu? Voltar e reenviar
                </button>
              </form>
            </>
          )}

          {/* ── Step 3: Nova senha ── */}
          {step === "nova-senha" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Crie uma nova senha
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Escolha uma senha forte com pelo menos 8 caracteres.
                </p>
              </div>

              <form onSubmit={handleSetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                    Nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full px-4 py-3 pr-11 bg-gray-800 border border-gray-700 text-white text-sm placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                    >
                      {showPwd ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPwd ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Repita a senha"
                      className="w-full px-4 py-3 pr-11 bg-gray-800 border border-gray-700 text-white text-sm placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                    >
                      {showConfirmPwd ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Força da senha */}
                {newPassword && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 h-1 rounded-full transition-colors ${
                            passwordStrength(newPassword) >= level
                              ? level <= 1
                                ? "bg-red-500"
                                : level <= 2
                                ? "bg-yellow-500"
                                : level <= 3
                                ? "bg-blue-500"
                                : "bg-green-500"
                              : "bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      {["", "Fraca", "Regular", "Boa", "Forte"][passwordStrength(newPassword)]}
                    </p>
                  </div>
                )}

                {error && <ErrorBox message={error} />}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded-lg"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar nova senha"
                  )}
                </button>
              </form>
            </>
          )}

          {/* ── Sucesso ── */}
          {step === "sucesso" && (
            <div className="text-center py-4">
              <div className="flex justify-center mb-6">
                <CheckCircle size={56} weight="fill" className="text-green-500" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight mb-2">
                Senha atualizada!
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                Sua senha foi alterada com sucesso. Você já pode entrar no painel.
              </p>
              <button
                onClick={() => router.push("/admin")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all rounded-lg"
              >
                Ir para o painel
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2.5 text-xs text-red-400 bg-red-950/50 border border-red-900/60 px-3.5 py-3 rounded-lg">
      <span className="mt-px shrink-0">⚠</span>
      <span>{message}</span>
    </div>
  );
}

function passwordStrength(pwd: string): number {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}
