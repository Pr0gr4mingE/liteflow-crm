import { DeletarClientePfUseCase } from "@/modules/cliente-pf/use-cases/deletar-cliente-pf.use-case";

export class DeletarClientePfHandler {
  constructor(private readonly deletarClientePfUseCase: DeletarClientePfUseCase) {}

  async handle(id: string) {
    try {
      if (!id) {
        return { sucesso: false, mensagem: "ID do cliente é obrigatório." };
      }

      await this.deletarClientePfUseCase.execute(id);

      return { sucesso: true, mensagem: "Cliente deletado com sucesso." };
    } catch (error: unknown) {
      console.error("[DeletarClientePfHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao deletar cliente PF." };
    }
  }
}