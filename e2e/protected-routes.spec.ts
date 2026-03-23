import { test, expect } from "@playwright/test";

/**
 * Proteção de rotas: verifica que /admin/* é inacessível sem sessão
 * e que rotas públicas funcionam normalmente.
 */

const ADMIN_ROUTES = [
  "/admin",
  "/admin/produtos",
  "/admin/categorias",
  "/admin/banners",
  "/admin/lojas",
  "/admin/configuracoes",
  "/admin/usuarios",
  "/admin/contatos",
];

test.describe("Proteção de Rotas", () => {
  test.describe("Usuário não autenticado", () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    for (const route of ADMIN_ROUTES) {
      test(`${route} → redireciona para /admin/login`, async ({ page }) => {
        await page.goto(route);
        await expect(page).toHaveURL(/\/admin\/login/);
      });
    }

    test("URL de login contém parâmetro 'next' com rota original", async ({ page }) => {
      await page.goto("/admin/produtos");
      const url = new URL(page.url());
      expect(url.searchParams.get("next")).toBe("/admin/produtos");
    });

    test("/admin/login é acessível sem autenticação", async ({ page }) => {
      await page.goto("/admin/login");
      await expect(page).toHaveURL(/\/admin\/login/);
      await expect(page.getByPlaceholder("seu@email.com")).toBeVisible();
    });
  });

  test.describe("Rotas públicas", () => {
    test("/ é acessível sem autenticação", async ({ page }) => {
      await page.goto("/");
      await expect(page).not.toHaveURL(/\/admin\/login/);
    });

    test("/loja é acessível sem autenticação", async ({ page }) => {
      await page.goto("/loja");
      await expect(page).not.toHaveURL(/\/admin\/login/);
    });

    test("/contato é acessível sem autenticação", async ({ page }) => {
      await page.goto("/contato");
      await expect(page).not.toHaveURL(/\/admin\/login/);
    });
  });
});
