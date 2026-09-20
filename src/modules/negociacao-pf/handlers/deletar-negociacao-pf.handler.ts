import { DeletarNegociacaoPfUseCase } from "@/modules/negociacao-pf/use-cases/deletar-negociacao-pf.use-case";

export class DeletarNegociacaoPfHandler {
  constructor(private readonly deletarNegociacaoPfUseCase: DeletarNegociacaoPfUseCase) {}

  async handle(id: string) {
    try {
      if (!id) {
        return { sucesso: false, mensagem: "ID da negociação é obrigatório." };
      }

      await this.deletarNegociacaoPfUseCase.execute(id);

      return { sucesso: true, mensagem: "Negociação deletada com sucesso." };
    } catch (error: unknown) {
      console.error("[DeletarNegociacaoPfHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao deletar negociação PF." };
    }
  }
}