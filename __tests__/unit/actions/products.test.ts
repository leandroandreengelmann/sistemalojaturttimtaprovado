import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockSingle = vi.fn();
const mockSelect = vi.fn(() => ({ single: mockSingle }));
const mockInsert = vi.fn(() => ({ select: mockSelect }));
const mockUpdate = vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: null }) }));
const mockDelete = vi.fn(() => ({ eq: mockDeleteEq, in: mockDeleteIn }));
const mockDeleteEq = vi.fn().mockResolvedValue({ error: null });
const mockDeleteIn = vi.fn().mockResolvedValue({ error: null });
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    from: mockFrom,
  })),
}));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

// Import after mocks
import {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  deleteProducts,
} from "@/lib/actions/products";
import { revalidatePath } from "next/cache";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeFormData(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("products actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
    });
  });

  // ── createProduct ──────────────────────────────────────────────────────────

  describe("createProduct()", () => {
    it("gera slug a partir do nome quando slug não é informado", async () => {
      mockSingle.mockResolvedValue({ data: { id: "abc-123" }, error: null });
      const fd = makeFormData({ name: "Tinta Branca Premium" });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ slug: "tinta-branca-premium" })
      );
    });

    it("normaliza slug com acentos e caracteres especiais", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const fd = makeFormData({ name: "Verniz Açaí & Óleos" });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ slug: "verniz-acai-oleos" })
      );
    });

    it("usa slug customizado quando informado", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const fd = makeFormData({ name: "Qualquer Nome", slug: "meu-slug-custom" });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ slug: "meu-slug-custom" })
      );
    });

    it("parseia price e price_promo como float", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const fd = makeFormData({ name: "Produto", price: "99.90", price_promo: "79.50" });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ price: 99.9, price_promo: 79.5 })
      );
    });

    it("retorna id do produto criado com sucesso", async () => {
      mockSingle.mockResolvedValue({ data: { id: "novo-id" }, error: null });
      const fd = makeFormData({ name: "Produto" });

      const result = await createProduct(fd);

      expect(result).toEqual({ id: "novo-id" });
    });

    it("retorna error quando Supabase falha", async () => {
      mockSingle.mockResolvedValue({ data: null, error: { message: "DB error" } });
      const fd = makeFormData({ name: "Produto" });

      const result = await createProduct(fd);

      expect(result).toEqual({ error: "DB error" });
    });

    it("revalida /admin/produtos, / e /loja após criar", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const fd = makeFormData({ name: "Produto" });

      await createProduct(fd);

      expect(revalidatePath).toHaveBeenCalledWith("/admin/produtos");
      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(revalidatePath).toHaveBeenCalledWith("/loja");
    });
  });

  // ── updateProduct ──────────────────────────────────────────────────────────

  describe("updateProduct()", () => {
    it("revalida /produto/[slug] após atualizar", async () => {
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: null }) })),
      });
      const fd = makeFormData({ name: "Produto", slug: "produto-test" });

      await updateProduct("id-123", fd);

      expect(revalidatePath).toHaveBeenCalledWith("/produto/produto-test");
    });

    it("retorna objeto vazio em caso de sucesso", async () => {
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: null }) })),
      });
      const fd = makeFormData({ name: "Produto" });

      const result = await updateProduct("id-123", fd);

      expect(result).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: { message: "Update failed" } }),
        })),
      });
      const fd = makeFormData({ name: "Produto" });

      const result = await updateProduct("id-123", fd);

      expect(result).toEqual({ error: "Update failed" });
    });
  });

  // ── deleteProduct ──────────────────────────────────────────────────────────

  describe("deleteProduct()", () => {
    it("deleta produto pelo id", async () => {
      mockFrom.mockReturnValue({ delete: () => ({ eq: mockDeleteEq }) });

      await deleteProduct("id-del");

      expect(mockDeleteEq).toHaveBeenCalledWith("id", "id-del");
    });

    it("revalida paths após deletar", async () => {
      mockFrom.mockReturnValue({ delete: () => ({ eq: mockDeleteEq }) });

      await deleteProduct("id-del");

      expect(revalidatePath).toHaveBeenCalledWith("/admin/produtos");
      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(revalidatePath).toHaveBeenCalledWith("/loja");
    });

    it("retorna error quando Supabase falha", async () => {
      const failEq = vi.fn().mockResolvedValue({ error: { message: "Delete failed" } });
      mockFrom.mockReturnValue({ delete: () => ({ eq: failEq }) });

      const result = await deleteProduct("id-del");

      expect(result).toEqual({ error: "Delete failed" });
    });
  });

  // ── toggleProductActive ────────────────────────────────────────────────────

  describe("toggleProductActive()", () => {
    it("atualiza campo active para true", async () => {
      const eqMock = vi.fn().mockResolvedValue({});
      const updateMock = vi.fn(() => ({ eq: eqMock }));
      mockFrom.mockReturnValue({ update: updateMock });

      await toggleProductActive("id-1", true);

      expect(updateMock).toHaveBeenCalledWith({ active: true });
      expect(eqMock).toHaveBeenCalledWith("id", "id-1");
    });

    it("atualiza campo active para false", async () => {
      const eqMock = vi.fn().mockResolvedValue({});
      const updateMock = vi.fn(() => ({ eq: eqMock }));
      mockFrom.mockReturnValue({ update: updateMock });

      await toggleProductActive("id-1", false);

      expect(updateMock).toHaveBeenCalledWith({ active: false });
    });
  });

  // ── deleteProducts (batch) ─────────────────────────────────────────────────

  describe("deleteProducts()", () => {
    it("não faz nenhuma chamada ao DB se array vazio", async () => {
      await deleteProducts([]);

      expect(mockFrom).not.toHaveBeenCalled();
    });

    it("deleta múltiplos produtos por ids", async () => {
      const inMock = vi.fn().mockResolvedValue({});
      mockFrom.mockReturnValue({ delete: () => ({ in: inMock }) });

      await deleteProducts(["id-1", "id-2", "id-3"]);

      expect(inMock).toHaveBeenCalledWith("id", ["id-1", "id-2", "id-3"]);
    });
  });

  // ── parseProductFields helpers ─────────────────────────────────────────────

  describe("parseProductFields internals via createProduct", () => {
    it("active = true quando 'active' não é 'off'", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const fd = makeFormData({ name: "P", active: "on" });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ active: true })
      );
    });

    it("active = false quando 'active' é 'off'", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const fd = makeFormData({ name: "P", active: "off" });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ active: false })
      );
    });

    it("specs é array vazio quando não informado", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const fd = makeFormData({ name: "P" });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ specs: [] })
      );
    });

    it("specs é parseado do JSON", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const specs = [{ label: "Cor", value: "Branco" }];
      const fd = makeFormData({ name: "P", specs: JSON.stringify(specs) });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ specs })
      );
    });

    it("price é null quando não informado", async () => {
      mockSingle.mockResolvedValue({ data: { id: "x" }, error: null });
      const fd = makeFormData({ name: "P" });

      await createProduct(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ price: null, price_promo: null })
      );
    });
  });
});
