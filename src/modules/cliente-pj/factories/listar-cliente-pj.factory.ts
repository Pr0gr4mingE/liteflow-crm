import { ClientePjRepository } from "../repositories/cliente-pj.repository";
import { ListarClientesPjUseCase } from "../use-cases/criar-cliente-pj.use-case";
import { ListarClientesPjHandler } from "../handlers/criar-cliente-pj.handler";

export const makeListarClientesPjHandler = (): ListarClientesPjHandler => {
  const repository = new ClientePjRepository();
  const useCase = new ListarClientesPjUseCase(repository);
  return new ListarClientesPjHandler(useCase);
};
