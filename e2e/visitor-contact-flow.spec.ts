import { test, expect } from "@playwright/test";

/**
 * Jornada do visitante: formulário de contato na página pública.
 * Não requer autenticação.
 */

test.describe("Visitante — Formulário de Contato", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contato");
  });

  test("página de contato carrega corretamente", async ({ page }) => {
    await expect(page).toHaveURL(/\/contato/);
    await expect(page.getByPlaceholder("Seu nome completo")).toBeVisible();
    await expect(page.getByPlaceholder("Descreva como podemos ajudar...")).toBeVisible();
  });

  test("campos obrigatórios são exibidos", async ({ page }) => {
    await expect(page.getByPlaceholder("Seu nome completo")).toBeVisible();
    await expect(page.getByPlaceholder("Descreva como podemos ajudar...")).toBeVisible();
    await expect(page.getByRole("button", { name: /enviar mensagem/i })).toBeVisible();
  });

  test("campo de email aceita formato válido", async ({ page }) => {
    const emailInput = page.getByPlaceholder("seu@email.com");
    await emailInput.fill("invalido");
    await page.getByRole("button", { name: /enviar mensagem/i }).click();

    // Browser validation nativo (input type=email)
    const validity = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(validity).toBe(false);
  });

  test("select de assunto tem opções corretas", async ({ page }) => {
    const select = page.getByRole("combobox");
    await expect(select).toBeVisible();
    // Verifica opções via atributo value (options ficam hidden até o dropdown abrir)
    const options = await select.locator("option").all();
    const values = await Promise.all(options.map((o) => o.getAttribute("value")));
    expect(values).toContain("orcamento");
    expect(values).toContain("parceria");
    expect(values).toContain("informacoes");
  });

  test("envia formulário com dados válidos e exibe confirmação", async ({ page }) => {
    await page.fill('[placeholder="Seu nome completo"]', "João Teste E2E");
    await page.fill('[placeholder="seu@email.com"]', "joao@teste.com");
    await page.fill('[placeholder="(00) 00000-0000"]', "(11) 99999-9999");
    await page.selectOption("select[name='subject']", "orcamento");
    await page.fill(
      '[placeholder="Descreva como podemos ajudar..."]',
      "Mensagem de teste automatizado E2E"
    );

    await page.getByRole("button", { name: /enviar mensagem/i }).click();

    await expect(page.getByText("Mensagem enviada!")).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText("Recebemos seu contato e retornaremos em breve")
    ).toBeVisible();
  });

  test("link 'Enviar outra mensagem' volta ao formulário", async ({ page }) => {
    await page.fill('[placeholder="Seu nome completo"]', "Teste");
    await page.fill('[placeholder="Descreva como podemos ajudar..."]', "Teste msg");

    await page.getByRole("button", { name: /enviar mensagem/i }).click();
    await expect(page.getByText("Mensagem enviada!")).toBeVisible({ timeout: 10000 });

    await page.getByText("Enviar outra mensagem").click();
    await expect(page.getByPlaceholder("Seu nome completo")).toBeVisible();
  });
});
