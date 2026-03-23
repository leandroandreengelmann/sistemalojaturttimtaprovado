import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaqAccordion } from "@/components/public/faq/faq-accordion";

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("@phosphor-icons/react", () => ({
  Plus: () => <span data-testid="icon-plus" />,
  Minus: () => <span data-testid="icon-minus" />,
}));

// ── Fixtures ──────────────────────────────────────────────────────────────────

const faqs = [
  { q: "Qual o prazo de entrega?", a: "O prazo é de 3 a 5 dias úteis." },
  { q: "Como faço para trocar?", a: "Entre em contato pelo WhatsApp." },
  { q: "Vocês entregam em todo o Brasil?", a: "Sim, entregamos para todo o Brasil." },
];

// ── Tests ────────────────────────────────────────────────────────────────────

describe("FaqAccordion", () => {
  const user = userEvent.setup();

  it("renderiza todas as perguntas", () => {
    render(<FaqAccordion faqs={faqs} />);

    for (const faq of faqs) {
      expect(screen.getByText(faq.q)).toBeInTheDocument();
    }
  });

  it("abre o primeiro item por padrão", () => {
    render(<FaqAccordion faqs={faqs} />);

    expect(screen.getByText("O prazo é de 3 a 5 dias úteis.")).toBeInTheDocument();
  });

  it("não exibe respostas fechadas", () => {
    render(<FaqAccordion faqs={faqs} />);

    expect(screen.queryByText("Entre em contato pelo WhatsApp.")).not.toBeInTheDocument();
    expect(screen.queryByText("Sim, entregamos para todo o Brasil.")).not.toBeInTheDocument();
  });

  it("exibe ícone Minus no item aberto e Plus nos fechados", () => {
    render(<FaqAccordion faqs={faqs} />);

    expect(screen.getByTestId("icon-minus")).toBeInTheDocument();
    expect(screen.getAllByTestId("icon-plus")).toHaveLength(2);
  });

  it("abre item ao clicar na pergunta", async () => {
    render(<FaqAccordion faqs={faqs} />);

    await user.click(screen.getByText("Como faço para trocar?"));

    expect(screen.getByText("Entre em contato pelo WhatsApp.")).toBeInTheDocument();
  });

  it("fecha item aberto ao clicar nele novamente", async () => {
    render(<FaqAccordion faqs={faqs} />);

    await user.click(screen.getByText("Qual o prazo de entrega?"));

    expect(screen.queryByText("O prazo é de 3 a 5 dias úteis.")).not.toBeInTheDocument();
  });

  it("fecha item anterior ao abrir outro", async () => {
    render(<FaqAccordion faqs={faqs} />);

    await user.click(screen.getByText("Como faço para trocar?"));

    expect(screen.queryByText("O prazo é de 3 a 5 dias úteis.")).not.toBeInTheDocument();
    expect(screen.getByText("Entre em contato pelo WhatsApp.")).toBeInTheDocument();
  });

  it("apenas um item fica aberto por vez", async () => {
    render(<FaqAccordion faqs={faqs} />);

    await user.click(screen.getByText("Vocês entregam em todo o Brasil?"));

    const visibleAnswers = faqs.filter((f) =>
      screen.queryByText(f.a)
    );
    expect(visibleAnswers).toHaveLength(1);
    expect(visibleAnswers[0].a).toBe("Sim, entregamos para todo o Brasil.");
  });

  it("renderiza corretamente com lista vazia", () => {
    const { container } = render(<FaqAccordion faqs={[]} />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
