import { IUsuarioRepository } from "../repositories/IUsuario.repository";
import { AtualizarUsuarioDTO } from "../dto/atualizar-usuario.dto";
import { Usuario } from "@/shared/types/domain/agentes/IUsuario";

export class AtualizarUsuarioUseCase {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async execute(id: string, dados: AtualizarUsuarioDTO): Promise<Omit<Usuario, "senha"> | null> {
    const usuarioExistente = await this.usuarioRepository.buscarPorId(id);
    
    if (!usuarioExistente) {
      return null;
    }

    const usuarioAtualizado = await this.usuarioRepository.atualizar(id, dados);
    
    // Novamente, blindando a senha para não vazar pro front
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...usuarioSeguro } = usuarioAtualizado;
    
    return usuarioSeguro;
  }
}