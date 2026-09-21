import { test, expect } from "@playwright/test";

test.describe("E2E: Jornada de Autenticação", () => {
  
  // 1. CADASTRO [Verde/Positivo]
  test("[Verde/Positivo] deve cadastrar um novo usuário com sucesso e redirecionar para o login", async ({ page }) => {
    // Acessa a rota exata da sua aplicação
    await page.goto("http://localhost:3000/cad-usuario");

    // Preenche usando as labels exatas do FormCadastro
    await page.getByLabel("Nome completo").fill("Usuário Teste E2E");
    await page.getByLabel("CPF").fill("12345678901");
    await page.getByLabel("E-mail profissional").fill("teste-e2e@crm.com");
    await page.getByLabel("Criar uma senha").fill("SenhaSegura123!");
    
    // Seleciona o primeiro cargo válido da lista (index 1, já que o 0 é o disabled "Selecione seu cargo")
    await page.getByLabel("Cargo").selectOption({ index: 1 });

    // Clica no botão com o texto exato
    await page.getByRole("button", { name: "Criar conta grátis" }).click();

    // Valida a mensagem de sucesso baseada no className text-green-600 do seu componente
    await expect(page.getByText(/sucesso/i)).toBeVisible();

    // O seu useCadastro tem um setTimeout de 1500ms, então o Playwright aguarda o redirecionamento
    await expect(page).toHaveURL(/.*login-usuario/, { timeout: 3000 });
  });

  // 2. LOGIN [Vermelho/Positivo]
  test("[Vermelho/Positivo] deve bloquear tentativa de login com credenciais incorretas", async ({ page }) => {
    // Acessa a rota que o botão de login da Landing Page aponta
    await page.goto("http://localhost:3000/login-usuario");

    await page.getByLabel("E-mail", { exact: true }).fill("hacker@invasao.com");
    await page.getByLabel("Senha", { exact: true }).fill("senhaerrada");
    
    await page.getByRole("button", { name: "Entrar na plataforma" }).click();

    // Valida o fallback do useLogin: "Credenciais inválidas."
    await expect(page.getByText(/inválid/i)).toBeVisible();
    
    // Garante que o usuário continuou na tela de login
    await expect(page).toHaveURL(/.*login-usuario/);
  });

  // 3. LOGIN [Verde/Positivo]
  test("[Verde/Positivo] deve realizar o login com sucesso e redirecionar para o painel", async ({ page }) => {
    await page.goto("http://localhost:3000/login-usuario");

    // Para esse teste passar 100%, esse usuário já deve existir no seu banco de dados local.
    // Dica: Após rodar o teste de cadastro (1), você pode usar os dados dele aqui.
    await page.getByLabel("E-mail", { exact: true }).fill("admin@crm.com");
    await page.getByLabel("Senha", { exact: true }).fill("admin123");
    
    await page.getByRole("button", { name: "Entrar na plataforma" }).click();

    // Mensagem de sucesso cravada no seu useLogin
    await expect(page.getByText("Login realizado com sucesso! Redirecionando...")).toBeVisible();

    // O useLogin redireciona especificamente para /painel
    await expect(page).toHaveURL(/.*painel/);
  });
});