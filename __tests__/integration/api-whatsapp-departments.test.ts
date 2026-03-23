import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockOrder = vi.fn();
const mockEq = vi.fn();
const mockSelect = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: mockFrom })),
}));

// NextResponse real necessário para o handler
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return actual;
});

import { GET } from "@/app/api/whatsapp-departments/route";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const dbDepartments = [
  {
    id: "d1",
    name: "Vendas",
    description: "Equipe comercial",
    sort_order: 1,
    whatsapp_contacts: [
      { id: "c1", name: "João", role: "Vendedor", phone: "11999990001", sort_order: 1, active: true },
      { id: "c2", name: "Ana", role: null, phone: "11999990002", sort_order: 2, active: false }, // inativo
    ],
  },
  {
    id: "d2",
    name: "Suporte",
    description: null,
    sort_order: 2,
    whatsapp_contacts: [
      { id: "c3", name: "Carlos", role: "Suporte", phone: "11999990003", sort_order: 1, active: true },
    ],
  },
];

function setupMockChain(data: typeof dbDepartments | null, error: { message: string } | null = null) {
  const chain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    then: undefined as unknown,
  };

  // Último .order() resolve a Promise
  let callCount = 0;
  chain.order = vi.fn().mockImplementation(() => {
    callCount++;
    if (callCount >= 2) {
      return Promise.resolve({ data, error });
    }
    return chain;
  });

  mockFrom.mockReturnValue(chain);
  return chain;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("GET /api/whatsapp-departments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna status 200 com lista de departamentos ativos", async () => {
    setupMockChain(dbDepartments);
    const req = new NextRequest("http://localhost/api/whatsapp-departments");

    const res = await GET();

    expect(res.status).toBe(200);
  });

  it("filtra contatos inativos (active=false)", async () => {
    setupMockChain(dbDepartments);

    const res = await GET();
    const body = await res.json();

    // Departamento Vendas tem 2 contatos, 1 inativo (Ana) → deve retornar só 1
    const vendas = body.find((d: { name: string }) => d.name === "Vendas");
    expect(vendas.whatsapp_contacts).toHaveLength(1);
    expect(vendas.whatsapp_contacts[0].name).toBe("João");
  });

  it("mantém contatos ativos", async () => {
    setupMockChain(dbDepartments);

    const res = await GET();
    const body = await res.json();

    const suporte = body.find((d: { name: string }) => d.name === "Suporte");
    expect(suporte.whatsapp_contacts).toHaveLength(1);
    expect(suporte.whatsapp_contacts[0].name).toBe("Carlos");
  });

  it("retorna array vazio quando não há departamentos", async () => {
    setupMockChain([]);

    const res = await GET();
    const body = await res.json();

    expect(body).toEqual([]);
  });

  it("retorna status 500 quando Supabase retorna erro", async () => {
    setupMockChain(null, { message: "DB connection failed" });

    const res = await GET();

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({ error: "DB connection failed" });
  });

  it("estrutura dos departamentos retornados está correta", async () => {
    setupMockChain(dbDepartments);

    const res = await GET();
    const body = await res.json();

    expect(body[0]).toMatchObject({
      id: "d1",
      name: "Vendas",
      description: "Equipe comercial",
      sort_order: 1,
      whatsapp_contacts: expect.any(Array),
    });
  });

  it("busca apenas departamentos com active=true", async () => {
    const chain = setupMockChain(dbDepartments);

    await GET();

    expect(chain.eq).toHaveBeenCalledWith("active", true);
  });
});
