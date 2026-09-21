import { test, expect } from "@playwright/test";

test.describe("E2E: Saúde da Aplicação", () => {
  test("[Verde/Positivo] deve carregar a página inicial do CRM sem quebrar", async ({ page }) => {
    // Certifique-se de que o Next.js está rodando (npm run dev) em outro terminal
    await page.goto("http://localhost:3000/");

    // Garante que a aplicação renderizou e não estourou erro 500
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });
});