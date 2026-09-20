import { INegociacaoPfRepository } from "@/modules/negociacao-pf/repositories/INegociacao-pf.repository";

export class DeletarNegociacaoPfUseCase {
  constructor(private readonly negociacaoPfRepository: INegociacaoPfRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      const deletou = await this.negociacaoPfRepository.deletar(id);
      
      if (!deletou) {
        throw new Error("Negociação não encontrada para exclusão.");
      }
      
      return true;
    } catch (error) {
      console.error("[DeletarNegociacaoPfUseCase] Falha ao deletar:", error);
      throw new Error("Não foi possível excluir a negociação no momento.");
    }
  }
}