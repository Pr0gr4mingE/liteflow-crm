import { ListarTarefasUseCase } from "../use-cases/listar-tarefa.use-case"; // Ajuste o caminho se criar arquivo separado
import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

export class ListarTarefasHandler {
  constructor(private readonly listarTarefasUseCase: ListarTarefasUseCase) {}

  async handle(usuarioId: string): Promise<Tarefa[]> {
    try {
      return await this.listarTarefasUseCase.execute(usuarioId);
    } catch (error) {
      console.error("[ListarTarefasHandler] Erro:", error);
      return [];
    }
  }
}