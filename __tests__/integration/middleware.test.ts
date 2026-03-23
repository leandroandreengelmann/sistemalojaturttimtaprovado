import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockGetUser = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}));

vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    NextResponse: {
      ...actual.NextResponse,
      next: vi.fn((opts?: { request?: NextRequest }) => ({
        cookies: { set: vi.fn(), getAll: vi.fn(() => []) },
        headers: new Headers(),
        status: 200,
        _isNext: true,
        request: opts?.request,
      })),
      redirect: vi.fn((url: URL) => ({
        cookies: { set: vi.fn() },
        headers: { get: () => url.toString() },
        status: 307,
        _redirectUrl: url.toString(),
      })),
    },
  };
});

import { middleware } from "@/middleware";
import { NextResponse } from "next/server";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeRequest(pathname: string) {
  return new NextRequest(`http://localhost:3000${pathname}`);
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  });

  // ── Rotas públicas ─────────────────────────────────────────────────────────

  describe("rotas públicas", () => {
    it("permite acesso a / sem autenticação", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/");

      const res = await middleware(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("permite acesso a /loja sem autenticação", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/loja");

      await middleware(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("permite acesso a /produto/slug sem autenticação", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/produto/tinta-branca");

      await middleware(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("permite acesso a /contato sem autenticação", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/contato");

      await middleware(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });
  });

  // ── Proteção de rotas admin ────────────────────────────────────────────────

  describe("proteção de rotas /admin/*", () => {
    it("redireciona para /admin/login quando não autenticado em /admin", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/admin");

      await middleware(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectArg = (NextResponse.redirect as ReturnType<typeof vi.fn>).mock.calls[0][0] as URL;
      expect(redirectArg.pathname).toBe("/admin/login");
    });

    it("redireciona para /admin/login quando não autenticado em /admin/produtos", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/admin/produtos");

      await middleware(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectArg = (NextResponse.redirect as ReturnType<typeof vi.fn>).mock.calls[0][0] as URL;
      expect(redirectArg.pathname).toBe("/admin/login");
    });

    it("inclui query param 'next' com a rota original no redirect", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/admin/produtos");

      await middleware(req);

      const redirectArg = (NextResponse.redirect as ReturnType<typeof vi.fn>).mock.calls[0][0] as URL;
      expect(redirectArg.searchParams.get("next")).toBe("/admin/produtos");
    });

    it("permite acesso a /admin quando autenticado", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
      const req = makeRequest("/admin");

      await middleware(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("permite acesso a /admin/produtos quando autenticado", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
      const req = makeRequest("/admin/produtos");

      await middleware(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("redireciona qualquer subrota /admin/* quando não autenticado", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const rotas = [
        "/admin/categorias",
        "/admin/banners",
        "/admin/lojas",
        "/admin/configuracoes",
        "/admin/usuarios",
      ];

      for (const rota of rotas) {
        vi.clearAllMocks();
        mockGetUser.mockResolvedValue({ data: { user: null } });
        const req = makeRequest(rota);

        await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalled();
      }
    });
  });

  // ── Rotas de autenticação ──────────────────────────────────────────────────

  describe("rotas de autenticação (/admin/login, /admin/recuperar-senha)", () => {
    it("permite acesso a /admin/login sem autenticação", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/admin/login");

      await middleware(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("redireciona para /admin quando autenticado tenta acessar /admin/login", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
      const req = makeRequest("/admin/login");

      await middleware(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectArg = (NextResponse.redirect as ReturnType<typeof vi.fn>).mock.calls[0][0] as URL;
      expect(redirectArg.pathname).toBe("/admin");
    });

    it("permite acesso a /admin/recuperar-senha sem autenticação", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const req = makeRequest("/admin/recuperar-senha");

      await middleware(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("redireciona para /admin quando autenticado tenta acessar /admin/recuperar-senha", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
      const req = makeRequest("/admin/recuperar-senha");

      await middleware(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectArg = (NextResponse.redirect as ReturnType<typeof vi.fn>).mock.calls[0][0] as URL;
      expect(redirectArg.pathname).toBe("/admin");
    });
  });
});
