import { test, expect } from "@playwright/test";

/**
 * Jornada do visitante: navegação pelo catálogo de produtos.
 * Não requer autenticação.
 */

test.describe("Visitante — Catálogo (/loja)", () => {
  test("página /loja carrega sem erros", async ({ page }) => {
    const response = await page.goto("/loja");
    expect(response?.status()).toBeLessThan(400);
  });

  test("título ou heading da loja é exibido", async ({ page }) => {
    await page.goto("/loja");
    // Procura qualquer heading ou título relevante
    await expect(
      page.locator("h1, h2").first()
    ).toBeVisible({ timeout: 8000 });
  });

  test("URL de busca por termo retorna página de resultados", async ({ page }) => {
    await page.goto("/busca?q=tinta");
    expect(page.url()).toContain("/busca");
    expect(page.url()).toContain("q=tinta");
  });

  test("página /busca carrega sem erros HTTP", async ({ page }) => {
    const response = await page.goto("/busca?q=produto");
    expect(response?.status()).toBeLessThan(400);
  });

  test("página / (home) carrega sem erros", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBeLessThan(400);
  });

  test("home renderiza algum conteúdo", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main, article, section").first()).toBeVisible({
      timeout: 8000,
    });
  });

  test("botão/link WhatsApp está presente na home", async ({ page }) => {
    await page.goto("/");
    const waBtn = page
      .getByRole("button", { name: /whatsapp/i })
      .or(page.locator('[aria-label*="WhatsApp"]'));
    await expect(waBtn.first()).toBeVisible({ timeout: 8000 });
  });
});

test.describe("Visitante — Páginas institucionais", () => {
  const pages = [
    { path: "/contato", name: "Contato" },
    { path: "/quem-somos", name: "Quem Somos" },
    { path: "/nossas-lojas", name: "Nossas Lojas" },
    { path: "/faq", name: "FAQ" },
    { path: "/cores", name: "Cores" },
  ];

  for (const { path, name } of pages) {
    test(`${name} (${path}) carrega sem erros`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
    });
  }
});

test.describe("Visitante — Acessibilidade básica", () => {
  test("home tem lang=pt-BR no html", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("pt-BR");
  });

  test("botão WhatsApp tem aria-label", async ({ page }) => {
    await page.goto("/");
    const waBtn = page.locator('[aria-label*="WhatsApp"]').first();
    await expect(waBtn).toBeVisible({ timeout: 8000 });
    const label = await waBtn.getAttribute("aria-label");
    expect(label).toBeTruthy();
  });

  test("página de contato é responsiva em mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/contato");
    await expect(
      page.getByPlaceholder("Seu nome completo")
    ).toBeVisible({ timeout: 5000 });
  });
});
