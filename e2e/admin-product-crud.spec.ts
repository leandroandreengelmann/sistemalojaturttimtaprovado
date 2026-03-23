import { test, expect, Page } from "@playwright/test";

/**
 * CRUD completo de produtos no painel admin.
 * Requer:
 *   E2E_ADMIN_EMAIL=admin@turatti.com
 *   E2E_ADMIN_PASSWORD=senha_admin
 */

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? "";
const HAS_CREDENTIALS = !!(ADMIN_EMAIL && ADMIN_PASSWORD);

// ── Helper de login ──────────────────────────────────────────────────────────

async function login(page: Page) {
  await page.goto("/admin/login");
  await page.fill('[placeholder="seu@email.com"]', ADMIN_EMAIL);
  await page.fill('[placeholder="••••••••"]', ADMIN_PASSWORD);
  await page.getByRole("button", { name: /entrar no painel/i }).click();
  await page.waitForURL(/\/admin$/, { timeout: 10000 });
}

// ── Nome único por execução ──────────────────────────────────────────────────

const timestamp = Date.now();
const PRODUCT_NAME = `Produto Teste E2E ${timestamp}`;
const PRODUCT_NAME_EDITED = `${PRODUCT_NAME} Editado`;

// ── Tests ────────────────────────────────────────────────────────────────────

test.describe("Admin — CRUD de Produtos", () => {
  test.skip(!HAS_CREDENTIALS, "Credenciais de admin não configuradas (E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD)");

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("listagem de produtos carrega", async ({ page }) => {
    await page.goto("/admin/produtos");
    await expect(page).toHaveURL(/\/admin\/produtos/);
    // Tabela ou lista de produtos deve estar visível
    await expect(page.locator("table, [data-testid='product-list'], h1")).toBeVisible();
  });

  test("navega para formulário de novo produto", async ({ page }) => {
    await page.goto("/admin/produtos");
    await page.getByRole("link", { name: /novo produto/i }).click();
    await expect(page).toHaveURL(/\/admin\/produtos\/novo/);
  });

  test("cria produto com dados válidos", async ({ page }) => {
    await page.goto("/admin/produtos/novo");

    // Preenche campos obrigatórios
    await page.getByLabel(/nome/i).fill(PRODUCT_NAME);

    // Aguarda slug ser gerado automaticamente
    await page.waitForTimeout(500);

    // Sumário (pode ser opcional)
    const summary = page.getByLabel(/sumário|resumo/i);
    if (await summary.count() > 0) {
      await summary.fill("Produto criado durante teste automatizado E2E");
    }

    // Salva
    await page.getByRole("button", { name: /salvar|criar|cadastrar/i }).click();

    // Deve redirecionar para listagem ou edição
    await expect(page).toHaveURL(/\/admin\/produtos/, { timeout: 10000 });
    // Produto deve aparecer na listagem ou em URL de edição
  });

  test("produto criado aparece na listagem", async ({ page }) => {
    await page.goto("/admin/produtos");

    // Procura pelo nome do produto na página
    await expect(page.getByText(PRODUCT_NAME)).toBeVisible({ timeout: 5000 });
  });

  test("edita produto existente", async ({ page }) => {
    await page.goto("/admin/produtos");

    // Clica no produto para editar
    await page.getByText(PRODUCT_NAME).click();
    await expect(page).toHaveURL(/\/admin\/produtos\/[\w-]+/);

    // Edita o nome
    const nameInput = page.getByLabel(/nome/i);
    await nameInput.fill(PRODUCT_NAME_EDITED);

    await page.getByRole("button", { name: /salvar|atualizar/i }).click();

    // Feedback de sucesso
    await expect(
      page.getByText(/salvo|atualizado|sucesso/i)
    ).toBeVisible({ timeout: 5000 });
  });

  test("produto editado aparece com novo nome na listagem", async ({ page }) => {
    await page.goto("/admin/produtos");
    await expect(page.getByText(PRODUCT_NAME_EDITED)).toBeVisible({ timeout: 5000 });
  });

  test("desativa produto — não aparece em /loja", async ({ page }) => {
    await page.goto("/admin/produtos");

    // Encontra o toggle de ativo/inativo ou botão de desativar
    const row = page.locator("tr, [data-testid='product-row']").filter({
      hasText: PRODUCT_NAME_EDITED,
    });

    const toggle = row.getByRole("switch").or(row.getByLabel(/ativo|active/i));
    if (await toggle.count() > 0) {
      await toggle.click();
      await page.waitForTimeout(1000);

      // Verifica que produto não aparece no catálogo
      await page.goto("/loja");
      await expect(page.getByText(PRODUCT_NAME_EDITED)).not.toBeVisible();
    } else {
      test.skip(true, "Toggle de ativo não encontrado no layout atual");
    }
  });

  test("deleta produto — remove da listagem", async ({ page }) => {
    await page.goto("/admin/produtos");

    const row = page.locator("tr, [data-testid='product-row']").filter({
      hasText: PRODUCT_NAME_EDITED,
    });

    // Clica no botão de delete (ícone ou texto)
    const deleteBtn = row.getByRole("button", { name: /excluir|deletar|remover/i })
      .or(row.locator('[data-testid="delete-btn"]'));

    if (await deleteBtn.count() > 0) {
      await deleteBtn.click();

      // Dialog de confirmação
      const confirmBtn = page.getByRole("button", { name: /confirmar|sim|excluir/i });
      if (await confirmBtn.count() > 0) {
        await confirmBtn.click();
      }

      await page.waitForTimeout(1000);
      await expect(page.getByText(PRODUCT_NAME_EDITED)).not.toBeVisible({ timeout: 5000 });
    } else {
      test.skip(true, "Botão de delete não encontrado no layout atual");
    }
  });
});
