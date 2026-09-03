import { capitalizarTexto } from "@/shared/utils/formatacao/capitalizar-texto.util";
import { CriarNegociacaoPfDTO } from "../dto/criar-negociacao-pf.dto";
import { RespostaNegociacaoPfDTO } from "../dto/resposta-negociacao-pf.dto";
import { CriarNegociacaoPfUseCase,ListarNegociacoesPfUseCase } from "../use-cases/criar-negociacao-pf.use-case";
import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";

export class CriarNegociacaoPfHandler {
  constructor(private readonly criarNegociacaoPfUseCase: CriarNegociacaoPfUseCase) {}

  async handle(dadosEntrada: CriarNegociacaoPfDTO): Promise<RespostaNegociacaoPfDTO> {
    try {
      const dadosFormatados: CriarNegociacaoPfDTO = {
        ...dadosEntrada,
        titulo: capitalizarTexto(dadosEntrada.titulo),
      };

      return await this.criarNegociacaoPfUseCase.execute(dadosFormatados);

    } catch (error: unknown) {
      console.error("[CriarNegociacaoPfHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao criar negociação PF." };
    }
  }
}

export class ListarNegociacoesPfHandler {
  constructor(private readonly listarNegociacoesPfUseCase: ListarNegociacoesPfUseCase) {}

  async handle(usuarioId: string): Promise<NegociacaoPf[]> {
    try {
      return await this.listarNegociacoesPfUseCase.execute(usuarioId);
    } catch (error) {
      console.error("[ListarNegociacoesPfHandler] Erro:", error);
      return [];
    }
  }
}