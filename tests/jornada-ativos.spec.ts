import { test, expect } from "@playwright/test";
function gerarCnpjValido() {
  const random = (n: number) => Math.floor(Math.random() * n);
  const n1 = random(9), n2 = random(9), n3 = random(9), n4 = random(9), n5 = random(9), n6 = random(9), n7 = random(9), n8 = random(9);
  const n9 = 0, n10 = 0, n11 = 0, n12 = 1; // Sufixo padrão de matriz
  
  let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  
  let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  
  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
}

function gerarCpfValido() {
  const random = (n: number) => Math.floor(Math.random() * n);
  const n = 9;
  const n1 = random(n), n2 = random(n), n3 = random(n), n4 = random(n), n5 = random(n), n6 = random(n), n7 = random(n), n8 = random(n), n9 = random(n);
  
  let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  
  let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  
  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

test.describe.configure({ mode: 'serial' });

let empresaCriadaNome = "";

test.describe("E2E: Jornada de Cadastro de Ativos (Clientes e Negociações)", () => {
  
  test.beforeEach(async ({ page }) => {
    // 1. SPEEDRUN DE LOGIN: O Playwright limpa os cookies a cada teste.
    // Precisamos pegar o "crachá de acesso" antes de tentar salvar no banco.
    await page.goto("http://localhost:3000/login-usuario");
    
    // 🚨 ATENÇÃO: Substitua pelo e-mail e senha de um usuário que JÁ EXISTE no seu banco local!
    await page.getByLabel("E-mail", { exact: true }).fill("demo@gmail.com");
    await page.getByLabel("Senha", { exact: true }).fill("Senhas12345");
    
    await page.getByRole("button", { name: "Entrar na plataforma" }).click();
    
    // Aguarda o login dar certo e a sessão (cookie) ser injetada no navegador
    await expect(page).toHaveURL(/.*painel/, { timeout: 5000 });

    // 2. Com a sessão autenticada, o robô vai para a tela de ativos
    await page.goto("http://localhost:3000/ativos");
  });

  // 1. CLIENTE PF [Verde/Positivo]
  test("[Verde/Positivo] deve preencher e submeter o cadastro de Cliente Pessoa Física", async ({ page }) => {
    const sufixoUnico = Date.now().toString().slice(-5);

    await page.getByLabel("Nome Completo *").fill(`Bruce Wayne ${sufixoUnico}`);
    const cpfGerado = gerarCpfValido();
await page.getByLabel("CPF").fill(cpfGerado);
    await page.getByLabel("Telefone *").fill("11999999999");
    await page.getByLabel("E-mail *").fill(`bruce${sufixoUnico}@wayne.com`);

    await page.getByRole("button", { name: "Criar Contato PF" }).click();

    // Aguarda o botão voltar a ficar habilitado (prova de que isPending acabou e salvou no BD)
    await expect(page.getByRole("button", { name: "Criar Contato PF" })).toBeEnabled({ timeout: 10000 });
    await expect(page.locator(".bg-red-50")).not.toBeVisible();
  });

  // 2. CLIENTE PJ [Vermelho/Positivo]
  test("[Vermelho/Positivo] deve bloquear a submissão de Cliente PJ caso campos obrigatórios (HTML5) estejam vazios", async ({ page }) => {
    await page.getByRole("button", { name: "Pessoa Jurídica (PJ)" }).click();

    await page.getByLabel("Razão Social *").fill("Wayne Enterprises E2E");

    const btnSubmit = page.getByRole("button", { name: "Criar Empresa PJ" });
    await btnSubmit.click();

    await expect(btnSubmit).toBeVisible();
  });

  // 2.5 CLIENTE PJ [Verde/Positivo] - Preparando o Autocomplete
  test("[Verde/Positivo] deve preencher e submeter o cadastro de Empresa PJ com sucesso", async ({ page }) => {
    const sufixoUnico = Date.now().toString().slice(-5);
    empresaCriadaNome = `Wayne Enterprises ${sufixoUnico}`;

    await page.getByRole("button", { name: "Pessoa Jurídica (PJ)" }).click();
    
    await page.getByLabel("Razão Social *").fill(empresaCriadaNome);
    await page.getByLabel("Nome Fantasia *").fill("Wayne Tech");
    const cnpjGerado = gerarCnpjValido();
    await page.getByLabel("CNPJ").fill(cnpjGerado);
    await page.getByLabel("Segmento *").selectOption({ value: "TECNOLOGIA" });
    await page.getByLabel("Telefone Corporativo *").fill("11999999999");
    await page.getByLabel("E-mail Corporativo *").fill(`contato${sufixoUnico}@wayne.com`);

    await page.getByRole("button", { name: "Criar Empresa PJ" }).click();
    
    // Espera o botão sair de "Criando Empresa..." provando que a Action finalizou
    await expect(page.getByRole("button", { name: "Criar Empresa PJ" })).toBeEnabled({ timeout: 10000 });
    await expect(page.locator(".bg-red-50")).not.toBeVisible();
  });

 // 3. NEGOCIAÇÃO PJ [Verde/Positivo]
  test("[Verde/Positivo] deve navegar para a aba de Negociações, selecionar Conta PJ e submeter o formulário", async ({ page }) => {
    
    await page.goto("http://localhost:3000/ativos");

    await page.getByRole("button", { name: "Nova Negociação" }).click();
    await page.getByRole("button", { name: "Conta (PJ)" }).click();

    const inputEmpresa = page.getByLabel("Selecione a Empresa *");
    await expect(inputEmpresa).toBeEnabled({ timeout: 10000 });

    // Preenche o nome da empresa diretamente e dá um Tab para fechar qualquer lista que abrir
    await inputEmpresa.fill(empresaCriadaNome);
    await inputEmpresa.press("Tab");

    await page.getByLabel("Título da Negociação Corporativa *").fill("Mentoria E2E");
    await page.getByLabel("Valor do Contrato (R$) *").fill("15000");
    await page.getByLabel("Fase Atual da Conta *").selectOption({ value: "PROPOSTA" }); 
    await page.getByLabel("Escopo do Projeto").fill("Implementação testada automaticamente.");

    await page.getByRole("button", { name: "Criar Negociação PJ" }).click();
    
    // Aguarda o botão confirmar o processamento para garantir que a inserção foi concluída
    await expect(page.getByRole("button", { name: "Criar Negociação PJ" })).toBeEnabled({ timeout: 15000 });
    
    // Garante que a submissão não cuspiu erro na tela
    await expect(page.locator(".bg-red-50, .text-red-500")).not.toBeVisible();
  });
});