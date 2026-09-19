import { ClientePfRepository } from "../repositories/cliente-pf.repository";
import { AtualizarClientePfUseCase } from "../use-cases/atualizar-cliente-pf.use-case";
import { AtualizarClientePfHandler } from "../handlers/atualizar-cliente-pf.handler";

export const makeAtualizarClientePfHandler = () => {
  const repository = new ClientePfRepository();
  const useCase = new AtualizarClientePfUseCase(repository);
  return new AtualizarClientePfHandler(useCase);
};