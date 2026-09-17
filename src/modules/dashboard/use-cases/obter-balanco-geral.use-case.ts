import { ObterBalancoGeralDTO } from "../dto/obter-balanco-geral.dto";
import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type"; 
import { IDashboardRepository } from "../repositories/IDashboard.repository"; 

export class ObterBalancoGeralUseCase {
  constructor(private readonly dashboardRepository: IDashboardRepository) {}

  async execute(dados: ObterBalancoGeralDTO): Promise<BalancoGeralResponse> {
    const dataAtual = new Date();

    const kpisBrutos = await this.dashboardRepository.obterKpis(dados.usuarioId, dados.tipo);
    const funilBruto = await this.dashboardRepository.obterAgrupamentoPorFase(dados.usuarioId, dados.tipo);
    const negociacoesProximas = await this.dashboardRepository.obterNegociacoesProximasAoFechamento(dados.usuarioId, dados.tipo, 5); 
    const tarefasBrutas = await this.dashboardRepository.obterTarefasPendentes(dados.usuarioId, 5);

    return {
      kpis: {
        receitaTotal: kpisBrutos.receitaTotal || 0,
        ticketMedio: kpisBrutos.ticketMedio || 0,
        previsaoMes: kpisBrutos.previsaoMes || 0, // <-- O(1): Valor já calculado pelo banco
        taxaConversao: kpisBrutos.taxaConversao || 0,
      },
      funil: funilBruto.map((item) => ({
        fase: item.fase,
        quantidade: item.quantidade,
        valorTotal: item.valorTotal,
      })),
      tarefasProximas: tarefasBrutas.map((tarefa) => ({
        id: tarefa.id,
        titulo: tarefa.titulo,
        dataVencimento: new Date(tarefa.dataVencimento).toISOString(),
        atrasada: new Date(tarefa.dataVencimento) < dataAtual,
      })),
      negociacoesProximas: negociacoesProximas.map((negociacao) => ({
        id: negociacao.id,
        titulo: negociacao.titulo,
        valor: negociacao.valor,
        dataPrevisaoFechamento: new Date(negociacao.dataPrevisaoFechamento).toISOString(),
      })),
    };
  }
}