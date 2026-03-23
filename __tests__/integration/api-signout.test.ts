import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockSignOut = vi.fn().mockResolvedValue({});

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: { signOut: mockSignOut },
  })),
}));

vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return actual;
});

import { POST } from "@/app/api/auth/signout/route";

// ── Tests ────────────────────────────────────────────────────────────────────

describe("POST /api/auth/signout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignOut.mockResolvedValue({});
  });

  it("chama supabase.auth.signOut()", async () => {
    const req = new NextRequest("http://localhost/api/auth/signout", {
      method: "POST",
    });

    await POST(req);

    expect(mockSignOut).toHaveBeenCalledOnce();
  });

  it("redireciona para /admin/login após signout", async () => {
    const req = new NextRequest("http://localhost/api/auth/signout", {
      method: "POST",
    });

    const res = await POST(req);

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toContain("/admin/login");
  });

  it("redireciona mesmo se signOut retornar erro", async () => {
    mockSignOut.mockResolvedValue({ error: { message: "Session expired" } });
    const req = new NextRequest("http://localhost/api/auth/signout", {
      method: "POST",
    });

    const res = await POST(req);

    // Deve redirecionar de qualquer forma
    expect(res.status).toBe(302);
  });
});
