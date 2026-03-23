import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/public/contact/contact-form";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockSubmitContactForm = vi.fn();

vi.mock("@/lib/actions/contacts", () => ({
  submitContactForm: (...args: unknown[]) => mockSubmitContactForm(...args),
}));

// Phosphor icons não precisam renderizar no jsdom
vi.mock("@phosphor-icons/react", () => ({
  CheckCircle: () => <span data-testid="icon-check" />,
}));

// ── Tests ────────────────────────────────────────────────────────────────────

describe("ContactForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSubmitContactForm.mockResolvedValue(undefined);
  });

  it("renderiza campos obrigatórios", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Seu nome completo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Descreva como podemos ajudar...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar mensagem/i })).toBeInTheDocument();
  });

  it("renderiza campo de email e telefone", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("(00) 00000-0000")).toBeInTheDocument();
  });

  it("renderiza select de assunto com opções corretas", () => {
    render(<ContactForm />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("Solicitar orçamento")).toBeInTheDocument();
    expect(screen.getByText("Parceria comercial")).toBeInTheDocument();
  });

  it("chama submitContactForm ao submeter formulário válido", async () => {
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Seu nome completo"), "João Silva");
    await user.type(
      screen.getByPlaceholderText("Descreva como podemos ajudar..."),
      "Preciso de informações sobre tintas"
    );
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(mockSubmitContactForm).toHaveBeenCalledOnce();
    });
  });

  it("exibe mensagem de sucesso após envio bem-sucedido", async () => {
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Seu nome completo"), "Maria");
    await user.type(
      screen.getByPlaceholderText("Descreva como podemos ajudar..."),
      "Quero um orçamento"
    );
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText("Mensagem enviada!")).toBeInTheDocument();
    });
  });

  it("exibe link para enviar outra mensagem após sucesso", async () => {
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Seu nome completo"), "Maria");
    await user.type(
      screen.getByPlaceholderText("Descreva como podemos ajudar..."),
      "Quero um orçamento"
    );
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText("Enviar outra mensagem")).toBeInTheDocument();
    });
  });

  it("volta ao formulário ao clicar em 'Enviar outra mensagem'", async () => {
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Seu nome completo"), "Maria");
    await user.type(
      screen.getByPlaceholderText("Descreva como podemos ajudar..."),
      "Mensagem"
    );
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => screen.getByText("Enviar outra mensagem"));
    await user.click(screen.getByText("Enviar outra mensagem"));

    expect(screen.getByPlaceholderText("Seu nome completo")).toBeInTheDocument();
  });

  it("exibe mensagem de erro quando action lança exceção", async () => {
    mockSubmitContactForm.mockRejectedValue(new Error("Server error"));
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Seu nome completo"), "João");
    await user.type(
      screen.getByPlaceholderText("Descreva como podemos ajudar..."),
      "Mensagem"
    );
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Ocorreu um erro ao enviar. Tente novamente.")
      ).toBeInTheDocument();
    });
  });

  it("não exibe mensagem de erro no estado inicial", () => {
    render(<ContactForm />);

    expect(
      screen.queryByText("Ocorreu um erro ao enviar. Tente novamente.")
    ).not.toBeInTheDocument();
  });

  it("botão fica desabilitado durante o envio", async () => {
    let resolve: () => void;
    mockSubmitContactForm.mockReturnValue(
      new Promise<void>((r) => { resolve = r; })
    );
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Seu nome completo"), "João");
    await user.type(
      screen.getByPlaceholderText("Descreva como podemos ajudar..."),
      "Mensagem"
    );
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled();
    });

    resolve!();
  });
});
