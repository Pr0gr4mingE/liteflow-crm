import { UsuarioRepository } from "../repositories/usuario.repository";
import { AtualizarUsuarioUseCase } from "../use-cases/atualizar-usuario.use-case";
import { AtualizarUsuarioHandler } from "../handlers/atualizar-usuario.handler";

export const makeAtualizarUsuarioHandler = (): AtualizarUsuarioHandler => {
  const repository = new UsuarioRepository();
  const useCase = new AtualizarUsuarioUseCase(repository);
  return new AtualizarUsuarioHandler(useCase);
};