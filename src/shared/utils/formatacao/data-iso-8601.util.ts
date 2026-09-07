/**
 * Converte datas vindas de inputs (type="date") para o formato ISO 8601 estrito.
 * Injeta o horário de meio-dia em UTC (T12:00:00.000Z) para blindar a data contra
 * o recuo de um dia causado pelo fuso horário brasileiro (UTC-3).
 */
export function formatarDataParaApi(dataString?: string | null): string | undefined {
  if (!dataString) return undefined;
  return new Date(`${dataString}T12:00:00.000Z`).toISOString();
}