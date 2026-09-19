import { CriarNegociacaoPjDTO } from "../dto/criar-negociacao-pj.dto";
import { AtualizarNegociacaoPjUseCase } from "../use-cases/atualizar-negociacao-pj.use-case";

export class AtualizarNegociacaoPjHandler {
  constructor(private readonly atualizarNegociacaoPjUseCase: AtualizarNegociacaoPjUseCase) {}

  async handle(id: string, dadosEntrada: Partial<CriarNegociacaoPjDTO>) {
    try {
      await this.atualizarNegociacaoPjUseCase.executar(id, dadosEntrada);
      return { sucesso: true, mensagem: "Negociação PJ atualizada com sucesso." };
    } catch (error: unknown) {
      console.error("[AtualizarNegociacaoPjHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao atualizar negociação PJ." };
    }
  }
}