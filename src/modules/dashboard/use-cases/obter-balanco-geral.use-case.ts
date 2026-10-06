import { ObterBalancoGeralDTO } from "../dto/obter-balanco-geral.dto";
import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type"; 
import { IDashboardRepository } from "../repositories/IDashboard.repository"; 
import { rehidratarData } from "@/shared/utils/formatacao/rehidratar-data.util";

export class ObterBalancoGeralUseCase {
  constructor(private readonly dashboardRepository: IDashboardRepository) {}

  async execute(dados: ObterBalancoGeralDTO): Promise<BalancoGeralResponse> {
    const dataAtual = new Date();

    const kpisBrutos = await this.dashboardRepository.obterKpis(dados.usuarioId, dados.tipo);
    const funilBruto = await this.dashboardRepository.obterAgrupamentoPorFase(dados.usuarioId, dados.tipo);
    const negociacoesProximas = await this.dashboardRepository.obterNegociacoesProximasAoFechamento(dados.usuarioId, dados.tipo, 5); 
    const tarefasBrutas = await this.dashboardRepository.obterTarefasPendentes(dados.usuarioId, dados.tipo, 5);


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
      tarefasProximas: tarefasBrutas.map((tarefa) => {
        // 1. Bloco de código normal: declara a variável aqui
        const dataRehidratada = rehidratarData(tarefa.dataVencimento);
        
        // 2. Retorna o objeto explicitamente
        return {
          id: tarefa.id,
          titulo: tarefa.titulo,
          dataVencimento: dataRehidratada?.toISOString() || "",
          // Aproveite para usar a data segura aqui também
          atrasada: dataRehidratada ? dataRehidratada < dataAtual : false, 
      };
        }),
    negociacoesProximas: negociacoesProximas.map((negociacao) => {
      // 1. Declara a variável usando a sua função utilitária
      const dataRehidratada = rehidratarData(negociacao.dataPrevisaoFechamento);

      // 2. Retorna o objeto formatado
      return {
        id: negociacao.id,
        titulo: negociacao.titulo,
        valor: negociacao.valor,
        dataPrevisaoFechamento: dataRehidratada?.toISOString() || "", // Fallback seguro
    };
      }),
    };
  }
}