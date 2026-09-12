export function formatarTelefone(telefone: string) {

  const digitos = telefone.replace(/\D/g, "");

  if (digitos.length === 11) {

    return digitos.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  }

  if (digitos.length === 10) {

    return digitos.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

  }

  return telefone;

}