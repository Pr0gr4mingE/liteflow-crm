import { ClientePfRepository } from "../repositories/cliente-pf.repository";
import { ListarClientesPfUseCase } from "../use-cases/criar-cliente-pf.use-case";
import { ListarClientesPfHandler } from "../handlers/criar-cliente-pf.handler";

export const makeListarClientesPfHandler = (): ListarClientesPfHandler => {
  const repository = new ClientePfRepository();
  const useCase = new ListarClientesPfUseCase(repository);
  return new ListarClientesPfHandler(useCase);
};