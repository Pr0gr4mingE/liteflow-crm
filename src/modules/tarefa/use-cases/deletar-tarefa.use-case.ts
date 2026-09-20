// src/usecases/ativos/tarefas/deletar-tarefa.use-case.ts
import { ITarefaRepository } from "../repositories/ITarefa.repository";

export class DeletarTarefaUseCase {
  constructor(private readonly tarefaRepository: ITarefaRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      const deletou = await this.tarefaRepository.deletar(id);
      
      if (!deletou) {
        // Se retornou false, significa que o .returning() veio vazio. O ID não existe.
        throw new Error("Tarefa não encontrada para exclusão.");
      }
      
      return true;
    } catch (error) {
      console.error("[DeletarTarefaUseCase] Falha ao deletar:", error);
      // Aqui você pode tratar erros específicos do banco (como Foreign Keys se houvesse)
      throw new Error("Não foi possível excluir a tarefa no momento.");
    }
  }
}