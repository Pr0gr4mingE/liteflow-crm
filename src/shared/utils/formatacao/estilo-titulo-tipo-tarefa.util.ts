export function EstiloTituloTipoTarefa(tipo: string) {
  const label = tipo.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  
  const tiposB2b = ["REUNIAO_APRESENTACAO", "ENVIO_PROPOSTA"];
  const tiposB2c = ["DISPARO_CAMPANHA", "LEMBRETE_RECOMPRA", "ANALISE_DADOS"];
  
  if (tiposB2b.includes(tipo)) {
    return { label, classes: "text-indigo-700 bg-indigo-50 border-indigo-200" };
  }
  if (tiposB2c.includes(tipo)) {
    return { label, classes: "text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200" };
  }
  // LIGACAO, EMAIL, LEMBRETE
  return { label, classes: "text-slate-700 bg-slate-100 border-slate-200" };
}