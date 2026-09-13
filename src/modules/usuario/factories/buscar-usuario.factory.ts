import { UsuarioRepository } from "../repositories/usuario.repository";
import { BuscarUsuarioPorIdUseCase } from "../use-cases/buscar-usuario.use-case";
import { BuscarUsuarioPorIdHandler } from "../handlers/buscar-usuario.handler";

export const makeBuscarUsuarioPorIdHandler = (): BuscarUsuarioPorIdHandler => {
  const repository = new UsuarioRepository();
  const useCase = new BuscarUsuarioPorIdUseCase(repository);
  return new BuscarUsuarioPorIdHandler(useCase);
};