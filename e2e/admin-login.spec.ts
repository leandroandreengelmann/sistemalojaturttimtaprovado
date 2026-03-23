import { test, expect } from "@playwright/test";

/**
 * Fluxo de autenticação do painel admin.
 * Requer variáveis de ambiente:
 *   E2E_ADMIN_EMAIL=admin@turatti.com
 *   E2E_ADMIN_PASSWORD=senha_admin
 */

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? "";

test.describe("Login Admin", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login");
  });

  test("renderiza formulário de login", async ({ page }) => {
    await expect(page.getByPlaceholder("seu@email.com")).toBeVisible();
    await expect(page.getByPlaceholder("••••••••")).toBeVisible();
    await expect(page.getByRole("button", { name: /entrar no painel/i })).toBeVisible();
  });

  test("link 'Esqueceu a senha?' aponta para /admin/recuperar-senha", async ({ page }) => {
    await expect(page.getByText("Esqueceu a senha?")).toHaveAttribute(
      "href",
      "/admin/recuperar-senha"
    );
  });

  test("exibe erro com credenciais inválidas", async ({ page }) => {
    await page.fill('[placeholder="seu@email.com"]', "invalido@email.com");
    await page.fill('[placeholder="••••••••"]', "senhaerrada");
    await page.getByRole("button", { name: /entrar no painel/i }).click();

    await expect(
      page.getByText("E-mail ou senha incorretos. Verifique suas credenciais.")
    ).toBeVisible({ timeout: 5000 });
  });

  test("toggle de visibilidade da senha funciona", async ({ page }) => {
    const passwordInput = page.getByPlaceholder("••••••••");
    await expect(passwordInput).toHaveAttribute("type", "password");

    await page.getByRole("button", { name: /mostrar senha/i }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await page.getByRole("button", { name: /ocultar senha/i }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test.describe("Login com credenciais válidas", () => {
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, "E2E_ADMIN_EMAIL e E2E_ADMIN_PASSWORD não configurados");

    test("redireciona para /admin após login bem-sucedido", async ({ page }) => {
      await page.fill('[placeholder="seu@email.com"]', ADMIN_EMAIL);
      await page.fill('[placeholder="••••••••"]', ADMIN_PASSWORD);
      await page.getByRole("button", { name: /entrar no painel/i }).click();

      await expect(page).toHaveURL(/\/admin$/, { timeout: 10000 });
    });

    test("painel admin carrega após login", async ({ page }) => {
      await page.fill('[placeholder="seu@email.com"]', ADMIN_EMAIL);
      await page.fill('[placeholder="••••••••"]', ADMIN_PASSWORD);
      await page.getByRole("button", { name: /entrar no painel/i }).click();

      await page.waitForURL(/\/admin$/, { timeout: 10000 });
      // Sidebar ou conteúdo do dashboard deve estar visível
      await expect(page.locator("nav, aside, main")).toBeVisible();
    });

    test("/admin/login com sessão ativa redireciona para /admin", async ({ page, context }) => {
      // Login primeiro
      await page.fill('[placeholder="seu@email.com"]', ADMIN_EMAIL);
      await page.fill('[placeholder="••••••••"]', ADMIN_PASSWORD);
      await page.getByRole("button", { name: /entrar no painel/i }).click();
      await page.waitForURL(/\/admin$/, { timeout: 10000 });

      // Tenta acessar login novamente com sessão ativa
      await page.goto("/admin/login");
      await expect(page).toHaveURL(/\/admin$/, { timeout: 5000 });
    });
  });
});
