import { CriarNegociacaoPfDTO } from "../dto/criar-negociacao-pf.dto";
import { AtualizarNegociacaoPfUseCase } from "../use-cases/atualizar-negociacao-pf.use-case";

export class AtualizarNegociacaoPfHandler {
  constructor(private readonly atualizarNegociacaoPfUseCase: AtualizarNegociacaoPfUseCase) {}

  async handle(id: string, dadosEntrada: Partial<CriarNegociacaoPfDTO>) {
    try {
      await this.atualizarNegociacaoPfUseCase.executar(id, dadosEntrada);
      return { sucesso: true, mensagem: "Negociação PF atualizada com sucesso." };
    } catch (error: unknown) {
      console.error("[AtualizarNegociacaoPfHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao atualizar negociação PF." };
    }
  }
}