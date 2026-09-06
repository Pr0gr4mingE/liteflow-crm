/**
 * Reconverte datas que foram transformadas em string pelo JSON.stringify
 * de volta para objetos Date nativos do JavaScript, protegendo contra valores inválidos.
 */
export function rehidratarData(data?: string | Date | null): Date | undefined {
  if (!data) return undefined;

  const dataConvertida = new Date(data);

  // Verifica se a data é válida (evita que o JS crie um objeto 'Invalid Date')
  if (isNaN(dataConvertida.getTime())) {
    return undefined;
  }

  return dataConvertida;
}