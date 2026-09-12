export function formatarFase(fase: string): string {

  if (fase === "DESISTENCIA" || fase === "INDEFERIDO") {

    return "bg-red-50 text-red-700 border-red-200";

  }

  if (fase === "CONVERSAO" || fase === "FECHADO") {

    return "bg-emerald-50 text-emerald-700 border-emerald-200";

  }

  return "bg-slate-50 text-slate-700 border-slate-200";

}