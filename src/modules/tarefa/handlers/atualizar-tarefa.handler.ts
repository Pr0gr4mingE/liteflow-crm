import { CriarTarefaDTO } from "../dto/criar-tarefa.dto";
import { AtualizarTarefaUseCase } from "../use-cases/atualizar-tarefa.use-case";

export class AtualizarTarefaHandler {
  constructor(private readonly atualizarTarefaUseCase: AtualizarTarefaUseCase) {}

  async handle(id: string, dadosEntrada: Partial<CriarTarefaDTO>) {
    try {
      await this.atualizarTarefaUseCase.executar(id, dadosEntrada);
      return { sucesso: true, mensagem: "Tarefa atualizada com sucesso." };
    } catch (error: unknown) {
      console.error("[AtualizarTarefaHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao atualizar tarefa." };
    }
  }
}