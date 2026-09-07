// src/application/dashboard/use-cases/obter-balanco-geral.use-case.ts
import { ObterBalancoGeralDTO } from "../dto/obter-balanco-geral.dto";
import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type"; 
import { IDashboardRepository } from "../repositories/IDashboard.repository"; // Ajustado com a capitalização exata da sua imagem

export class ObterBalancoGeralUseCase {
  constructor(private readonly dashboardRepository: IDashboardRepository) {}

  async execute(dados: ObterBalancoGeralDTO): Promise<BalancoGeralResponse> {
    const dataAtual = new Date();
    
    // 1. Calcula o início e o fim do mês atual
    const inicioDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    const fimDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0, 23, 59, 59);

    // O TypeScript infere os tipos a partir do IDashboardRepository automaticamente
    const kpisBrutos = await this.dashboardRepository.obterKpis(dados.usuarioId, dados.tipo);
    const funilBruto = await this.dashboardRepository.obterAgrupamentoPorFase(dados.usuarioId, dados.tipo);
    const negociacoesProximas = await this.dashboardRepository.obterNegociacoesProximasAoFechamento(dados.usuarioId, dados.tipo, 5); 
    const tarefasBrutas = await this.dashboardRepository.obterTarefasPendentes(dados.usuarioId, 5);

    return {
      kpis: {
        receitaTotal: kpisBrutos.receitaTotal || 0,
        ticketMedio: kpisBrutos.ticketMedio || 0,
        // Removido o 'any', o TS agora sabe que 'neg' é da array de negociações do KpiBruto
        previsaoMes: kpisBrutos.negociacoes.reduce((acc, neg) => {
          const dataFechamento = new Date(neg.dataPrevisaoFechamento);
          if (dataFechamento >= inicioDoMes && dataFechamento <= fimDoMes) {
            return acc + neg.valor;
          }
          return acc;
        }, 0),
        taxaConversao: kpisBrutos.taxaConversao || 0,
      },
      // Removido o 'any', o TS agora entende que 'item' é 'FunilBrutoItem'
      funil: funilBruto.map((item) => ({
        fase: item.fase,
        quantidade: item.quantidade,
        valorTotal: item.valorTotal,
      })),
      // Removido o 'any', o TS agora entende que 'tarefa' é 'TarefaBruta'
      tarefasProximas: tarefasBrutas.map((tarefa) => ({
        id: tarefa.id,
        titulo: tarefa.titulo,
        dataVencimento: new Date(tarefa.dataVencimento).toISOString(),
        atrasada: new Date(tarefa.dataVencimento) < dataAtual,
      })),
      // Removido o 'any', o TS agora entende que 'negociacao' é 'NegociacaoBruta'
      negociacoesProximas: negociacoesProximas.map((negociacao) => ({
        id: negociacao.id,
        titulo: negociacao.titulo,
        valor: negociacao.valor,
        dataPrevisaoFechamento: new Date(negociacao.dataPrevisaoFechamento).toISOString(),
      })),
    };
  }
}