import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockMaybeSingle = vi.fn();
const mockLimit = vi.fn(() => ({ maybeSingle: mockMaybeSingle }));
const mockOrder = vi.fn(() => ({ limit: mockLimit }));
const mockSelectChain = vi.fn(() => ({ order: mockOrder }));

const mockInsert = vi.fn().mockResolvedValue({});
const mockDeleteEq = vi.fn().mockResolvedValue({});
const mockDelete = vi.fn(() => ({ eq: mockDeleteEq }));
const mockUpdateEq = vi.fn().mockResolvedValue({});
const mockUpdate = vi.fn(() => ({ eq: mockUpdateEq }));
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: mockFrom })),
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import {
  addHomeSection,
  removeHomeSection,
  toggleHomeSectionActive,
  reorderHomeSections,
} from "@/lib/actions/home-sections";
import { revalidatePath } from "next/cache";

// ── Tests ────────────────────────────────────────────────────────────────────

describe("home-sections actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({
      select: mockSelectChain,
      insert: mockInsert,
      delete: mockDelete,
      update: mockUpdate,
    });
  });

  describe("addHomeSection()", () => {
    it("busca o sort_order máximo antes de inserir", async () => {
      mockMaybeSingle.mockResolvedValue({ data: { sort_order: 4 } });
      await addHomeSection("produtos_destaque", "ref-id");
      expect(mockSelectChain).toHaveBeenCalledWith("sort_order");
    });

    it("insere seção com sort_order = max + 1", async () => {
      mockMaybeSingle.mockResolvedValue({ data: { sort_order: 4 } });
      await addHomeSection("banner", null);
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ sort_order: 5 })
      );
    });

    it("usa sort_order = 0 quando não há seções ainda", async () => {
      mockMaybeSingle.mockResolvedValue({ data: null });
      await addHomeSection("hero", null);
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ sort_order: 0 })
      );
    });

    it("insere com type e reference_id corretos", async () => {
      mockMaybeSingle.mockResolvedValue({ data: null });
      await addHomeSection("carrosel", "carousel-uuid");
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ type: "carrosel", reference_id: "carousel-uuid" })
      );
    });

    it("insere com reference_id = null quando não informado", async () => {
      mockMaybeSingle.mockResolvedValue({ data: null });
      await addHomeSection("quem_somos", null);
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ reference_id: null })
      );
    });

    it("insere com active = true por padrão", async () => {
      mockMaybeSingle.mockResolvedValue({ data: null });
      await addHomeSection("hero", null);
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ active: true })
      );
    });

    it("revalida /admin/home e /", async () => {
      mockMaybeSingle.mockResolvedValue({ data: null });
      await addHomeSection("hero", null);
      expect(revalidatePath).toHaveBeenCalledWith("/admin/home");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });

  describe("removeHomeSection()", () => {
    it("deleta seção pelo id", async () => {
      await removeHomeSection("section-id");
      expect(mockDeleteEq).toHaveBeenCalledWith("id", "section-id");
    });

    it("revalida /admin/home e /", async () => {
      await removeHomeSection("id");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/home");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });

  describe("toggleHomeSectionActive()", () => {
    it("atualiza active para true", async () => {
      await toggleHomeSectionActive("section-id", true);
      expect(mockUpdate).toHaveBeenCalledWith({ active: true });
      expect(mockUpdateEq).toHaveBeenCalledWith("id", "section-id");
    });

    it("atualiza active para false", async () => {
      await toggleHomeSectionActive("section-id", false);
      expect(mockUpdate).toHaveBeenCalledWith({ active: false });
    });

    it("revalida /admin/home e /", async () => {
      await toggleHomeSectionActive("id", true);
      expect(revalidatePath).toHaveBeenCalledWith("/admin/home");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });

  describe("reorderHomeSections()", () => {
    it("atualiza sort_order de cada id na posição correta", async () => {
      const ids = ["id-a", "id-b", "id-c"];
      await reorderHomeSections(ids);

      expect(mockUpdate).toHaveBeenCalledWith({ sort_order: 0 });
      expect(mockUpdate).toHaveBeenCalledWith({ sort_order: 1 });
      expect(mockUpdate).toHaveBeenCalledWith({ sort_order: 2 });
    });

    it("chama eq para cada id com o valor correto", async () => {
      const ids = ["id-a", "id-b"];
      await reorderHomeSections(ids);

      expect(mockUpdateEq).toHaveBeenCalledWith("id", "id-a");
      expect(mockUpdateEq).toHaveBeenCalledWith("id", "id-b");
    });

    it("revalida /admin/home e / uma vez", async () => {
      await reorderHomeSections(["a", "b", "c"]);
      expect(revalidatePath).toHaveBeenCalledWith("/admin/home");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("não faz nada com array vazio", async () => {
      await reorderHomeSections([]);
      // Promise.all([]) resolve imediatamente, sem chamadas ao DB
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });
});
