import { formatarMoedaBRL } from "../formatar-moeda.util"; // Ajuste o caminho se necessário

describe("Utilitário: formatarMoedaBRL", () => {
  // 1. VERDE / POSITIVO: Formata um número válido para o padrão monetário BRL
  it("[Verde/Positivo] deve formatar corretamente um número inteiro ou decimal para o padrão BRL", () => {
    const resultado = formatarMoedaBRL(1500.5);
    // Removemos espaços não-quebráveis gerados pelo Intl se houver para garantir assertividade exata
    expect(resultado.replace(/\s/g, " ")).toContain("R$");
    expect(resultado).toContain("1.500,50");
  });

  // 2. VERMELHO / POSITIVO: Tentativa de passar um número que quebra a regra de negócio ou NaN, o sistema barra ou aplica fallback seguro
  it("[Vermelho/Positivo] deve retornar uma string de fallback ou zerada caso receba um valor NaN ou inválido", () => {
    const resultado = formatarMoedaBRL(NaN);
    expect(resultado).toBe("R$ 0,00"); // Ou o comportamento padrão definido no seu utilitário
  });

  // 3. VERDE / NEGATIVO: Entrada vazia, nula ou indefinida tratada sem quebrar a aplicação
  it("[Verde/Negativo] deve lidar com entradas nulas ou indefinidas retornando zero ou vazio de forma graciosa", () => {
    const resultado = formatarMoedaBRL(null as unknown as number);
    expect(resultado).toBe("R$ 0,00");
  });
});