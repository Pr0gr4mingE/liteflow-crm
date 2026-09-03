import { ClientePfRepository } from "../repositories/cliente-pf.repository";
import { CriarClientePfUseCase,ListarClientesPfUseCase } from "../use-cases/criar-cliente-pf.use-case";
import { CriarClientePfHandler, ListarClientesPfHandler } from "../handlers/criar-cliente-pf.handler";

export const makeListarClientesPfHandler = (): ListarClientesPfHandler => {
  const repository = new ClientePfRepository();
  const useCase = new ListarClientesPfUseCase(repository);
  return new ListarClientesPfHandler(useCase);
};

export const makeCriarClientePfHandler = (): CriarClientePfHandler => {
  const repository = new ClientePfRepository();
  const useCase = new CriarClientePfUseCase(repository);
  return new CriarClientePfHandler(useCase);
};