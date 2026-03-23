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

import {
  submitContactForm,
  updateContactStatus,
  deleteContact,
} from "@/lib/actions/contacts";
import { revalidatePath } from "next/cache";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeFormData(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("contacts actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
    });
  });

  // ── submitContactForm ──────────────────────────────────────────────────────

  describe("submitContactForm()", () => {
    it("insere contato com nome obrigatório", async () => {
      const fd = makeFormData({ name: "João Silva", message: "Quero informações" });

      await submitContactForm(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ name: "João Silva" })
      );
    });

    it("insere email quando fornecido", async () => {
      const fd = makeFormData({ name: "João", email: "joao@email.com", message: "msg" });

      await submitContactForm(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ email: "joao@email.com" })
      );
    });

    it("email é null quando não fornecido", async () => {
      const fd = makeFormData({ name: "João", message: "msg" });

      await submitContactForm(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ email: null })
      );
    });

    it("phone é null quando não fornecido", async () => {
      const fd = makeFormData({ name: "João", message: "msg" });

      await submitContactForm(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ phone: null })
      );
    });

    it("product_id é null quando não fornecido", async () => {
      const fd = makeFormData({ name: "João", message: "msg" });

      await submitContactForm(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ product_id: null })
      );
    });

    it("insere product_id quando fornecido", async () => {
      const fd = makeFormData({
        name: "João",
        message: "msg",
        product_id: "prod-uuid-123",
      });

      await submitContactForm(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ product_id: "prod-uuid-123" })
      );
    });

    it("lança erro quando Supabase retorna error", async () => {
      mockFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: { message: "Insert failed" } }),
      });
      const fd = makeFormData({ name: "João", message: "msg" });

      await expect(submitContactForm(fd)).rejects.toThrow("Insert failed");
    });

    it("não lança erro quando insert bem-sucedido", async () => {
      const fd = makeFormData({ name: "João", message: "msg" });

      await expect(submitContactForm(fd)).resolves.toBeUndefined();
    });
  });

  // ── updateContactStatus ────────────────────────────────────────────────────

  describe("updateContactStatus()", () => {
    it("atualiza status pelo id", async () => {
      await updateContactStatus("contact-id", "respondido");

      expect(mockUpdate).toHaveBeenCalledWith({ status: "respondido" });
      expect(mockUpdateEq).toHaveBeenCalledWith("id", "contact-id");
    });

    it("revalida /admin/contatos após atualizar", async () => {
      await updateContactStatus("id", "novo");

      expect(revalidatePath).toHaveBeenCalledWith("/admin/contatos");
    });
  });

  // ── deleteContact ──────────────────────────────────────────────────────────

  describe("deleteContact()", () => {
    it("deleta contato pelo id", async () => {
      await deleteContact("contact-del");

      expect(mockDelete).toHaveBeenCalled();
      expect(mockDeleteEq).toHaveBeenCalledWith("id", "contact-del");
    });

    it("revalida /admin/contatos após deletar", async () => {
      await deleteContact("contact-del");

      expect(revalidatePath).toHaveBeenCalledWith("/admin/contatos");
    });
  });
});
