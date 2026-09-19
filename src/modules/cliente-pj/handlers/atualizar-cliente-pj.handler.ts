import { capitalizarTexto } from "@/shared/utils/formatacao/capitalizar-texto.util";
import { limparEmail } from "@/shared/utils/formatacao/limpar-email.util";
import { apenasNumeros } from "@/shared/utils/formatacao/apenas-numeros.util";
import { CriarClientePjDTO } from "../dto/criar-cliente-pj.dto";
import { AtualizarClientePjUseCase } from "../use-cases/atualizar-cliente-pj.use-case";

export class AtualizarClientePjHandler {
  constructor(private readonly atualizarClientePjUseCase: AtualizarClientePjUseCase) {}

  async handle(id: string, dadosEntrada: Partial<CriarClientePjDTO>) {
    try {
      const dadosFormatados: Partial<CriarClientePjDTO> = { ...dadosEntrada };

      if (dadosEntrada.razaoSocial) dadosFormatados.razaoSocial = capitalizarTexto(dadosEntrada.razaoSocial);
      if (dadosEntrada.nomeFantasia) dadosFormatados.nomeFantasia = capitalizarTexto(dadosEntrada.nomeFantasia);
      if (dadosEntrada.email) dadosFormatados.email = limparEmail(dadosEntrada.email);
      if (dadosEntrada.cnpj) dadosFormatados.cnpj = apenasNumeros(dadosEntrada.cnpj);
      if (dadosEntrada.telefone) dadosFormatados.telefone = apenasNumeros(dadosEntrada.telefone);

      await this.atualizarClientePjUseCase.executar(id, dadosFormatados);

      return { sucesso: true, mensagem: "Cliente PJ atualizado com sucesso." };
    } catch (error: unknown) {
      console.error("[AtualizarClientePjHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao atualizar cliente PJ." };
    }
  }
}