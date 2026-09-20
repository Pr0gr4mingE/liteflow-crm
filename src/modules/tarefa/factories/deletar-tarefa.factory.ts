import { TarefaRepository } from "@/modules/tarefa/repositories/tarefa.repository";
import { DeletarTarefaUseCase } from "@/modules/tarefa/use-cases/deletar-tarefa.use-case";
import { DeletarTarefaHandler } from "@/modules/tarefa/handlers/deletar-tarefa.handler";

export function makeDeletarTarefaHandler(): DeletarTarefaHandler {
  const repository = new TarefaRepository();
  const useCase = new DeletarTarefaUseCase(repository);
  return new DeletarTarefaHandler(useCase);
}