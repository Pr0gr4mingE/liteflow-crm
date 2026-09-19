import { TarefaRepository } from "../repositories/tarefa.repository";
import { AtualizarTarefaUseCase } from "../use-cases/atualizar-tarefa.use-case";
import { AtualizarTarefaHandler } from "../handlers/atualizar-tarefa.handler";

export const makeAtualizarTarefaHandler = () => {
  const repository = new TarefaRepository();
  const useCase = new AtualizarTarefaUseCase(repository);
  return new AtualizarTarefaHandler(useCase);
};