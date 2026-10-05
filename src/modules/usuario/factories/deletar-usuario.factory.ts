import { UsuarioRepository } from "../repositories/usuario.repository"; 
import { DeletarContaUseCase } from "../use-cases/deletar-usuario.use-case"; 
import { DeletarContaHandler } from "../handlers/deletar-usuario.handler"; 

export const makeDeletarContaHandler = (): DeletarContaHandler => {
  const usuarioRepository = new UsuarioRepository();
  const deletarContaUseCase = new DeletarContaUseCase(usuarioRepository);
  
  return new DeletarContaHandler(deletarContaUseCase);
};