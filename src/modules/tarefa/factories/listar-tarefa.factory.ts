import { TarefaRepository } from "../repositories/tarefa.repository";
import { ListarTarefasUseCase } from "../use-cases/listar-tarefa.use-case"; // Ajuste o caminho conforme sua escolha acima
import { ListarTarefasHandler } from "../handlers/listar-tarefa.handler"; // Ajuste o caminho conforme sua escolha acima

export const makeListarTarefasHandler = (): ListarTarefasHandler => {
  const repository = new TarefaRepository();
  const useCase = new ListarTarefasUseCase(repository);
  return new ListarTarefasHandler(useCase);
};