import { capitalizarTexto } from "@/shared/utils/formatacao/capitalizar-texto.util";
import { CriarNegociacaoPjDTO } from "../dto/criar-negociacao-pj.dto";
import { RespostaNegociacaoPjDTO } from "../dto/resposta-negociacao-pj.dto";
import { CriarNegociacaoPjUseCase, ListarNegociacoesPjUseCase } from "../use-cases/criar-negociacao-pj.use-case";
import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

export class CriarNegociacaoPjHandler {
  constructor(private readonly criarNegociacaoPjUseCase: CriarNegociacaoPjUseCase) {}

  async handle(dadosEntrada: CriarNegociacaoPjDTO): Promise<RespostaNegociacaoPjDTO> {
    try {
      const dadosFormatados: CriarNegociacaoPjDTO = {
        ...dadosEntrada,
        titulo: capitalizarTexto(dadosEntrada.titulo),
      };

      return await this.criarNegociacaoPjUseCase.execute(dadosFormatados);

    } catch (error: unknown) {
      console.error("[CriarNegociacaoPjHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao criar negociação PJ." };
    }
  }
}

export class ListarNegociacoesPjHandler {
  constructor(private readonly listarNegociacoesPfUseCase: ListarNegociacoesPjUseCase) {}

  async handle(usuarioId: string): Promise<NegociacaoPj[]> {
    try {
      return await this.listarNegociacoesPfUseCase.execute(usuarioId);
    } catch (error) {
      console.error("[ListarNegociacoesPfHandler] Erro:", error);
      return [];
    }
  }
}