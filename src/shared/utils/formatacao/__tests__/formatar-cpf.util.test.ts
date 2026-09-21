import { formatarCpf } from "../formatar-cpf.util";

describe("Utilitário: formatarCpf", () => {
  // 1. VERDE / POSITIVO: Eu quero formatar um CPF válido, e ele formata.
  it("[Verde/Positivo] deve formatar uma string de 11 números no padrão CPF correto", () => {
    const resultado = formatarCpf("12345678901");
    expect(resultado).toBe("123.456.789-01");
  });

  // 2. VERMELHO / POSITIVO: Eu tento formatar, mas mando lixo ou dado incompleto. O sistema me "barra" não formatando errado.
  it("[Vermelho/Positivo] não deve aplicar a máscara em valores incompletos, retornando o valor original", () => {
    const resultado = formatarCpf("12345");
    expect(resultado).toBe("12345"); 
  });

  // 3. VERDE / NEGATIVO: Eu não mando nada, e ele não quebra (comporta-se bem no vazio).
  it("[Verde/Negativo] deve lidar com entradas vazias retornando string vazia sem estourar erro", () => {
    const resultado = formatarCpf("");
    expect(resultado).toBe("");
  });
});