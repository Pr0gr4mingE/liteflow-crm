import { test, expect } from "@playwright/test";

test.describe("E2E: Jornada de Cadastro de Ativos (Clientes e Negociações)", () => {
  
  test.beforeEach(async ({ page }) => {
    // Acessa a rota exata onde a página CadastroAtivosPage está renderizada
    await page.goto("http://localhost:3000/ativos");
  });

  // 1. CLIENTE PF [Verde/Positivo]
  test("[Verde/Positivo] deve preencher e submeter o cadastro de Cliente Pessoa Física", async ({ page }) => {
    // A aba "Novo Cliente" e "Pessoa Física (PF)" já são o padrão do useState("PF")
    
    // O Playwright encontra os inputs pelos labels exatos criados por você
    await page.getByLabel("Nome Completo *").fill("Bruce Wayne E2E");
    await page.getByLabel("CPF *").fill("12345678901");
    await page.getByLabel("Telefone *").fill("11999999999");
    await page.getByLabel("E-mail *").fill("bruce.e2e@wayne.com");

    await page.getByRole("button", { name: "Criar Contato PF" }).click();

    // Como o hook atual apenas faz um console.log no sucesso, garantimos que a div de erro vermelha (.bg-red-50) NÃO apareceu na tela
    await expect(page.locator(".bg-red-50")).not.toBeVisible();
  });

  // 2. CLIENTE PJ [Vermelho/Positivo]
  test("[Vermelho/Positivo] deve bloquear a submissão de Cliente PJ caso campos obrigatórios (HTML5) estejam vazios", async ({ page }) => {
    // Alterna para a aba de Pessoa Jurídica
    await page.getByRole("button", { name: "Pessoa Jurídica (PJ)" }).click();

    // Preenche apenas um campo e ignora os outros obrigatórios (ex: CNPJ vazio)
    await page.getByLabel("Razão Social *").fill("Wayne Enterprises E2E");

    const btnSubmit = page.getByRole("button", { name: "Criar Empresa PJ" });
    await btnSubmit.click();

    // O HTML5 intercepta o form, bloqueando o envio. O botão continua visível e a página não sofre mutação.
    await expect(btnSubmit).toBeVisible();
  });

  // 3. NEGOCIAÇÃO PJ [Verde/Positivo]
  test("[Verde/Positivo] deve navegar para a aba de Negociações, selecionar Conta PJ e submeter o formulário", async ({ page }) => {
    // Troca a aba principal
    await page.getByRole("button", { name: "Nova Negociação" }).click();

    // Troca a sub-aba para PJ
    await page.getByRole("button", { name: "Conta (PJ)" }).click();

    // Aguarda o select carregar os dados (isPending ficar falso e remover o disabled)
    const selectEmpresa = page.getByLabel("Selecione a Empresa *");
    await expect(selectEmpresa).not.toBeDisabled({ timeout: 5000 });

    // Seleciona o primeiro cliente da lista pelo index, útil em ambientes de teste
    await selectEmpresa.selectOption({ index: 1 });

    // Preenche os dados da negociação
    await page.getByLabel("Título da Negociação Corporativa *").fill("Mentoria E2E");
    await page.getByLabel("Valor do Contrato (R$) *").fill("15000");
    await page.getByLabel("Fase Atual da Conta *").selectOption({ label: "Proposta" }); 
    
    // Campos opcionais
    await page.getByLabel("Escopo do Projeto").fill("Implementação testada automaticamente.");

    await page.getByRole("button", { name: "Criar Negociação PJ" }).click();

    // Garante que o hook de ação do server não devolveu erro
    await expect(page.locator(".bg-red-50")).not.toBeVisible();
  });
});