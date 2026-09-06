/**
 * Converte datas para o padrão visual brasileiro (DD/MM/AAAA)
 * e blinda a renderização contra regressão de fuso horário (bug do dia anterior).
 */
export function formatarDataPtBr(data?: string | Date | null, fallback = "Sem previsão"): string {
  if (!data) return fallback;

  const dataConvertida = new Date(data);

  if (isNaN(dataConvertida.getTime())) {
    return fallback;
  }

  // O timeZone: 'UTC' força o navegador a respeitar o dia exato da string original,
  // ignorando o fuso horário local (ex: GMT-3) do dispositivo do usuário.
  return dataConvertida.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}