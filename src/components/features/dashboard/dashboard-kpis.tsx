import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type";

interface DashboardKpisProps {
  kpis?: BalancoGeralResponse["kpis"];
  carregando: boolean;
}

export function DashboardKpis({ kpis, carregando }: DashboardKpisProps) {
  if (carregando || !kpis) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const formatarMoeda = (valor: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

  const metrics = [
    {
      titulo: "Receita Total",
      valor: formatarMoeda(kpis.receitaTotal),
      cor: "text-green-600 dark:text-green-400",
    },
    {
      titulo: "Ticket Médio",
      valor: formatarMoeda(kpis.ticketMedio),
      cor: "text-blue-600 dark:text-blue-400",
    },
    {
      titulo: "Taxa de Conversão",
      valor: `${kpis.taxaConversao.toFixed(1)}%`,
      cor: "text-purple-600 dark:text-purple-400",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-center"
        >
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {metric.titulo}
          </span>
          <span className={`text-3xl font-bold mt-2 ${metric.cor}`}>
            {metric.valor}
          </span>
        </div>
      ))}
    </div>
  );
}