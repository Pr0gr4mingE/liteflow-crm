export function formatarCpf(cpf: string) {

  const digitos = cpf.replace(/\D/g, "");

  if (digitos.length !== 11) return cpf;

  return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

}