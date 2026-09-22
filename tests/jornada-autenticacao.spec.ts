import { test, expect } from "@playwright/test";

// ==========================================
// DADOS DINÂMICOS GLOBAIS (Gerados 1x por rodada)
// ==========================================
const sufixoUnico = Date.now().toString().slice(-5);
const emailGlobal = `teste${sufixoUnico}@crm.com`;
const senhaPadrao = "SenhaSegura123!";

function gerarCpfValido(): string {
  const randomDigit = () => Math.floor(Math.random() * 9);
  const n = Array.from({ length: 9 }, randomDigit);

  let d1 = 11 - (n.reduce((total, number, index) => total + number * (10 - index), 0) % 11);
  if (d1 >= 10) d1 = 0;

  let d2 = 11 - ((d1 * 2 + n.reduce((total, number, index) => total + number * (11 - index), 0)) % 11);
  if (d2 >= 10) d2 = 0;

  return `${n.join("")}${d1}${d2}`;
}

const cpfGlobal = gerarCpfValido();

// ==========================================
// SUÍTE DE TESTES
// ==========================================
test.describe.configure({ mode: 'serial' });

test.describe("E2E: Jornada de Autenticação", () => {
  
  // 1. CADASTRO [Verde/Positivo]
  test("[Verde/Positivo] deve cadastrar um novo usuário com sucesso e redirecionar para o login", async ({ page }) => {
    await page.goto("http://localhost:3000/cad-usuario");

    await page.getByLabel("Nome completo").fill(`Usuário Teste ${sufixoUnico}`);
    
    // Injeta o CPF matemático correto para a sua API não barrar
    await page.getByLabel("CPF").fill(cpfGlobal);
    
    // Injeta o e-mail global que será usado no passo 3
    await page.getByLabel("E-mail profissional").fill(emailGlobal);
    await page.getByLabel("Criar uma senha").fill(senhaPadrao);
    
    await page.getByLabel("Cargo").selectOption({ label: "Administrador" });

    await page.getByRole("button", { name: "Criar conta grátis" }).click();

    // Garante que a API não cuspiu erro de CPF ou Validação na tela
    await expect(page.locator(".text-red-500")).not.toBeVisible();

    // Prova real: redirecionou para o login
    await expect(page).toHaveURL(/.*login-usuario/, { timeout: 15000 });
  });

  // 2. LOGIN [Vermelho/Positivo]
  test("[Vermelho/Positivo] deve bloquear tentativa de login com credenciais incorretas", async ({ page }) => {
    await page.goto("http://localhost:3000/login-usuario");

    await page.getByLabel("E-mail", { exact: true }).fill("hacker@invasao.com");
    await page.getByLabel("Senha", { exact: true }).fill("senhaerrada");
    
    await page.getByRole("button", { name: "Entrar na plataforma" }).click();

    await expect(page.getByText(/inválid/i)).toBeVisible({ timeout: 5000 });
  });

  // 3. LOGIN [Verde/Positivo]
  test("[Verde/Positivo] deve realizar o login com sucesso e redirecionar para o painel", async ({ page }) => {
    await page.goto("http://localhost:3000/login-usuario");

    // Usa EXATAMENTE a mesma constante de e-mail criada lá em cima e salva no Teste 1
    await page.getByLabel("E-mail", { exact: true }).fill(emailGlobal);
    await page.getByLabel("Senha", { exact: true }).fill(senhaPadrao);
    
    await page.getByRole("button", { name: "Entrar na plataforma" }).click();

    // Garante que o login não deu erro
    await expect(page.locator(".text-red-500")).not.toBeVisible();

    // Prova real: redirecionou para o painel!
    await expect(page).toHaveURL(/.*painel/, { timeout: 15000 });
  });
});