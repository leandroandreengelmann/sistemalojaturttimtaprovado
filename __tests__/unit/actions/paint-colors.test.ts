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

import { createPaintColor, updatePaintColor, deletePaintColor } from "@/lib/actions/paint-colors";
import { revalidatePath } from "next/cache";

function fd(fields: Record<string, string>) {
  const f = new FormData();
  Object.entries(fields).forEach(([k, v]) => f.append(k, v));
  return f;
}

describe("paint-colors actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({ insert: mockInsert, update: mockUpdate, delete: mockDelete });
  });

  describe("createPaintColor()", () => {
    it("insere cor com name obrigatório", async () => {
      await createPaintColor(fd({ name: "Branco Neve" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ name: "Branco Neve" }));
    });

    it("code padrão é string vazia quando ausente", async () => {
      await createPaintColor(fd({ name: "Cor" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ code: "" }));
    });

    it("hex padrão é '#000000' quando ausente", async () => {
      await createPaintColor(fd({ name: "Cor" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ hex: "#000000" }));
    });

    it("usa hex informado", async () => {
      await createPaintColor(fd({ name: "Cor", hex: "#FFFFFF" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ hex: "#FFFFFF" }));
    });

    it("family, collection, brand e description são null quando ausentes", async () => {
      await createPaintColor(fd({ name: "Cor" }));
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ family: null, collection: null, brand: null, description: null })
      );
    });

    it("sort_order padrão é 0", async () => {
      await createPaintColor(fd({ name: "Cor" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ sort_order: 0 }));
    });

    it("active = true por padrão", async () => {
      await createPaintColor(fd({ name: "Cor" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ active: true }));
    });

    it("active = false quando 'active' é 'off'", async () => {
      await createPaintColor(fd({ name: "Cor", active: "off" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ active: false }));
    });

    it("revalida /admin/cores, /cores e /", async () => {
      await createPaintColor(fd({ name: "Cor" }));
      expect(revalidatePath).toHaveBeenCalledWith("/admin/cores");
      expect(revalidatePath).toHaveBeenCalledWith("/cores");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("retorna {} em sucesso", async () => {
      expect(await createPaintColor(fd({ name: "Cor" }))).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({ insert: vi.fn().mockResolvedValue({ error: { message: "Fail" } }) });
      expect(await createPaintColor(fd({ name: "Cor" }))).toEqual({ error: "Fail" });
    });
  });

  describe("updatePaintColor()", () => {
    it("atualiza cor pelo id", async () => {
      await updatePaintColor("color-id", fd({ name: "Preto" }));
      expect(mockUpdateEq).toHaveBeenCalledWith("id", "color-id");
    });

    it("revalida /cores após atualizar", async () => {
      await updatePaintColor("id", fd({ name: "X" }));
      expect(revalidatePath).toHaveBeenCalledWith("/cores");
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: { message: "Fail" } }) })),
      });
      expect(await updatePaintColor("id", fd({ name: "X" }))).toEqual({ error: "Fail" });
    });
  });

  describe("deletePaintColor()", () => {
    it("deleta cor pelo id", async () => {
      await deletePaintColor("color-del");
      expect(mockDeleteEq).toHaveBeenCalledWith("id", "color-del");
    });

    it("revalida /admin/cores, /cores e / após deletar", async () => {
      await deletePaintColor("id");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/cores");
      expect(revalidatePath).toHaveBeenCalledWith("/cores");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        delete: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: { message: "Fail" } }) })),
      });
      expect(await deletePaintColor("id")).toEqual({ error: "Fail" });
    });
  });
});
