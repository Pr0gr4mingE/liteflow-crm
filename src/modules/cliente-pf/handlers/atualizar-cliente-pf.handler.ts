import { capitalizarTexto } from "@/shared/utils/formatacao/capitalizar-texto.util";
import { limparEmail } from "@/shared/utils/formatacao/limpar-email.util";
import { apenasNumeros } from "@/shared/utils/formatacao/apenas-numeros.util";
import { CriarClientePfDTO } from "../dto/criar-cliente-pf.dto";
import { AtualizarClientePfUseCase } from "../use-cases/atualizar-cliente-pf.use-case";

export class AtualizarClientePfHandler {
  constructor(private readonly atualizarClientePfUseCase: AtualizarClientePfUseCase) {}

  async handle(id: string, dadosEntrada: Partial<CriarClientePfDTO>) {
    try {
      const dadosFormatados: Partial<CriarClientePfDTO> = { ...dadosEntrada };

      if (dadosEntrada.nome) dadosFormatados.nome = capitalizarTexto(dadosEntrada.nome);
      if (dadosEntrada.email) dadosFormatados.email = limparEmail(dadosEntrada.email);
      if (dadosEntrada.cpf) dadosFormatados.cpf = apenasNumeros(dadosEntrada.cpf);
      if (dadosEntrada.telefone) dadosFormatados.telefone = apenasNumeros(dadosEntrada.telefone);

      await this.atualizarClientePfUseCase.executar(id, dadosFormatados);

      return { sucesso: true, mensagem: "Cliente PF atualizado com sucesso." };
    } catch (error: unknown) {
      console.error("[AtualizarClientePfHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao atualizar cliente PF." };
    }
  }
}