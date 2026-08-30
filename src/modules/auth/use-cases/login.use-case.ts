import { IUsuarioRepository } from "@/modules/usuario/repositories/IUsuario.repository";
import { CriarLoginDTO } from "../dto/criar-login.dto";
import { RespostaUsuarioDTO } from "@/modules/usuario/dto/resposta-usuario.dto"; 
import { Usuario } from "@/shared/types/domain/agentes/IUsuario";

export class LoginUseCase {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async execute(dados: CriarLoginDTO): Promise<RespostaUsuarioDTO> {
    try {
      const usuario = await this.usuarioRepository.buscarPorEmail(dados.email);

      if (!usuario) {
        return { sucesso: false, mensagem: "Credenciais inválidas." };
      }

      const senhaBate = dados.senha === usuario.senha;
      
      if (!senhaBate) {
        return { sucesso: false, mensagem: "Credenciais inválidas." };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha: _, ...usuarioLimpo } = usuario;

      return {
        sucesso: true,
        mensagem: "Login realizado com sucesso!",
        dados: usuarioLimpo as Usuario, 
      };

    } catch (error: unknown) {
      console.error("[LoginUseCase] Erro:", error);
      return {
        sucesso: false,
        mensagem: error instanceof Error ? error.message : "Erro interno ao realizar o login.",
      };
    }
  }
}