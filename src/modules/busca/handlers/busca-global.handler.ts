import { BuscaGlobalUseCase } from "../use-cases/busca-global.use-case";
import { RespostaBuscaGlobalDTO } from "../dto/resposta-busca-global.dto";

export class BuscaGlobalHandler {
  constructor(private readonly buscaGlobalUseCase: BuscaGlobalUseCase) {}

  async handle(termo: string, usuarioId: string): Promise<RespostaBuscaGlobalDTO> {
    try {
      if (!usuarioId) {
        return { sucesso: false, mensagem: "Usuário não autenticado." };
      }

      if (!termo || termo.trim().length < 2) {
        return { sucesso: true, mensagem: "Termo de busca muito curto.", dados: [] };
      }

      const resultados = await this.buscaGlobalUseCase.execute(termo, usuarioId);

      return { 
        sucesso: true, 
        mensagem: "Busca realizada com sucesso.", 
        dados: resultados 
      };
    } catch (error) {
      console.error("[BuscaGlobalHandler] Erro:", error);
      return { sucesso: false, mensagem: "Erro interno ao realizar a busca." };
    }
  }
}