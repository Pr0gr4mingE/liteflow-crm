import { AtualizarUsuarioUseCase } from "../use-cases/atualizar-usuario.use-case";
import { AtualizarUsuarioDTO } from "../dto/atualizar-usuario.dto";
import { Usuario } from "@/shared/types/domain/agentes/IUsuario";

export interface RespostaAtualizarUsuarioDTO {
  sucesso: boolean;
  mensagem: string;
  dados?: Omit<Usuario, "senha">;
}

export class AtualizarUsuarioHandler {
  constructor(private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase) {}

  async handle(id: string, dados: AtualizarUsuarioDTO): Promise<RespostaAtualizarUsuarioDTO> {
    try {
      if (!id) {
        return { sucesso: false, mensagem: "ID do usuário não fornecido." };
      }

      // Evita bater no banco se não tiver nada pra atualizar
      if (Object.keys(dados).length === 0) {
        return { sucesso: false, mensagem: "Nenhum dado fornecido para atualização." };
      }

      const usuario = await this.atualizarUsuarioUseCase.execute(id, dados);

      if (!usuario) {
        return { sucesso: false, mensagem: "Usuário não encontrado." };
      }

      return { sucesso: true, mensagem: "Perfil atualizado com sucesso!", dados: usuario };
    } catch (error) {
      console.error("[AtualizarUsuarioHandler] Erro:", error);
      return { sucesso: false, mensagem: "Erro interno ao atualizar perfil." };
    }
  }
}