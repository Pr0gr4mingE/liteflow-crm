import { KpiDashboard } from "./kpi-dashboard.type";
import { ItemFunilDashboard } from "./item-funil-dashboard.type";
import { TarefaProximaDashboard } from "./tarefa-proxima-dashboard.type";
import { NegociacaoProximaDashboard } from "./negociacao-proxima-dashboard.type";

export interface BalancoGeralResponse {
  kpis: KpiDashboard;
  funil: ItemFunilDashboard[];
  tarefasProximas: TarefaProximaDashboard[];
  negociacoesProximas: NegociacaoProximaDashboard[];
}