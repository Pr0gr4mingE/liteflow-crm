import { IUsuarioRepository } from "../repositories/IUsuario.repository";
import { Usuario } from "@/shared/types/domain/agentes/IUsuario";

export class BuscarUsuarioPorIdUseCase {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  // Omitimos a 'senha' do tipo de retorno por segurança
  async execute(id: string): Promise<Omit<Usuario, "senha"> | null> {
    const usuario = await this.usuarioRepository.buscarPorId(id);
    
    if (!usuario) {
      return null;
    }

    // Desestruturação para separar a senha do resto dos dados
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...usuarioSeguro } = usuario;
    
    return usuarioSeguro;
  }
}