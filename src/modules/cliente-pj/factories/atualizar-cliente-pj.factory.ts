import { ClientePjRepository } from "../repositories/cliente-pj.repository";
import { AtualizarClientePjUseCase } from "../use-cases/atualizar-cliente-pj.use-case";
import { AtualizarClientePjHandler } from "../handlers/atualizar-cliente-pj.handler";

export const makeAtualizarClientePjHandler = () => {
  const repository = new ClientePjRepository();
  const useCase = new AtualizarClientePjUseCase(repository);
  return new AtualizarClientePjHandler(useCase);
};