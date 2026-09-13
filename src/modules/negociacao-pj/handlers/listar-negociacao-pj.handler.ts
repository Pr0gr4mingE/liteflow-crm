import { ListarNegociacoesPjUseCase } from "../use-cases/listar-negociacao-pj.use-case";
import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

export class ListarNegociacoesPjHandler {
  constructor(private readonly listarNegociacoesPfUseCase: ListarNegociacoesPjUseCase) {}

  async handle(usuarioId: string): Promise<NegociacaoPj[]> {
    try {
      return await this.listarNegociacoesPfUseCase.execute(usuarioId);
    } catch (error) {
      console.error("[ListarNegociacoesPfHandler] Erro:", error);
      return [];
    }
  }
}