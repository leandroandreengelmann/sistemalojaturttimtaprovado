import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/app/(auth)/admin/login/login-form";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockSignIn = vi.fn();
const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: mockSignIn,
    },
  })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@phosphor-icons/react", () => ({
  Eye: () => <span data-testid="icon-eye" />,
  EyeSlash: () => <span data-testid="icon-eye-slash" />,
  SignIn: () => <span />,
  ArrowRight: () => <span />,
  LockKey: () => <span />,
}));

// ── Tests ────────────────────────────────────────────────────────────────────

describe("LoginForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSignIn.mockResolvedValue({ error: null });
  });

  it("renderiza campo de email e senha", () => {
    render(<LoginForm siteName="Turatti" />);

    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("renderiza o nome do site no mobile header", () => {
    render(<LoginForm siteName="Turatti" />);

    expect(screen.getByText("Turatti")).toBeInTheDocument();
  });

  it("renderiza link para recuperação de senha", () => {
    render(<LoginForm siteName="Turatti" />);

    expect(screen.getByText("Esqueceu a senha?")).toHaveAttribute(
      "href",
      "/admin/recuperar-senha"
    );
  });

  it("chama signInWithPassword com email e senha informados", async () => {
    render(<LoginForm siteName="Turatti" />);

    await user.type(screen.getByPlaceholderText("seu@email.com"), "admin@turatti.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "senha123");
    await user.click(screen.getByRole("button", { name: /entrar no painel/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: "admin@turatti.com",
        password: "senha123",
      });
    });
  });

  it("redireciona para /admin após login bem-sucedido", async () => {
    render(<LoginForm siteName="Turatti" />);

    await user.type(screen.getByPlaceholderText("seu@email.com"), "admin@turatti.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "senha123");
    await user.click(screen.getByRole("button", { name: /entrar no painel/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin");
    });
  });

  it("exibe erro quando credenciais são inválidas", async () => {
    mockSignIn.mockResolvedValue({ error: { message: "Invalid credentials" } });
    render(<LoginForm siteName="Turatti" />);

    await user.type(screen.getByPlaceholderText("seu@email.com"), "wrong@email.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "wrongpass");
    await user.click(screen.getByRole("button", { name: /entrar no painel/i }));

    await waitFor(() => {
      expect(
        screen.getByText("E-mail ou senha incorretos. Verifique suas credenciais.")
      ).toBeInTheDocument();
    });
  });

  it("não redireciona quando credenciais são inválidas", async () => {
    mockSignIn.mockResolvedValue({ error: { message: "Invalid" } });
    render(<LoginForm siteName="Turatti" />);

    await user.type(screen.getByPlaceholderText("seu@email.com"), "x@x.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "wrong");
    await user.click(screen.getByRole("button", { name: /entrar no painel/i }));

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it("mostra/oculta senha ao clicar no toggle", async () => {
    render(<LoginForm siteName="Turatti" />);

    const passwordInput = screen.getByPlaceholderText("••••••••");
    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: /mostrar senha/i }));
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: /ocultar senha/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("botão fica desabilitado enquanto carrega", async () => {
    let resolve: (v: { error: null }) => void;
    mockSignIn.mockReturnValue(new Promise((r) => { resolve = r; }));
    render(<LoginForm siteName="Turatti" />);

    await user.type(screen.getByPlaceholderText("seu@email.com"), "admin@turatti.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "senha123");
    await user.click(screen.getByRole("button", { name: /entrar no painel/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /entrando/i })).toBeDisabled();
    });

    resolve!({ error: null });
  });
});
