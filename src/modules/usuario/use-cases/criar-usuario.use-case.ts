import { CriarUsuarioDTO } from "../dto/criar-usuario.dto";
import { RespostaUsuarioDTO } from "../dto/resposta-usuario.dto";
import { IUsuarioRepository } from "../repositories/IUsuario.repository";
import { Usuario } from "@/shared/types/domain/agentes/IUsuario";
import { validarCpf } from "@/shared/utils/validacao/validar-cpf.util";

export class CriarUsuarioUseCase {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async execute(dados: CriarUsuarioDTO): Promise<RespostaUsuarioDTO> {
    try {
      if (!validarCpf(dados.cpf)) {
        return { sucesso: false, mensagem: "O CPF informado é inválido." };
      }

      const cpfJaExiste = await this.usuarioRepository.buscarPorCpf(dados.cpf);
      if (cpfJaExiste) {
        return { sucesso: false, mensagem: "Já existe um usuário cadastrado com este CPF." };
      }

      const emailJaExiste = await this.usuarioRepository.buscarPorEmail(dados.email);
      if (emailJaExiste) {
        return { sucesso: false, mensagem: "Já existe um usuário cadastrado com este e-mail." };
      }

      const usuarioCriado = await this.usuarioRepository.salvar(dados);

      return {
        sucesso: true,
        mensagem: "Usuário criado com sucesso!",
        dados: usuarioCriado as Usuario, 
      };

    } catch (error: unknown) {
      console.error("[CriarUsuarioUseCase] Erro:", error);
      return {
        sucesso: false,
        mensagem: error instanceof Error ? error.message : "Erro interno ao criar o usuário.",
      };
    }
  }
}