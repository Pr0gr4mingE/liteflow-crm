import { formatarTelefone } from "../formatar-telefone.util"; // Ajuste o caminho se necessário

describe("Utilitário: formatarTelefone", () => {
  // 1. VERDE / POSITIVO: Formata um número válido de celular com DDD (11 dígitos)
  it("[Verde/Positivo] deve formatar corretamente uma string de 11 números no padrão (XX) XXXXX-XXXX", () => {
    const resultado = formatarTelefone("11987654321");
    expect(resultado).toBe("(11) 98765-4321");
  });

  // 2. VERMELHO / POSITIVO: Tentativa de formatar um número com tamanho inválido (ex: só 5 dígitos). O sistema barra a máscara e devolve o valor cru.
  it("[Vermelho/Positivo] deve retornar o valor original sem formatar se a quantidade de caracteres for insuficiente", () => {
    const resultado = formatarTelefone("12345");
    expect(resultado).toBe("12345");
  });

  // 3. VERDE / NEGATIVO: Entrada vazia. O sistema lida graciosamente sem estourar `TypeError: undefined is not a function`.
  it("[Verde/Negativo] deve lidar com entradas vazias, nulas ou indefinidas retornando string vazia", () => {
    // Simulando um dado corrompido ou não preenchido do banco
    const resultadoNulo = formatarTelefone(null as unknown as string);
    const resultadoVazio = formatarTelefone("");
    
    expect(resultadoNulo).toBe("");
    expect(resultadoVazio).toBe("");
  });
});