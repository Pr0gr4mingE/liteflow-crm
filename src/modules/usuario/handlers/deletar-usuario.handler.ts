import { DeletarContaUseCase } from "../use-cases/deletar-usuario.use-case";
import { IRespostaDTO } from "@/shared/utils/dto/IResposta-padrao.dto"; // Ajuste o path se necessário

export class DeletarContaHandler {
  constructor(private deletarContaUseCase: DeletarContaUseCase) {}

  async handle(usuarioId: string): Promise<IRespostaDTO> {
    if (!usuarioId) {
      return { sucesso: false, mensagem: "O ID do utilizador é obrigatório." };
    }

    try {
      await this.deletarContaUseCase.executar(usuarioId);
      return { sucesso: true, mensagem: "Conta e ativos eliminados com sucesso." };
      
    } catch (error: unknown) {
      console.error("[DeletarContaHandler] Erro:", error);
      
      if (error instanceof Error) {
        return { sucesso: false, mensagem: error.message };
      }

      return { sucesso: false, mensagem: "Falha interna ao eliminar a conta." };
    }
  }
}