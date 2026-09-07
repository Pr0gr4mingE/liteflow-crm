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
          <div key={i} className="h-32 bg-slate-200 rounded-xl border border-slate-300/50 animate-pulse" />
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
      cor: "text-emerald-600", 
    },
    {
      titulo: "Ticket Médio",
      valor: formatarMoeda(kpis.ticketMedio),
      cor: "text-blue-600",
    },
    {
      titulo: "Taxa de Conversão",
      valor: `${kpis.taxaConversao.toFixed(1)}%`,
      cor: "text-fuchsia-600", 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="bg-slate-100 p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center"
        >
          <span className="text-sm font-medium text-slate-500 mb-3">
            {metric.titulo}
          </span>
          <span className={`text-4xl font-bold tracking-tight ${metric.cor}`}>
            {metric.valor}
          </span>
        </div>
      ))}
    </div>
  );
}