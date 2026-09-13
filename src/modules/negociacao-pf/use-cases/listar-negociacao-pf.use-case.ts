import { INegociacaoPfRepository } from "../repositories/INegociacao-pf.repository";
import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";

export class ListarNegociacoesPfUseCase {
  constructor(private readonly negociacaoPfRepository: INegociacaoPfRepository) {}

  async execute(usuarioId: string): Promise<NegociacaoPf[]> {
    return await this.negociacaoPfRepository.listarPorUsuarioId(usuarioId);
  }
}