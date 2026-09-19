import { INegociacaoPfRepository } from "@/modules/negociacao-pf/repositories/INegociacao-pf.repository";
import { CriarNegociacaoPfDTO } from "@/modules/negociacao-pf/dto/criar-negociacao-pf.dto";

export class AtualizarNegociacaoPfUseCase {
  constructor(private negociacaoPfRepository: INegociacaoPfRepository) {}

  async executar(id: string, dados: Partial<CriarNegociacaoPfDTO>): Promise<void> {
    const negociacao = await this.negociacaoPfRepository.buscarPorId(id);
    
    if (!negociacao) {
      throw new Error("Negociação PF não encontrada.");
    }

    const hoje = new Date();
    if (negociacao.dataPrevisaoFechamento && new Date(negociacao.dataPrevisaoFechamento) < hoje) {
      throw new Error("Não é possível editar uma negociação que já passou da data de previsão de fechamento.");
    }

    await this.negociacaoPfRepository.atualizar(id, dados);
  }
}