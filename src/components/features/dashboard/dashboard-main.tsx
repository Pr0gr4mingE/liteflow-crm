"use client";

import { useDashboard } from "@/hooks/dashboard/use-dashboard.hook";
import { DashboardHeader } from "./dashboard-header";
import { DashboardKpis } from "./dashboard-kpis";
import { DashboardTarefas } from "./dashboard-tarefas";
import { DashboardNegociacoes } from "./dashboard-negociacoes";
import { GraficoFunil } from "./dashboard-grafico-funil";

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
        {/* Esquerda: Gráfico de Funil */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
          <h3 className="font-semibold text-slate-800 mb-2">Funil de Vendas</h3>
          <p className="text-sm text-slate-500 mb-6">Valores totais agrupados por estágio.</p>
          
          <div className="flex-1 w-full flex items-center justify-center">
            {carregando ? (
              <span className="text-slate-400 text-sm">Carregando gráfico...</span>
            ) : (
              <GraficoFunil dados={dados?.funil || []} />
            )}
          </div>
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