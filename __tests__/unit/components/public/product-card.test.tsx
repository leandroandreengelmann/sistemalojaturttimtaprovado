import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/public/product-card";

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    ...rest
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} data-fill={fill ? "true" : undefined} {...rest} />,
}));

vi.mock("@phosphor-icons/react/dist/ssr", () => ({
  WhatsappLogo: () => <span data-testid="icon-whatsapp" />,
  ArrowRight: () => <span data-testid="icon-arrow" />,
}));

// ── Props base ────────────────────────────────────────────────────────────────

const baseProps = {
  id: "prod-1",
  name: "Tinta Acrílica Premium",
  slug: "tinta-acrilica-premium",
  summary: "A melhor tinta para paredes internas e externas.",
  brand: "Suvinil",
  imageUrl: "https://example.com/tinta.jpg",
  imageAlt: "Tinta Acrílica Premium",
  whatsapp: "11999999999",
};

// ── Tests ────────────────────────────────────────────────────────────────────

describe("ProductCard", () => {
  it("renderiza o nome do produto", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText("Tinta Acrílica Premium")).toBeInTheDocument();
  });

  it("renderiza o nome da marca quando fornecida", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText("Suvinil")).toBeInTheDocument();
  });

  it("não renderiza marca quando brand é null", () => {
    render(<ProductCard {...baseProps} brand={null} />);
    expect(screen.queryByText("Suvinil")).not.toBeInTheDocument();
  });

  it("renderiza o sumário quando fornecido", () => {
    render(<ProductCard {...baseProps} />);
    expect(
      screen.getByText("A melhor tinta para paredes internas e externas.")
    ).toBeInTheDocument();
  });

  it("não renderiza sumário quando summary é null", () => {
    render(<ProductCard {...baseProps} summary={null} />);
    expect(
      screen.queryByText("A melhor tinta para paredes internas e externas.")
    ).not.toBeInTheDocument();
  });

  it("link 'Ver detalhes' aponta para /produto/[slug]", () => {
    render(<ProductCard {...baseProps} />);
    const links = screen.getAllByRole("link", { name: /ver detalhes/i });
    expect(links[0]).toHaveAttribute("href", "/produto/tinta-acrilica-premium");
  });

  it("imagem do produto aponta para /produto/[slug] via link", () => {
    render(<ProductCard {...baseProps} />);
    const imageLink = screen.getAllByRole("link").find((a) =>
      a.getAttribute("href") === "/produto/tinta-acrilica-premium"
    );
    expect(imageLink).toBeDefined();
  });

  it("renderiza imagem quando imageUrl é fornecida", () => {
    render(<ProductCard {...baseProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/tinta.jpg");
    expect(img).toHaveAttribute("alt", "Tinta Acrílica Premium");
  });

  it("usa name como alt da imagem quando imageAlt não é fornecido", () => {
    render(<ProductCard {...baseProps} imageAlt={undefined} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Tinta Acrílica Premium");
  });

  it("renderiza placeholder quando imageUrl é null", () => {
    render(<ProductCard {...baseProps} imageUrl={null} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renderiza placeholder quando imageUrl é undefined", () => {
    render(<ProductCard {...baseProps} imageUrl={undefined} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("link do WhatsApp tem número formatado corretamente", () => {
    render(<ProductCard {...baseProps} whatsapp="(11) 99999-9999" />);
    const waLink = screen.getByRole("link", { name: /falar pelo whatsapp/i });
    expect(waLink).toHaveAttribute("href", expect.stringContaining("wa.me/11999999999"));
  });

  it("mensagem do WhatsApp contém o nome do produto codificado", () => {
    render(<ProductCard {...baseProps} />);
    const waLink = screen.getByRole("link", { name: /falar pelo whatsapp/i });
    const href = waLink.getAttribute("href") ?? "";
    expect(decodeURIComponent(href)).toContain("Tinta Acrílica Premium");
  });

  it("link do WhatsApp abre em nova aba", () => {
    render(<ProductCard {...baseProps} />);
    const waLink = screen.getByRole("link", { name: /falar pelo whatsapp/i });
    expect(waLink).toHaveAttribute("target", "_blank");
    expect(waLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renderiza ícone do WhatsApp", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByTestId("icon-whatsapp")).toBeInTheDocument();
  });

  it("renderiza como elemento article", () => {
    const { container } = render(<ProductCard {...baseProps} />);
    expect(container.querySelector("article")).toBeInTheDocument();
  });
});
