import { DeletarTarefaUseCase } from "@/modules/tarefa/use-cases/deletar-tarefa.use-case";

export class DeletarTarefaHandler {
  constructor(private readonly deletarTarefaUseCase: DeletarTarefaUseCase) {}

  async handle(id: string) {
    try {
      if (!id) {
        return { sucesso: false, mensagem: "ID da tarefa é obrigatório." };
      }

      await this.deletarTarefaUseCase.execute(id);

      return { sucesso: true, mensagem: "Tarefa deletada com sucesso." };
    } catch (error: unknown) {
      console.error("[DeletarTarefaHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao deletar tarefa." };
    }
  }
}