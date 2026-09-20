import { ClientePfRepository } from "@/modules/cliente-pf/repositories/cliente-pf.repository";
import { DeletarClientePfUseCase } from "@/modules/cliente-pf/use-cases/deletar-cliente-pf.use-case";
import { DeletarClientePfHandler } from "@/modules/cliente-pf/handlers/deletar-cliente-pf.handler";

export function makeDeletarClientePfHandler(): DeletarClientePfHandler {
  const repository = new ClientePfRepository();
  const useCase = new DeletarClientePfUseCase(repository);
  return new DeletarClientePfHandler(useCase);
}