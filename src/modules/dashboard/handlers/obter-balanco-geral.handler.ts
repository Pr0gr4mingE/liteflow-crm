import { ObterBalancoGeralUseCase } from "../use-cases/obter-balanco-geral.use-case";
import { ObterBalancoGeralDTO } from "../dto/obter-balanco-geral.dto";
import { RespostaBalancoGeralDTO } from "../dto/resposta-balanco-geral.dto";

export class ObterBalancoGeralHandler {
  constructor(private readonly obterBalancoGeralUseCase: ObterBalancoGeralUseCase) {}

  async handle(usuarioId: string, tipo: string = "TODOS"): Promise<RespostaBalancoGeralDTO> {
    try {
      if (!usuarioId) {
        return { sucesso: false, mensagem: "ID do usuário não fornecido." };
      }

      // Garante que o tipo seja estritamente o esperado pelo DTO
      const tipoMapeado = ["PF", "PJ"].includes(tipo.toUpperCase()) 
        ? tipo.toUpperCase() as "PF" | "PJ" 
        : "TODOS";

      const dto: ObterBalancoGeralDTO = {
        usuarioId,
        tipo: tipoMapeado,
      };

      const dados = await this.obterBalancoGeralUseCase.execute(dto);
      
      return { 
        sucesso: true, 
        mensagem: "Dashboard carregado com sucesso.",
        dados 
      };
      
    } catch (error: unknown) {
      console.error("[ObterBalancoGeralHandler] Erro na orquestração:", error);
      return { 
        sucesso: false, 
        mensagem: "Erro interno ao orquestrar os dados do dashboard." 
      };
    }
  }
}