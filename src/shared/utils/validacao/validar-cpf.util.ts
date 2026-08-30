/**
 * Valida a autenticidade matemática de um CPF.
 * @param cpf String contendo o CPF (com ou sem pontuação)
 * @returns boolean indicando se o CPF é matematicamente válido
 */
export function validarCpf(cpf: string): boolean {
  const cpfLimpo = cpf.replace(/\D/g, "");

  if (cpfLimpo.length !== 11) return false;

  // Bloqueia CPFs com todos os números iguais (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(cpfLimpo)) return false;

  let soma = 0;
  let resto;

  // Valida o primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

  soma = 0;
  // Valida o segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;

  return true;
}