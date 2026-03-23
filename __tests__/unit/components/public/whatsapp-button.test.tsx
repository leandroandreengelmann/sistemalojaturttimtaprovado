import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WhatsappButton } from "@/components/public/whatsapp-button";
import { WhatsappProvider } from "@/components/public/whatsapp-provider";

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("@phosphor-icons/react", () => ({
  WhatsappLogo: () => <span data-testid="icon-wa" />,
  // Ícones usados pelo WhatsappModal (renderizado pelo Provider)
  X: () => <span data-testid="icon-x" />,
  ArrowLeft: () => <span />,
  Storefront: () => <span />,
  User: () => <span />,
}));

// Stub do modal para isolar o botão
vi.mock("@/components/public/whatsapp-modal", () => ({
  WhatsappModal: ({ open }: { open: boolean }) =>
    open ? <div data-testid="whatsapp-modal" /> : null,
}));

// ── Tests ────────────────────────────────────────────────────────────────────

describe("WhatsappButton", () => {
  const user = userEvent.setup();

  function renderWithProvider() {
    return render(
      <WhatsappProvider>
        <WhatsappButton />
      </WhatsappProvider>
    );
  }

  it("renderiza o botão com aria-label correto", () => {
    renderWithProvider();
    expect(
      screen.getByRole("button", { name: /falar pelo whatsapp/i })
    ).toBeInTheDocument();
  });

  it("renderiza ícone do WhatsApp", () => {
    renderWithProvider();
    expect(screen.getByTestId("icon-wa")).toBeInTheDocument();
  });

  it("tem posicionamento fixo (classe 'fixed')", () => {
    renderWithProvider();
    const btn = screen.getByRole("button", { name: /falar pelo whatsapp/i });
    expect(btn.className).toContain("fixed");
  });

  it("abre o modal ao ser clicado", async () => {
    renderWithProvider();

    expect(screen.queryByTestId("whatsapp-modal")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /falar pelo whatsapp/i }));

    expect(screen.getByTestId("whatsapp-modal")).toBeInTheDocument();
  });
});
