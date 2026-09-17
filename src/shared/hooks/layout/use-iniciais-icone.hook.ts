export function useIniciais(nomeCompleto?: string): string {
  // 1. Caso o nome seja vazio, já retorna o fallback
  if (!nomeCompleto || nomeCompleto.trim().length === 0) {
    return "U";
  }

  // 2. Calcula as partes do nome
  const partes = nomeCompleto.trim().split(" ");
  
  // 3. Retorna a primeira letra se for um nome único
  if (partes.length === 1) {
    return partes[0].charAt(0).toUpperCase();
  } 
  
  // 4. Retorna a primeira e a última letra se for nome composto
  const primeiraLetra = partes[0].charAt(0);
  const ultimaLetra = partes[partes.length - 1].charAt(0);
  
  return (primeiraLetra + ultimaLetra).toUpperCase();
}