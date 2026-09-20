import { DeletarClientePjUseCase } from "@/modules/cliente-pj/use-cases/deletar-cliente-pj.use-case";

export class DeletarClientePjHandler {
  constructor(private readonly deletarClientePjUseCase: DeletarClientePjUseCase) {}

  async handle(id: string) {
    try {
      if (!id) {
        return { sucesso: false, mensagem: "ID da empresa é obrigatório." };
      }

      await this.deletarClientePjUseCase.execute(id);

      return { sucesso: true, mensagem: "Empresa deletada com sucesso." };
    } catch (error: unknown) {
      console.error("[DeletarClientePjHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao deletar cliente PJ." };
    }
  }
}