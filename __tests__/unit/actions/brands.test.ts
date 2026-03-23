import { describe, it, expect, vi, beforeEach } from "vitest";

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

import { createBrand, updateBrand, deleteBrand } from "@/lib/actions/brands";
import { revalidatePath } from "next/cache";

function fd(fields: Record<string, string>) {
  const f = new FormData();
  Object.entries(fields).forEach(([k, v]) => f.append(k, v));
  return f;
}

describe("brands actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({ insert: mockInsert, update: mockUpdate, delete: mockDelete });
  });

  describe("createBrand()", () => {
    it("insere marca com name obrigatório", async () => {
      await createBrand(fd({ name: "Suvinil" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ name: "Suvinil" }));
    });

    it("logo_url e website_url são null quando ausentes", async () => {
      await createBrand(fd({ name: "Suvinil" }));
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ logo_url: null, website_url: null })
      );
    });

    it("sort_order padrão é 0", async () => {
      await createBrand(fd({ name: "Suvinil" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ sort_order: 0 }));
    });

    it("sort_order é parseado como inteiro", async () => {
      await createBrand(fd({ name: "Suvinil", sort_order: "5" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ sort_order: 5 }));
    });

    it("active = true por padrão", async () => {
      await createBrand(fd({ name: "Suvinil" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ active: true }));
    });

    it("active = false quando 'active' é 'off'", async () => {
      await createBrand(fd({ name: "Suvinil", active: "off" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ active: false }));
    });

    it("revalida /admin/marcas e /", async () => {
      await createBrand(fd({ name: "Suvinil" }));
      expect(revalidatePath).toHaveBeenCalledWith("/admin/marcas");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("retorna {} em sucesso", async () => {
      expect(await createBrand(fd({ name: "Suvinil" }))).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({ insert: vi.fn().mockResolvedValue({ error: { message: "Err" } }) });
      expect(await createBrand(fd({ name: "Suvinil" }))).toEqual({ error: "Err" });
    });
  });

  describe("updateBrand()", () => {
    it("atualiza marca pelo id", async () => {
      await updateBrand("brand-id", fd({ name: "Coral" }));
      expect(mockUpdateEq).toHaveBeenCalledWith("id", "brand-id");
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: { message: "Fail" } }) })),
      });
      expect(await updateBrand("id", fd({ name: "X" }))).toEqual({ error: "Fail" });
    });
  });

  describe("deleteBrand()", () => {
    it("deleta marca pelo id", async () => {
      await deleteBrand("brand-del");
      expect(mockDeleteEq).toHaveBeenCalledWith("id", "brand-del");
    });

    it("revalida /admin/marcas e /", async () => {
      await deleteBrand("id");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/marcas");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        delete: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: { message: "Fail" } }) })),
      });
      expect(await deleteBrand("id")).toEqual({ error: "Fail" });
    });
  });
});
