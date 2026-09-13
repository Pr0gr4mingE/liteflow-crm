import { ClientePjRepository } from "../repositories/cliente-pj.repository";
import { ListarClientesPjUseCase } from "../use-cases/listar-cliente-pj.use-case";
import { ListarClientesPjHandler } from "../handlers/listar-cliente-pj.handler";

export const makeListarClientesPjHandler = (): ListarClientesPjHandler => {
  const repository = new ClientePjRepository();
  const useCase = new ListarClientesPjUseCase(repository);
  return new ListarClientesPjHandler(useCase);
};
