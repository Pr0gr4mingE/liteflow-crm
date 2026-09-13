import { ListarClientesPjUseCase } from "../use-cases/listar-cliente-pj.use-case";
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