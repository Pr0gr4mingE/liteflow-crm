import { IClientePjRepository } from "../repositories/ICliente-pj.repository";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";

export class ListarClientesPjUseCase {
  constructor(private readonly clientePjRepository: IClientePjRepository) {}

  async execute(usuarioId: string): Promise<ClientePj[]> {
    return await this.clientePjRepository.listarPorUsuarioId(usuarioId);
  }
}