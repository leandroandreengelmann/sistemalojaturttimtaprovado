import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockInsert = vi.fn().mockResolvedValue({ error: null });
const mockUpdateAllEq = vi.fn().mockResolvedValue({ error: null });
const mockUpdateAll = vi.fn(() => ({ eq: mockUpdateAllEq }));
const mockUpdateSingleEq = vi.fn().mockResolvedValue({ error: null });
const mockUpdateSingle = vi.fn(() => ({ eq: mockUpdateSingleEq }));
const mockDeleteEq = vi.fn().mockResolvedValue({ error: null });
const mockDelete = vi.fn(() => ({ eq: mockDeleteEq }));
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: mockFrom })),
}));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import {
  addProductImage,
  deleteProductImage,
  setProductImagePrimary,
  createProductReturnId,
} from "@/lib/actions/products";
import { revalidatePath } from "next/cache";

function makeFormData(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("products image actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── addProductImage ────────────────────────────────────────────────────────

  describe("addProductImage()", () => {
    it("desmarca imagens primárias existentes quando isPrimary=true", async () => {
      const updateEq = vi.fn().mockResolvedValue({});
      const update = vi.fn(() => ({ eq: updateEq }));
      mockFrom.mockReturnValue({ update, insert: mockInsert });

      await addProductImage("prod-1", "https://img.com/foto.jpg", true);

      expect(update).toHaveBeenCalledWith({ is_primary: false });
      expect(updateEq).toHaveBeenCalledWith("product_id", "prod-1");
    });

    it("não desmarca imagens primárias quando isPrimary=false", async () => {
      const update = vi.fn(() => ({ eq: vi.fn().mockResolvedValue({}) }));
      mockFrom.mockReturnValue({ update, insert: mockInsert });

      await addProductImage("prod-1", "https://img.com/foto.jpg", false);

      expect(update).not.toHaveBeenCalled();
    });

    it("insere imagem com url e is_primary corretos", async () => {
      const update = vi.fn(() => ({ eq: vi.fn().mockResolvedValue({}) }));
      mockFrom.mockReturnValue({ update, insert: mockInsert });

      await addProductImage("prod-1", "https://img.com/foto.jpg", true);

      expect(mockInsert).toHaveBeenCalledWith({
        product_id: "prod-1",
        url: "https://img.com/foto.jpg",
        is_primary: true,
      });
    });

    it("revalida paths após inserir imagem", async () => {
      const update = vi.fn(() => ({ eq: vi.fn().mockResolvedValue({}) }));
      mockFrom.mockReturnValue({ update, insert: mockInsert });

      await addProductImage("prod-1", "https://img.com/foto.jpg", false);

      expect(revalidatePath).toHaveBeenCalledWith("/admin/produtos/prod-1");
      expect(revalidatePath).toHaveBeenCalledWith("/loja");
    });
  });

  // ── deleteProductImage ─────────────────────────────────────────────────────

  describe("deleteProductImage()", () => {
    it("deleta imagem pelo imageId", async () => {
      mockFrom.mockReturnValue({ delete: mockDelete });

      await deleteProductImage("img-1", "prod-1");

      expect(mockDeleteEq).toHaveBeenCalledWith("id", "img-1");
    });

    it("revalida paths após deletar imagem", async () => {
      mockFrom.mockReturnValue({ delete: mockDelete });

      await deleteProductImage("img-1", "prod-1");

      expect(revalidatePath).toHaveBeenCalledWith("/admin/produtos/prod-1");
      expect(revalidatePath).toHaveBeenCalledWith("/loja");
    });
  });

  // ── setProductImagePrimary ─────────────────────────────────────────────────

  describe("setProductImagePrimary()", () => {
    it("desmarca todas as imagens do produto antes de marcar a nova", async () => {
      let callCount = 0;
      const updateEq = vi.fn().mockResolvedValue({});
      const update = vi.fn(() => {
        callCount++;
        return { eq: updateEq };
      });
      mockFrom.mockReturnValue({ update });

      await setProductImagePrimary("img-new", "prod-1");

      // 1ª chamada: desmarca todas → is_primary: false
      expect(update).toHaveBeenNthCalledWith(1, { is_primary: false });
      expect(updateEq).toHaveBeenNthCalledWith(1, "product_id", "prod-1");

      // 2ª chamada: marca a nova → is_primary: true
      expect(update).toHaveBeenNthCalledWith(2, { is_primary: true });
      expect(updateEq).toHaveBeenNthCalledWith(2, "id", "img-new");
    });

    it("revalida paths após definir imagem primária", async () => {
      const update = vi.fn(() => ({ eq: vi.fn().mockResolvedValue({}) }));
      mockFrom.mockReturnValue({ update });

      await setProductImagePrimary("img-new", "prod-1");

      expect(revalidatePath).toHaveBeenCalledWith("/admin/produtos/prod-1");
      expect(revalidatePath).toHaveBeenCalledWith("/loja");
    });
  });

  // ── createProductReturnId ─────────────────────────────────────────────────

  describe("createProductReturnId()", () => {
    it("retorna id do produto criado", async () => {
      const mockSingle = vi.fn().mockResolvedValue({ data: { id: "novo-id" }, error: null });
      const mockSelect = vi.fn(() => ({ single: mockSingle }));
      const mockInsertProd = vi.fn(() => ({ select: mockSelect }));
      mockFrom.mockReturnValue({ insert: mockInsertProd });

      const fd = makeFormData({ name: "Produto" });
      const result = await createProductReturnId(fd);

      expect(result).toEqual({ id: "novo-id" });
    });

    it("retorna error quando DB falha", async () => {
      const mockSingle = vi.fn().mockResolvedValue({ data: null, error: { message: "Error" } });
      const mockSelect = vi.fn(() => ({ single: mockSingle }));
      const mockInsertProd = vi.fn(() => ({ select: mockSelect }));
      mockFrom.mockReturnValue({ insert: mockInsertProd });

      const fd = makeFormData({ name: "Produto" });
      const result = await createProductReturnId(fd);

      expect(result).toEqual({ error: "Error" });
    });
  });
});
