import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockInsert = vi.fn().mockResolvedValue({ error: null });
const mockUpdateEq = vi.fn().mockResolvedValue({ error: null });
const mockUpdate = vi.fn(() => ({ eq: mockUpdateEq }));
const mockDeleteEq = vi.fn().mockResolvedValue({ error: null });
const mockDelete = vi.fn(() => ({ eq: mockDeleteEq }));
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: mockFrom })),
}));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { createCategory, updateCategory, deleteCategory } from "@/lib/actions/categories";
import { revalidatePath } from "next/cache";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeFormData(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("categories actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
    });
  });

  // ── createCategory ─────────────────────────────────────────────────────────

  describe("createCategory()", () => {
    it("gera slug a partir do nome", async () => {
      const fd = makeFormData({ name: "Tintas e Vernizes" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ slug: "tintas-e-vernizes" })
      );
    });

    it("normaliza slug com acentos", async () => {
      const fd = makeFormData({ name: "Açaí & Óleos Especiais" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ slug: "acai-oleos-especiais" })
      );
    });

    it("usa slug customizado quando informado", async () => {
      const fd = makeFormData({ name: "Tintas", slug: "tintas-especiais" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ slug: "tintas-especiais" })
      );
    });

    it("parent_id é null quando não informado (categoria raiz)", async () => {
      const fd = makeFormData({ name: "Tintas" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ parent_id: null })
      );
    });

    it("parent_id é preenchido quando informado (subcategoria)", async () => {
      const fd = makeFormData({ name: "Látex", parent_id: "parent-uuid" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ parent_id: "parent-uuid" })
      );
    });

    it("sort_order é 0 por padrão", async () => {
      const fd = makeFormData({ name: "Tintas" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ sort_order: 0 })
      );
    });

    it("sort_order é o valor informado", async () => {
      const fd = makeFormData({ name: "Tintas", sort_order: "3" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ sort_order: 3 })
      );
    });

    it("active = true por padrão", async () => {
      const fd = makeFormData({ name: "Tintas" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ active: true })
      );
    });

    it("active = false quando 'active' é 'off'", async () => {
      const fd = makeFormData({ name: "Tintas", active: "off" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ active: false })
      );
    });

    it("description é null quando não fornecida", async () => {
      const fd = makeFormData({ name: "Tintas" });

      await createCategory(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ description: null })
      );
    });

    it("retorna objeto vazio em sucesso", async () => {
      const fd = makeFormData({ name: "Tintas" });

      const result = await createCategory(fd);

      expect(result).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: { message: "Unique violation" } }),
      });
      const fd = makeFormData({ name: "Tintas" });

      const result = await createCategory(fd);

      expect(result).toEqual({ error: "Unique violation" });
    });

    it("revalida /admin/categorias e / após criar", async () => {
      const fd = makeFormData({ name: "Tintas" });

      await createCategory(fd);

      expect(revalidatePath).toHaveBeenCalledWith("/admin/categorias");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });

  // ── updateCategory ─────────────────────────────────────────────────────────

  describe("updateCategory()", () => {
    it("atualiza categoria pelo id", async () => {
      const fd = makeFormData({ name: "Tintas Atualizada" });

      await updateCategory("cat-id", fd);

      expect(mockUpdateEq).toHaveBeenCalledWith("id", "cat-id");
    });

    it("retorna objeto vazio em sucesso", async () => {
      const fd = makeFormData({ name: "Tintas" });

      const result = await updateCategory("cat-id", fd);

      expect(result).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: { message: "Update error" } }),
        })),
      });
      const fd = makeFormData({ name: "Tintas" });

      const result = await updateCategory("cat-id", fd);

      expect(result).toEqual({ error: "Update error" });
    });

    it("revalida /admin/categorias e / após atualizar", async () => {
      const fd = makeFormData({ name: "Tintas" });

      await updateCategory("cat-id", fd);

      expect(revalidatePath).toHaveBeenCalledWith("/admin/categorias");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });

  // ── deleteCategory ─────────────────────────────────────────────────────────

  describe("deleteCategory()", () => {
    it("deleta categoria pelo id", async () => {
      await deleteCategory("cat-del");

      expect(mockDeleteEq).toHaveBeenCalledWith("id", "cat-del");
    });

    it("retorna objeto vazio em sucesso", async () => {
      const result = await deleteCategory("cat-del");

      expect(result).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        delete: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: { message: "FK constraint" } }),
        })),
      });

      const result = await deleteCategory("cat-del");

      expect(result).toEqual({ error: "FK constraint" });
    });

    it("revalida /admin/categorias e / após deletar", async () => {
      await deleteCategory("cat-del");

      expect(revalidatePath).toHaveBeenCalledWith("/admin/categorias");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });
});
