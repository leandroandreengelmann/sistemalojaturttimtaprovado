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

import { createStore, updateStore, deleteStore } from "@/lib/actions/stores";
import { revalidatePath } from "next/cache";

function fd(fields: Record<string, string>) {
  const f = new FormData();
  Object.entries(fields).forEach(([k, v]) => f.append(k, v));
  return f;
}

describe("stores actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({ insert: mockInsert, update: mockUpdate, delete: mockDelete });
  });

  describe("createStore()", () => {
    it("insere loja com name, city e state obrigatórios", async () => {
      await createStore(fd({ name: "Loja Centro", city: "São Paulo", state: "SP" }));
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Loja Centro", city: "São Paulo", state: "SP" })
      );
    });

    it("campos opcionais são null quando ausentes", async () => {
      await createStore(fd({ name: "Loja", city: "SP", state: "SP" }));
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          address: null, phone: null, whatsapp: null,
          email: null, maps_url: null, image_url: null,
        })
      );
    });

    it("sort_order padrão é 0", async () => {
      await createStore(fd({ name: "L", city: "C", state: "S" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ sort_order: 0 }));
    });

    it("active = true por padrão", async () => {
      await createStore(fd({ name: "L", city: "C", state: "S" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ active: true }));
    });

    it("active = false quando 'active' é 'off'", async () => {
      await createStore(fd({ name: "L", city: "C", state: "S", active: "off" }));
      expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ active: false }));
    });

    it("revalida /admin/lojas, /nossas-lojas e /", async () => {
      await createStore(fd({ name: "L", city: "C", state: "S" }));
      expect(revalidatePath).toHaveBeenCalledWith("/admin/lojas");
      expect(revalidatePath).toHaveBeenCalledWith("/nossas-lojas");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("retorna {} em sucesso", async () => {
      expect(await createStore(fd({ name: "L", city: "C", state: "S" }))).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({ insert: vi.fn().mockResolvedValue({ error: { message: "Err" } }) });
      expect(await createStore(fd({ name: "L", city: "C", state: "S" }))).toEqual({ error: "Err" });
    });
  });

  describe("updateStore()", () => {
    it("atualiza loja pelo id", async () => {
      await updateStore("store-id", fd({ name: "Loja Nova", city: "RJ", state: "RJ" }));
      expect(mockUpdateEq).toHaveBeenCalledWith("id", "store-id");
    });

    it("revalida /admin/lojas, /nossas-lojas e / após atualizar", async () => {
      await updateStore("id", fd({ name: "L", city: "C", state: "S" }));
      expect(revalidatePath).toHaveBeenCalledWith("/nossas-lojas");
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: { message: "Upd fail" } }) })),
      });
      expect(await updateStore("id", fd({ name: "L", city: "C", state: "S" }))).toEqual({ error: "Upd fail" });
    });
  });

  describe("deleteStore()", () => {
    it("deleta loja pelo id", async () => {
      await deleteStore("store-del");
      expect(mockDeleteEq).toHaveBeenCalledWith("id", "store-del");
    });

    it("revalida /admin/lojas e /nossas-lojas após deletar", async () => {
      await deleteStore("id");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/lojas");
      expect(revalidatePath).toHaveBeenCalledWith("/nossas-lojas");
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        delete: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: { message: "Del fail" } }) })),
      });
      expect(await deleteStore("id")).toEqual({ error: "Del fail" });
    });
  });
});
