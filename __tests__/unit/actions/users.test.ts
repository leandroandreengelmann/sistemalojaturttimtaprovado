import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockCreateUser = vi.fn().mockResolvedValue({ error: null });
const mockUpdateUser = vi.fn().mockResolvedValue({ error: null });
const mockDeleteUser = vi.fn().mockResolvedValue({ error: null });

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(() => ({
    auth: {
      admin: {
        createUser: mockCreateUser,
        updateUserById: mockUpdateUser,
        deleteUser: mockDeleteUser,
      },
    },
  })),
}));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { createUser, updateUser, deleteUser } from "@/lib/actions/users";
import { revalidatePath } from "next/cache";

function fd(fields: Record<string, string>) {
  const f = new FormData();
  Object.entries(fields).forEach(([k, v]) => f.append(k, v));
  return f;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("users actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateUser.mockResolvedValue({ error: null });
    mockUpdateUser.mockResolvedValue({ error: null });
    mockDeleteUser.mockResolvedValue({ error: null });
  });

  describe("createUser()", () => {
    it("cria usuário via auth.admin.createUser com email e password", async () => {
      await createUser(fd({ email: "admin@turatti.com", password: "senha123", name: "Admin", role: "admin" }));
      expect(mockCreateUser).toHaveBeenCalledWith(
        expect.objectContaining({ email: "admin@turatti.com", password: "senha123" })
      );
    });

    it("confirma email automaticamente", async () => {
      await createUser(fd({ email: "user@turatti.com", password: "123", name: "User", role: "editor" }));
      expect(mockCreateUser).toHaveBeenCalledWith(
        expect.objectContaining({ email_confirm: true })
      );
    });

    it("inclui name e role nos user_metadata", async () => {
      await createUser(fd({ email: "x@x.com", password: "123", name: "João", role: "editor" }));
      expect(mockCreateUser).toHaveBeenCalledWith(
        expect.objectContaining({ user_metadata: { name: "João", role: "editor" } })
      );
    });

    it("retorna {} em sucesso", async () => {
      expect(await createUser(fd({ email: "x@x.com", password: "123", name: "X", role: "admin" }))).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockCreateUser.mockResolvedValue({ error: { message: "Email already in use" } });
      expect(
        await createUser(fd({ email: "x@x.com", password: "123", name: "X", role: "admin" }))
      ).toEqual({ error: "Email already in use" });
    });

    it("revalida /admin/usuarios após criar", async () => {
      await createUser(fd({ email: "x@x.com", password: "123", name: "X", role: "admin" }));
      expect(revalidatePath).toHaveBeenCalledWith("/admin/usuarios");
    });
  });

  describe("updateUser()", () => {
    it("atualiza email e user_metadata pelo id", async () => {
      await updateUser("user-id", fd({ email: "novo@email.com", password: "", name: "Novo", role: "editor" }));
      expect(mockUpdateUser).toHaveBeenCalledWith(
        "user-id",
        expect.objectContaining({ email: "novo@email.com", user_metadata: { name: "Novo", role: "editor" } })
      );
    });

    it("inclui password no payload quando fornecida", async () => {
      await updateUser("user-id", fd({ email: "x@x.com", password: "nova123", name: "X", role: "admin" }));
      expect(mockUpdateUser).toHaveBeenCalledWith(
        "user-id",
        expect.objectContaining({ password: "nova123" })
      );
    });

    it("não inclui password no payload quando string vazia", async () => {
      await updateUser("user-id", fd({ email: "x@x.com", password: "", name: "X", role: "admin" }));
      const payload = mockUpdateUser.mock.calls[0][1];
      expect(payload.password).toBeUndefined();
    });

    it("retorna {} em sucesso", async () => {
      expect(
        await updateUser("id", fd({ email: "x@x.com", password: "", name: "X", role: "admin" }))
      ).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockUpdateUser.mockResolvedValue({ error: { message: "User not found" } });
      expect(
        await updateUser("id", fd({ email: "x@x.com", password: "", name: "X", role: "admin" }))
      ).toEqual({ error: "User not found" });
    });

    it("revalida /admin/usuarios após atualizar", async () => {
      await updateUser("id", fd({ email: "x@x.com", password: "", name: "X", role: "admin" }));
      expect(revalidatePath).toHaveBeenCalledWith("/admin/usuarios");
    });
  });

  describe("deleteUser()", () => {
    it("deleta usuário pelo id via auth.admin", async () => {
      await deleteUser("user-del");
      expect(mockDeleteUser).toHaveBeenCalledWith("user-del");
    });

    it("retorna {} em sucesso", async () => {
      expect(await deleteUser("id")).toEqual({});
    });

    it("retorna error quando Supabase falha", async () => {
      mockDeleteUser.mockResolvedValue({ error: { message: "Not found" } });
      expect(await deleteUser("id")).toEqual({ error: "Not found" });
    });

    it("revalida /admin/usuarios após deletar", async () => {
      await deleteUser("id");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/usuarios");
    });
  });
});
