import { BuscarUsuarioPorIdUseCase } from "../use-cases/buscar-usuario.use-case";
import { Usuario } from "@/shared/types/domain/agentes/IUsuario";

// Define um tipo de resposta padronizado
export interface RespostaBuscarUsuarioDTO {
  sucesso: boolean;
  mensagem?: string;
  dados?: Omit<Usuario, "senha">;
}

export class BuscarUsuarioPorIdHandler {
  constructor(private readonly buscarUsuarioUseCase: BuscarUsuarioPorIdUseCase) {}

  async handle(id: string): Promise<RespostaBuscarUsuarioDTO> {
    try {
      if (!id) {
        return { sucesso: false, mensagem: "ID do usuário não fornecido." };
      }

      const usuario = await this.buscarUsuarioUseCase.execute(id);

      if (!usuario) {
        return { sucesso: false, mensagem: "Usuário não encontrado." };
      }

      return { sucesso: true, dados: usuario };
    } catch (error) {
      console.error("[BuscarUsuarioPorIdHandler] Erro:", error);
      return { sucesso: false, mensagem: "Erro interno ao buscar dados do usuário." };
    }
  }
}