import { ClientePjRepository } from "@/modules/cliente-pj/repositories/cliente-pj.repository";
import { DeletarClientePjUseCase } from "@/modules/cliente-pj/use-cases/deletar-cliente-pj.use-case";
import { DeletarClientePjHandler } from "@/modules/cliente-pj/handlers/deletar-cliente-pj.handler";

export function makeDeletarClientePjHandler(): DeletarClientePjHandler {
  const repository = new ClientePjRepository();
  const useCase = new DeletarClientePjUseCase(repository);
  return new DeletarClientePjHandler(useCase);
}