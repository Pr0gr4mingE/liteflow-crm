import { capitalizarTexto } from "@/shared/utils/formatacao/capitalizar-texto.util";
import { CriarNegociacaoPfDTO } from "../dto/criar-negociacao-pf.dto";
import { RespostaNegociacaoPfDTO } from "../dto/resposta-negociacao-pf.dto";
import { CriarNegociacaoPfUseCase } from "../use-cases/criar-negociacao-pf.use-case";
import { rehidratarData } from "@/shared/utils/formatacao/rehidratar-data.util";

export class CriarNegociacaoPfHandler {
  constructor(private readonly criarNegociacaoPfUseCase: CriarNegociacaoPfUseCase) {}

  async handle(dadosEntrada: CriarNegociacaoPfDTO): Promise<RespostaNegociacaoPfDTO> {
    try {
      const dadosFormatados: CriarNegociacaoPfDTO = {
        ...dadosEntrada,
        titulo: capitalizarTexto(dadosEntrada.titulo),
        dataPrevisaoFechamento: rehidratarData(dadosEntrada.dataPrevisaoFechamento),
      };

      return await this.criarNegociacaoPfUseCase.execute(dadosFormatados);

    } catch (error: unknown) {
      console.error("[CriarNegociacaoPfHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao criar negociação PF." };
    }
  }
}