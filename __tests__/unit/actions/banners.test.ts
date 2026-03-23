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

import { createBanner, updateBanner, deleteBanner } from "@/lib/actions/banners";
import { revalidatePath } from "next/cache";

function makeFormData(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("banners actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({ insert: mockInsert, update: mockUpdate, delete: mockDelete });
  });

  // ── createBanner ──────────────────────────────────────────────────────────

  describe("createBanner()", () => {
    it("insere banner com image_url obrigatório", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });

      await createBanner(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ image_url: "https://img.com/banner.jpg" })
      );
    });

    it("position padrão é 'hero' quando não informado", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });

      await createBanner(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ position: "hero" })
      );
    });

    it("sort_order padrão é 0", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });

      await createBanner(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ sort_order: 0 })
      );
    });

    it("active = true por padrão", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });

      await createBanner(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ active: true })
      );
    });

    it("active = false quando 'active' é 'off'", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg", active: "off" });

      await createBanner(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ active: false })
      );
    });

    it("cta_text e cta_url são null quando não informados", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });

      await createBanner(fd);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ cta_text: null, cta_url: null })
      );
    });

    it("retorna objeto vazio em sucesso", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });
      const result = await createBanner(fd);
      expect(result).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: { message: "Insert failed" } }),
      });
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });
      const result = await createBanner(fd);
      expect(result).toEqual({ error: "Insert failed" });
    });

    it("revalida /admin/banners e / após criar", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });
      await createBanner(fd);
      expect(revalidatePath).toHaveBeenCalledWith("/admin/banners");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });

  // ── updateBanner ──────────────────────────────────────────────────────────

  describe("updateBanner()", () => {
    it("atualiza banner pelo id", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner2.jpg" });

      await updateBanner("banner-id", fd);

      expect(mockUpdateEq).toHaveBeenCalledWith("id", "banner-id");
    });

    it("retorna objeto vazio em sucesso", async () => {
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });
      const result = await updateBanner("banner-id", fd);
      expect(result).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: { message: "Update failed" } }),
        })),
      });
      const fd = makeFormData({ image_url: "https://img.com/banner.jpg" });
      const result = await updateBanner("banner-id", fd);
      expect(result).toEqual({ error: "Update failed" });
    });
  });

  // ── deleteBanner ─────────────────────────────────────────────────────────

  describe("deleteBanner()", () => {
    it("deleta banner pelo id", async () => {
      await deleteBanner("banner-del");
      expect(mockDeleteEq).toHaveBeenCalledWith("id", "banner-del");
    });

    it("retorna objeto vazio em sucesso", async () => {
      const result = await deleteBanner("banner-del");
      expect(result).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockFrom.mockReturnValue({
        delete: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: { message: "Delete failed" } }),
        })),
      });
      const result = await deleteBanner("banner-del");
      expect(result).toEqual({ error: "Delete failed" });
    });

    it("revalida /admin/banners e / após deletar", async () => {
      await deleteBanner("banner-del");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/banners");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });
});
