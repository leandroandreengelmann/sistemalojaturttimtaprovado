import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockUpsert = vi.fn().mockResolvedValue({ error: null });
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: mockFrom })),
}));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { updateSettings } from "@/lib/actions/contacts";
import { revalidatePath } from "next/cache";

// ── Tests ────────────────────────────────────────────────────────────────────

describe("updateSettings()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({
      upsert: mockUpsert,
    });
  });

  it("faz upsert de cada par chave/valor do FormData", async () => {
    const fd = new FormData();
    fd.append("site_name", "Turatti");
    fd.append("site_description", "Catálogo de produtos");

    await updateSettings(fd);

    expect(mockUpsert).toHaveBeenCalledWith(
      { key: "site_name", value: JSON.stringify("Turatti") },
      { onConflict: "key" }
    );
    expect(mockUpsert).toHaveBeenCalledWith(
      { key: "site_description", value: JSON.stringify("Catálogo de produtos") },
      { onConflict: "key" }
    );
  });

  it("armazena valor serializado como JSON", async () => {
    const fd = new FormData();
    fd.append("max_items", "10");

    await updateSettings(fd);

    expect(mockUpsert).toHaveBeenCalledWith(
      { key: "max_items", value: '"10"' },
      { onConflict: "key" }
    );
  });

  it("não faz nenhuma chamada para FormData vazio", async () => {
    const fd = new FormData();

    await updateSettings(fd);

    expect(mockUpsert).not.toHaveBeenCalled();
  });

  it("revalida /admin/identidade após salvar", async () => {
    const fd = new FormData();
    fd.append("site_name", "Turatti");

    await updateSettings(fd);

    expect(revalidatePath).toHaveBeenCalledWith("/admin/identidade");
  });

  it("revalida / após salvar", async () => {
    const fd = new FormData();
    fd.append("site_name", "Turatti");

    await updateSettings(fd);

    expect(revalidatePath).toHaveBeenCalledWith("/");
  });
});
