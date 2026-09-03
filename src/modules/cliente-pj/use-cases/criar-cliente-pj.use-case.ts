import { CriarClientePjDTO } from "../dto/criar-cliente-pj.dto";
import { RespostaClientePjDTO } from "../dto/resposta-cliente-pj.dto";
import { IClientePjRepository } from "../repositories/ICliente-pj.repository";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";
import { validarCnpj } from "@/shared/utils/validacao/validar-cnpj.util"; 

export class ListarClientesPjUseCase {
  constructor(private readonly clientePjRepository: IClientePjRepository) {}

  async execute(usuarioId: string): Promise<ClientePj[]> {
    return await this.clientePjRepository.listarPorUsuarioId(usuarioId);
  }
}

export class CriarClientePjUseCase {
  constructor(private readonly clientePjRepository: IClientePjRepository) {}

  async execute(dados: CriarClientePjDTO): Promise<RespostaClientePjDTO> {
    try {
      if (!validarCnpj(dados.cnpj)) {
        return { sucesso: false, mensagem: "O CNPJ informado é inválido." };
      }

      const cnpjJaExiste = await this.clientePjRepository.buscarPorCnpj(dados.cnpj);
      if (cnpjJaExiste) {
        return { sucesso: false, mensagem: "Já existe um cliente cadastrado com este CNPJ." };
      }

      const emailJaExiste = await this.clientePjRepository.buscarPorEmail(dados.email);
      if (emailJaExiste) {
        return { sucesso: false, mensagem: "Já existe um cliente cadastrado com este e-mail." };
      }

      const clienteCriado = await this.clientePjRepository.salvar(dados);

      return {
        sucesso: true,
        mensagem: "Cliente Pessoa Jurídica criado com sucesso!",
        dados: clienteCriado as ClientePj,
      };

    } catch (error: unknown) {
      console.error("[CriarClientePjUseCase] Erro:", error);
      return {
        sucesso: false,
        mensagem: error instanceof Error ? error.message : "Erro interno ao criar cliente PJ.",
      };
    }
  }
}