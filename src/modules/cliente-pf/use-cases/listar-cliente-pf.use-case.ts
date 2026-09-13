import { IClientePfRepository } from "../repositories/ICliente-pf.repository";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";

export class ListarClientesPfUseCase {
  constructor(private readonly clientePfRepository: IClientePfRepository) {}

  async execute(usuarioId: string): Promise<ClientePf[]> {
    return await this.clientePfRepository.listarPorUsuarioId(usuarioId);
  }
}