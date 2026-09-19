import { INegociacaoPjRepository } from "@/modules/negociacao-pj/repositories/INegociacao-pj.repository";
import { CriarNegociacaoPjDTO } from "@/modules/negociacao-pj/dto/criar-negociacao-pj.dto";

export class AtualizarNegociacaoPjUseCase {
  constructor(private negociacaoPjRepository: INegociacaoPjRepository) {}

  async executar(id: string, dados: Partial<CriarNegociacaoPjDTO>): Promise<void> {
    const negociacao = await this.negociacaoPjRepository.buscarPorId(id);
    
    if (!negociacao) {
      throw new Error("Negociação PJ não encontrada.");
    }

    const hoje = new Date();
    if (negociacao.dataPrevisaoFechamento && new Date(negociacao.dataPrevisaoFechamento) < hoje) {
      throw new Error("Não é possível editar uma negociação que já passou da data de previsão de fechamento.");
    }

    await this.negociacaoPjRepository.atualizar(id, dados);
  }
}