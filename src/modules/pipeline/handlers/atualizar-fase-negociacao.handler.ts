import { AtualizarFaseNegociacaoUseCase } from "../use-cases/atualizar-fase-negociacao.use-case";

  export class AtualizarFaseNegociacaoHandler {
    constructor(private readonly useCase: AtualizarFaseNegociacaoUseCase) {}

    async handle(dados: { id: string; novaFase: string; tipo: "PF" | "PJ" }) {
      try {
        if (!dados.id) {
          return { sucesso: false, mensagem: "Falha na atualização: O ID da negociação é obrigatório." };
        }
        
        if (!dados.novaFase) {
          return { sucesso: false, mensagem: "Falha na atualização: A fase de destino (novaFase) não foi informada." };
        }

        if (!dados.tipo || !["PF", "PJ"].includes(dados.tipo)) {
          return { sucesso: false, mensagem: `Falha na atualização: Tipo de funil inválido ('${dados.tipo}'). Esperado 'PF' ou 'PJ'.` };
        }

        await this.useCase.execute(dados.id, dados.novaFase, dados.tipo);

        return { sucesso: true, mensagem: "Fase da negociação atualizada com sucesso." };
      } catch (error: unknown) {
        console.error("[Handler Error] Erro ao atualizar fase da negociação:", error);
        return { 
          sucesso: false, 
          mensagem: "Erro inesperado ao tentar salvar a nova fase da negociação no banco de dados." 
        };
      }
    }
  }