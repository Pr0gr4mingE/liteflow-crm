"use client";

import { useDashboard } from "@/hooks/dashboard/use-dashboard.hook";
import { DashboardHeader } from "./dashboard-header";
import { DashboardKpis } from "./dashboard-kpis";
import { DashboardTarefas } from "./dashboard-tarefas";
import { DashboardNegociacoes } from "./dashboard-negociacoes";

export function DashboardMain() {
  const { 
    dados, 
    carregando, 
    erro, 
    tipoFunil, 
    setTipoFunil, 
    recarregar 
  } = useDashboard();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <DashboardHeader 
        tipoFunil={tipoFunil} 
        setTipoFunil={setTipoFunil} 
        carregando={carregando} 
      />

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6 flex justify-between items-center shadow-sm">
          <p className="text-sm font-medium">{erro}</p>
          <button 
            onClick={recarregar} 
            className="text-sm underline hover:no-underline font-semibold"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <DashboardKpis 
        kpis={dados?.kpis} 
        carregando={carregando} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Esquerda: Gráfico de Funil (Espaço Reservado) */}
        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm min-h-[400px] flex items-center justify-center">
          <span className="text-slate-400 font-medium">Gráfico de Funil (Em Breve)</span>
        </div>

        {/* Direita: Listas Verticais */}
        <div className="flex flex-col gap-6">
          <DashboardNegociacoes 
            negociacoes={dados?.negociacoesProximas} 
            carregando={carregando} 
          />
          
          <DashboardTarefas 
            tarefas={dados?.tarefasProximas} 
            carregando={carregando} 
          />
        </div>
      </div>
    </div>
  );
}