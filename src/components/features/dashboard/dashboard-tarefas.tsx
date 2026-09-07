import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type";
import { CheckSquare, AlertCircle } from "lucide-react";

interface DashboardTarefasProps {
  tarefas?: BalancoGeralResponse["tarefasProximas"];
  carregando: boolean;
}

export function DashboardTarefas({ tarefas, carregando }: DashboardTarefasProps) {
  if (carregando) {
    return (
      <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm min-h-[190px] flex flex-col gap-4">
        <div className="h-6 w-1/2 bg-slate-200 rounded animate-pulse" />
        <div className="h-12 w-full bg-slate-200 rounded animate-pulse" />
        <div className="h-12 w-full bg-slate-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm min-h-[190px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="w-5 h-5 text-slate-500" />
        <h2 className="text-lg font-semibold text-slate-800">Tarefas Pendentes</h2>
      </div>

      {!tarefas || tarefas.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
          Nenhuma tarefa próxima.
        </div>
      ) : (
        <ul className="space-y-3">
          {tarefas.map((tarefa) => (
            <li 
              key={tarefa.id} 
              className="flex items-start justify-between bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-800 line-clamp-1">
                  {tarefa.titulo}
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  {/* Instanciando Date para driblar a serialização do Next.js */}
                  Vence: {new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}
                </span>
              </div>
              
              {tarefa.atrasada && (
                <div className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                  <AlertCircle className="w-3 h-3" />
                  <span>Atrasada</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}