import { ITarefaRepository } from "../repositories/ITarefa.repository";
import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

export class ListarTarefasUseCase {
  constructor(private readonly tarefaRepository: ITarefaRepository) {}

  async execute(usuarioId: string): Promise<Tarefa[]> {
    return await this.tarefaRepository.listarPorUsuarioId(usuarioId);
  }
}