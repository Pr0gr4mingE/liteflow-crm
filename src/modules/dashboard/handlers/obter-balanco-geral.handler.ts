// src/application/dashboard/handlers/obter-balanco-geral.handler.ts
import { ObterBalancoGeralUseCase } from "../use-cases/obter-balanco-geral.use-case";
import { ObterBalancoGeralDTO } from "../dto/obter-balanco-geral.dto";
import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type";

export class ObterBalancoGeralHandler {
  constructor(private readonly obterBalancoGeralUseCase: ObterBalancoGeralUseCase) {}

  async handle(usuarioId: string, tipo: string = "TODOS"): Promise<BalancoGeralResponse> {
    try {
      if (!usuarioId) {
        throw new Error("ID do usuário não fornecido.");
      }

      // Garante que o tipo seja estritamente o esperado pelo DTO
      const tipoMapeado = ["PF", "PJ"].includes(tipo.toUpperCase()) 
        ? tipo.toUpperCase() as "PF" | "PJ" 
        : "TODOS";

      const dto: ObterBalancoGeralDTO = {
        usuarioId,
        tipo: tipoMapeado,
      };

      return await this.obterBalancoGeralUseCase.execute(dto);
      
    } catch (error: unknown) {
      console.error("[ObterBalancoGeralHandler] Erro na orquestração:", error);
      throw new Error("Erro na orquestração dos dados do dashboard.");
    }
  }
}