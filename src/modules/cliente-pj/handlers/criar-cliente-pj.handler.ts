import { capitalizarTexto } from "@/shared/utils/formatacao/capitalizar-texto.util";
import { limparEmail } from "@/shared/utils/formatacao/limpar-email.util";
import { apenasNumeros } from "@/shared/utils/formatacao/apenas-numeros.util";
import { CriarClientePjDTO } from "../dto/criar-cliente-pj.dto";
import { RespostaClientePjDTO } from "../dto/resposta-cliente-pj.dto";
import { CriarClientePjUseCase,ListarClientesPjUseCase } from "../use-cases/criar-cliente-pj.use-case";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";

export class ListarClientesPjHandler {
  constructor(private readonly listarClientesPjUseCase: ListarClientesPjUseCase) {}

  async handle(usuarioId: string): Promise<ClientePj[]> {
    try {
      return await this.listarClientesPjUseCase.execute(usuarioId);
    } catch (error) {
      console.error("[ListarClientesPjHandler] Erro:", error);
      return [];
    }
  }
}

export class CriarClientePjHandler {
  constructor(private readonly criarClientePjUseCase: CriarClientePjUseCase) {}

  async handle(dadosEntrada: CriarClientePjDTO): Promise<RespostaClientePjDTO> {
    try {
      const dadosFormatados: CriarClientePjDTO = {
        ...dadosEntrada,
        razaoSocial: capitalizarTexto(dadosEntrada.razaoSocial),
        nomeFantasia: capitalizarTexto(dadosEntrada.nomeFantasia),
        email: limparEmail(dadosEntrada.email),
        cnpj: apenasNumeros(dadosEntrada.cnpj),
        telefone: apenasNumeros(dadosEntrada.telefone),
        usuarioResponsavelId:(dadosEntrada.usuarioResponsavelId)
      };

      return await this.criarClientePjUseCase.execute(dadosFormatados);

    } catch (error: unknown) {
      console.error("[CriarClientePjHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao criar cliente PJ." };
    }
  }
}