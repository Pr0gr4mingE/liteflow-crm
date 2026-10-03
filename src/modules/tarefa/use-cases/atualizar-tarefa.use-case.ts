import { ITarefaRepository } from "@/modules/tarefa/repositories/ITarefa.repository";
import { CriarTarefaDTO } from "@/modules/tarefa/dto/criar-tarefa.dto";
import { AtualizacaoInternaDTO } from "../dto/atualizacao-interna.dto";

export class AtualizarTarefaUseCase {
  constructor(private tarefaRepository: ITarefaRepository) {}

  async executar(id: string, dados: Partial<CriarTarefaDTO>): Promise<void> {
    const tarefa = await this.tarefaRepository.buscarPorId(id);
    
    if (!tarefa) {
      throw new Error("Tarefa não encontrada.");
    }

    if (dados.dataVencimento) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas os dias
      const novaData = new Date(dados.dataVencimento);

      if (novaData < hoje) {
        throw new Error("A nova data de vencimento não pode estar no passado.");
      }
    }

    // Criamos um payload flexível para injetar os campos de controle do servidor
    const payloadAtualizacao: AtualizacaoInternaDTO = { ...dados };

    // Regra de negócio: Atualiza a data de conclusão baseada no status
    if (dados.status) {
      if (dados.status === "CONCLUIDA") {
        payloadAtualizacao.dataConclusao = new Date();
      } else {
        // Se a tarefa for reaberta (ex: PENDENTE), limpamos a data
        payloadAtualizacao.dataConclusao = null;
      }
    }

    // Força a atualização do timestamp geral sempre que houver uma edição
    payloadAtualizacao.dataAtualizacao = new Date();

    await this.tarefaRepository.atualizar(id, payloadAtualizacao);
  }
}