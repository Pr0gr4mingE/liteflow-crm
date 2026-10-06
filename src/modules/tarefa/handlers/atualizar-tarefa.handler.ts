import { CriarTarefaDTO } from "../dto/criar-tarefa.dto";
import { AtualizarTarefaUseCase } from "../use-cases/atualizar-tarefa.use-case";
import { rehidratarData } from "@/shared/utils/formatacao/rehidratar-data.util"; // <-- Ajuste o path da sua utilitária

export class AtualizarTarefaHandler {
  constructor(private readonly atualizarTarefaUseCase: AtualizarTarefaUseCase) {}

  async handle(id: string, dadosEntrada: Partial<CriarTarefaDTO>) {
    try {
      // Intercepta a string que veio do JSON e transforma em Date nativo
      if (dadosEntrada.dataVencimento) {
        dadosEntrada.dataVencimento = rehidratarData(dadosEntrada.dataVencimento as unknown as string) as Date;
      }

      await this.atualizarTarefaUseCase.executar(id, dadosEntrada);
      return { sucesso: true, mensagem: "Tarefa atualizada com sucesso." };
    } catch (error: unknown) {
      console.error("[AtualizarTarefaHandler] Erro na orquestração:", error);
      return { 
        sucesso: false,
        mensagem: error instanceof Error ? error.message : "Erro na orquestração dos dados ao atualizar tarefa." 
      };
    }
  }
}