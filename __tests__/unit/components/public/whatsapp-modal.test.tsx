import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WhatsappModal } from "@/components/public/whatsapp-modal";

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("@phosphor-icons/react", () => ({
  X: () => <span data-testid="icon-x" />,
  WhatsappLogo: () => <span data-testid="icon-wa" />,
  ArrowLeft: () => <span data-testid="icon-back" />,
  Storefront: () => <span data-testid="icon-store" />,
  User: () => <span data-testid="icon-user" />,
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;
const mockWindowOpen = vi.fn();
global.window.open = mockWindowOpen;

// ── Fixtures ──────────────────────────────────────────────────────────────────

const departments = [
  {
    id: "dept-1",
    name: "Vendas",
    description: "Equipe de vendas",
    whatsapp_contacts: [
      { id: "c-1", name: "João", role: "Consultor", phone: "11999990001" },
      { id: "c-2", name: "Maria", role: "Consultora", phone: "11999990002" },
    ],
  },
  {
    id: "dept-2",
    name: "Suporte",
    description: null,
    whatsapp_contacts: [
      { id: "c-3", name: "Carlos", role: null, phone: "11999990003" },
    ],
  },
];

function mockDepartmentsResponse(data = departments) {
  mockFetch.mockResolvedValue({
    json: () => Promise.resolve(data),
  });
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("WhatsappModal", () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockDepartmentsResponse();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("não renderiza nada quando open=false", () => {
    const { container } = render(<WhatsappModal open={false} onClose={onClose} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza modal quando open=true", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => {
      expect(screen.getByText("Falar pelo WhatsApp")).toBeInTheDocument();
    });
  });

  it("busca departamentos via /api/whatsapp-departments ao abrir", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/whatsapp-departments");
    });
  });

  it("lista departamentos na etapa 1", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => {
      expect(screen.getByText("Vendas")).toBeInTheDocument();
      expect(screen.getByText("Suporte")).toBeInTheDocument();
    });
  });

  it("exibe descrição do departamento quando fornecida", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => {
      expect(screen.getByText("Equipe de vendas")).toBeInTheDocument();
    });
  });

  it("exibe contagem de atendentes por departamento", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => {
      expect(screen.getByText("2 atendentes")).toBeInTheDocument();
      expect(screen.getByText("1 atendente")).toBeInTheDocument();
    });
  });

  it("exibe 'Nenhum departamento disponível' quando lista vazia", async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve([]) });
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => {
      expect(screen.getByText("Nenhum departamento disponível.")).toBeInTheDocument();
    });
  });

  it("avança para etapa 2 ao clicar em departamento", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Vendas"));

    await user.click(screen.getByText("Vendas"));

    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.getByText("Maria")).toBeInTheDocument();
    expect(screen.getByText("Escolha um atendente")).toBeInTheDocument();
  });

  it("exibe cargo do contato quando fornecido", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Vendas"));
    await user.click(screen.getByText("Vendas"));

    expect(screen.getByText("Consultor")).toBeInTheDocument();
    expect(screen.getByText("Consultora")).toBeInTheDocument();
  });

  it("volta para etapa 1 ao clicar no botão de voltar", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Vendas"));
    await user.click(screen.getByText("Vendas"));

    await user.click(screen.getByTestId("icon-back"));

    expect(screen.getByText("Escolha a loja ou setor")).toBeInTheDocument();
  });

  it("abre WhatsApp no número correto ao clicar em contato", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Vendas"));
    await user.click(screen.getByText("Vendas"));
    await user.click(screen.getByText("João"));

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining("wa.me/11999990001"),
      "_blank"
    );
  });

  it("fecha modal após clicar em contato do WhatsApp", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Vendas"));
    await user.click(screen.getByText("Vendas"));
    await user.click(screen.getByText("João"));

    expect(onClose).toHaveBeenCalled();
  });

  it("fecha modal ao clicar no botão X", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Falar pelo WhatsApp"));

    await user.click(screen.getByTestId("icon-x").closest("button")!);

    expect(onClose).toHaveBeenCalled();
  });

  it("fecha modal ao pressionar Escape", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Falar pelo WhatsApp"));

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalled();
  });

  it("fecha modal ao clicar no backdrop", async () => {
    render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Falar pelo WhatsApp"));

    // O container externo tem onClick={onClose}
    const backdrop = document.querySelector(".fixed.inset-0") as HTMLElement;
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalled();
  });

  it("reseta seleção de departamento ao reabrir", async () => {
    const { rerender } = render(<WhatsappModal open={true} onClose={onClose} />);
    await waitFor(() => screen.getByText("Vendas"));
    await user.click(screen.getByText("Vendas"));
    expect(screen.getByText("Escolha um atendente")).toBeInTheDocument();

    // Fecha e reabre
    rerender(<WhatsappModal open={false} onClose={onClose} />);
    mockDepartmentsResponse();
    rerender(<WhatsappModal open={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText("Escolha a loja ou setor")).toBeInTheDocument();
    });
  });
});
