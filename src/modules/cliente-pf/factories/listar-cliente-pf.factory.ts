import { ClientePfRepository } from "../repositories/cliente-pf.repository";
import { ListarClientesPfUseCase } from "../use-cases/listar-cliente-pf.use-case";
import { ListarClientesPfHandler } from "../handlers/listar-cliente-pf.handler";

export const makeListarClientesPfHandler = (): ListarClientesPfHandler => {
  const repository = new ClientePfRepository();
  const useCase = new ListarClientesPfUseCase(repository);
  return new ListarClientesPfHandler(useCase);
};