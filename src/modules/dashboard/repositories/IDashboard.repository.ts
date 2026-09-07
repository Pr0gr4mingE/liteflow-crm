import { FunilBrutoItem } from "@/shared/types/ui/dashboard/dados-brutos/funil-bruto-item";
import { KpiBruto } from "@/shared/types/ui/dashboard/dados-brutos/kpi-bruto";
import { NegociacaoBruta } from "@/shared/types/ui/dashboard/dados-brutos/negociacao-bruta";
import { TarefaBruta } from "@/shared/types/ui/dashboard/dados-brutos/tarefa-bruta";


export interface IDashboardRepository {
  obterKpis(usuarioId: string, tipo: string): Promise<KpiBruto>;
  obterAgrupamentoPorFase(usuarioId: string, tipo: string): Promise<FunilBrutoItem[]>;
  obterNegociacoesProximasAoFechamento(usuarioId: string, tipo: string, limite: number): Promise<NegociacaoBruta[]>;
  obterTarefasPendentes(usuarioId: string, limite: number): Promise<TarefaBruta[]>;
}