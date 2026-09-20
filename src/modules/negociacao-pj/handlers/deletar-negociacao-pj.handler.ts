import { DeletarNegociacaoPjUseCase } from "@/modules/negociacao-pj/use-cases/deletar-negociacao-pj.use-case";

export class DeletarNegociacaoPjHandler {
  constructor(private readonly deletarNegociacaoPjUseCase: DeletarNegociacaoPjUseCase) {}

  async handle(id: string) {
    try {
      if (!id) {
        return { sucesso: false, mensagem: "ID da negociação corporativa é obrigatório." };
      }

      await this.deletarNegociacaoPjUseCase.execute(id);

      return { sucesso: true, mensagem: "Negociação corporativa deletada com sucesso." };
    } catch (error: unknown) {
      console.error("[DeletarNegociacaoPjHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao deletar negociação PJ." };
    }
  }
}