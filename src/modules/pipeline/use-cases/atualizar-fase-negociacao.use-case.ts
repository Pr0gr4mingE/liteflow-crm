import { INegociacaoPfRepository } from "@/modules/negociacao-pf/repositories/INegociacao-pf.repository";
import { INegociacaoPjRepository } from "@/modules/negociacao-pj/repositories/INegociacao-pj.repository";
import { FaseNegociacaoPf } from "@/shared/utils/types/fase-negociacao-pf.type";
import { FaseNegociacaoPj } from "@/shared/utils/types/fase-negociacao-pj.type";

export class AtualizarFaseNegociacaoUseCase {
  constructor(
    private readonly pfRepository: INegociacaoPfRepository,
    private readonly pjRepository: INegociacaoPjRepository
  ) {}

  async execute(id: string, novaFase: string, tipo: "PF" | "PJ"): Promise<void> {
    if (!id || !novaFase || !tipo) {
      throw new Error("Dados incompletos para atualizar a fase da negociação.");
    }

    if (tipo === "PF") {
      await this.pfRepository.atualizarFase(id, novaFase as FaseNegociacaoPf);
    } else {
      await this.pjRepository.atualizarFase(id, novaFase as FaseNegociacaoPj);
    }
  }
}