import { INegociacaoPjRepository } from "../repositories/INegociacao-pj.repository";
import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

export class ListarNegociacoesPjUseCase {
  constructor(private readonly negociacaoPfRepository: INegociacaoPjRepository) {}

  async execute(usuarioId: string): Promise<NegociacaoPj[]> {
    return await this.negociacaoPfRepository.listarPorUsuarioId(usuarioId);
  }
}
