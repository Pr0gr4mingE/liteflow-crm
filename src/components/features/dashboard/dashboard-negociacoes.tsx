import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type";
import { Briefcase } from "lucide-react";

interface DashboardNegociacoesProps {
  negociacoes?: BalancoGeralResponse["negociacoesProximas"];
  carregando: boolean;
}

export function DashboardNegociacoes({ negociacoes, carregando }: DashboardNegociacoesProps) {
  if (carregando) {
    return (
      <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm min-h-[190px] flex flex-col gap-4">
        <div className="h-6 w-1/2 bg-slate-200 rounded animate-pulse" />
        <div className="h-12 w-full bg-slate-200 rounded animate-pulse" />
        <div className="h-12 w-full bg-slate-200 rounded animate-pulse" />
      </div>
    );
  }

  const formatarMoeda = (valor: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

  return (
    <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm min-h-[190px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5 text-slate-500" />
        <h2 className="text-lg font-semibold text-slate-800">Negociações Quentes</h2>
      </div>

      {!negociacoes || negociacoes.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
          Nenhuma negociação em destaque.
        </div>
      ) : (
        <ul className="space-y-3">
          {negociacoes.map((neg) => (
            <li 
              key={neg.id} 
              className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm"
            >
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-slate-800 line-clamp-1">
                  {neg.titulo}
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Fechamento: {new Date(neg.dataPrevisaoFechamento).toLocaleDateString("pt-BR")}
                </span>
              </div>
              
              <span className="text-sm font-bold text-emerald-600 whitespace-nowrap ml-3">
                {formatarMoeda(neg.valor)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}