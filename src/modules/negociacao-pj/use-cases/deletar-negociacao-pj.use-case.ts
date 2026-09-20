import { INegociacaoPjRepository } from "@/modules/negociacao-pj/repositories/INegociacao-pj.repository";

export class DeletarNegociacaoPjUseCase {
  constructor(private readonly negociacaoPjRepository: INegociacaoPjRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      const deletou = await this.negociacaoPjRepository.deletar(id);
      
      if (!deletou) {
        throw new Error("Negociação corporativa não encontrada para exclusão.");
      }
      
      return true;
    } catch (error) {
      console.error("[DeletarNegociacaoPjUseCase] Falha ao deletar:", error);
      throw new Error("Não foi possível excluir a negociação corporativa no momento.");
    }
  }
}