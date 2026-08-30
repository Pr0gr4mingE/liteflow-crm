import { CriarClientePfDTO } from "../dto/criar-cliente-pf.dto";
import { RespostaClientePfDTO } from "../dto/resposta-cliente-pf.dto";
import { IClientePfRepository } from "../repositories/ICliente-pf.repository";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";
import { validarCpf } from "@/shared/utils/validacao/validar-cpf.util";

export class CriarClientePfUseCase {
  constructor(private readonly clientePfRepository: IClientePfRepository) {}

  async execute(dados: CriarClientePfDTO): Promise<RespostaClientePfDTO> {
    try {
      // REGRA DE NEGÓCIO: Validação matemática do CPF (Domain Rule)
      if (!validarCpf(dados.cpf)) {
        return { sucesso: false, mensagem: "O CPF informado é inválido." };
      }

      // REGRA DE ESTADO: Impede CPF duplicado no banco
      const cpfJaExiste = await this.clientePfRepository.buscarPorCpf(dados.cpf);
      if (cpfJaExiste) {
        return { sucesso: false, mensagem: "Já existe um cliente cadastrado com este CPF." };
      }

      // REGRA DE ESTADO: Impede E-mail duplicado no banco
      const emailJaExiste = await this.clientePfRepository.buscarPorEmail(dados.email);
      if (emailJaExiste) {
        return { sucesso: false, mensagem: "Já existe um cliente cadastrado com este e-mail." };
      }

      const clienteCriado = await this.clientePfRepository.salvar(dados);

      return {
        sucesso: true,
        mensagem: "Cliente Pessoa Física criado com sucesso!",
        dados: clienteCriado as ClientePf,
      };

    } catch (error: unknown) {
      console.error("[CriarClientePfUseCase] Erro:", error);
      return {
        sucesso: false,
        mensagem: error instanceof Error ? error.message : "Erro interno ao criar cliente PF.",
      };
    }
  }
}