import { ClientePjRepository } from "../repositories/cliente-pj.repository";
import { CriarClientePjUseCase, ListarClientesPjUseCase } from "../use-cases/criar-cliente-pj.use-case";
import { CriarClientePjHandler, ListarClientesPjHandler } from "../handlers/criar-cliente-pj.handler";

export const makeListarClientesPjHandler = (): ListarClientesPjHandler => {
  const repository = new ClientePjRepository();
  const useCase = new ListarClientesPjUseCase(repository);
  return new ListarClientesPjHandler(useCase);
};

export const makeCriarClientePjHandler = (): CriarClientePjHandler => {
  const repository = new ClientePjRepository();
  const useCase = new CriarClientePjUseCase(repository);
  return new CriarClientePjHandler(useCase);
};