import { ListarNegociacoesPfUseCase } from "../use-cases/listar-negociacao-pf.use-case";
import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";

export class ListarNegociacoesPfHandler {
  constructor(private readonly listarNegociacoesPfUseCase: ListarNegociacoesPfUseCase) {}

  async handle(usuarioId: string): Promise<NegociacaoPf[]> {
    try {
      return await this.listarNegociacoesPfUseCase.execute(usuarioId);
    } catch (error) {
      console.error("[ListarNegociacoesPfHandler] Erro:", error);
      return [];
    }
  }
}