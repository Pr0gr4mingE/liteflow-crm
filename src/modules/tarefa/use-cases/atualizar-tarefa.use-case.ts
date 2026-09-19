import { ITarefaRepository } from "@/modules/tarefa/repositories/ITarefa.repository";
import { CriarTarefaDTO } from "@/modules/tarefa/dto/criar-tarefa.dto";

export class AtualizarTarefaUseCase {
  constructor(private tarefaRepository: ITarefaRepository) {}

  async executar(id: string, dados: Partial<CriarTarefaDTO>): Promise<void> {
    const tarefa = await this.tarefaRepository.buscarPorId(id);
    
    if (!tarefa) {
      throw new Error("Tarefa não encontrada.");
    }

    const hoje = new Date();
    if (tarefa.dataVencimento && new Date(tarefa.dataVencimento) < hoje) {
      throw new Error("Não é possível editar uma tarefa que já passou da data de vencimento.");
    }

    await this.tarefaRepository.atualizar(id, dados);
  }
}