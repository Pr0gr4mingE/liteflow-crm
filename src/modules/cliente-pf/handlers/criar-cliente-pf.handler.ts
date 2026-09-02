import { capitalizarTexto } from "@/shared/utils/formatacao/capitalizar-texto.util";
import { limparEmail } from "@/shared/utils/formatacao/limpar-email.util";
import { apenasNumeros } from "@/shared/utils/formatacao/apenas-numeros.util";
import { CriarClientePfDTO } from "../dto/criar-cliente-pf.dto";
import { RespostaClientePfDTO } from "../dto/resposta-cliente-pf.dto";
import { CriarClientePfUseCase } from "../use-cases/criar-cliente-pf.use-case";

export class CriarClientePfHandler {
  constructor(private readonly criarClientePfUseCase: CriarClientePfUseCase) {}

  async handle(dadosEntrada: CriarClientePfDTO): Promise<RespostaClientePfDTO> {
    try {
      const dadosFormatados: CriarClientePfDTO = {
        ...dadosEntrada,
        nome: capitalizarTexto(dadosEntrada.nome),
        email: limparEmail(dadosEntrada.email),
        cpf: apenasNumeros(dadosEntrada.cpf),
        telefone: apenasNumeros(dadosEntrada.telefone),
        usuarioResponsavelId: (dadosEntrada.usuarioResponsavelId)
      };

      return await this.criarClientePfUseCase.execute(dadosFormatados);

    } catch (error: unknown) {
      console.error("[CriarClientePfHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao criar cliente PF." };
    }
  }
}