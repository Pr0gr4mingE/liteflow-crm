"use client";

import { useDashboard } from "@/hooks/dashboard/use-dashboard.hook";
import { DashboardHeader } from "./dashboard-header";
import { DashboardKpis } from "./dashboard-kpis";

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
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 flex justify-between items-center shadow-sm">
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
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm min-h-[400px] flex items-center justify-center">
          <span className="text-gray-400 font-medium">Gráfico de Funil (Em Breve)</span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm min-h-[190px] flex items-center justify-center">
            <span className="text-gray-400 font-medium">Negociações Próximas (Em Breve)</span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm min-h-[190px] flex items-center justify-center">
            <span className="text-gray-400 font-medium">Tarefas Pendentes (Em Breve)</span>
          </div>
        </div>
      </div>
    </div>
  );
}