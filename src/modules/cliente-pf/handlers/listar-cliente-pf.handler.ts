import { ListarClientesPfUseCase } from "../use-cases/listar-cliente-pf.use-case";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";

export class ListarClientesPfHandler {
  constructor(private readonly listarClientesPfUseCase: ListarClientesPfUseCase) {}

  async handle(usuarioId: string): Promise<ClientePf[]> {
    try {
      return await this.listarClientesPfUseCase.execute(usuarioId);
    } catch (error) {
      console.error("[ListarClientesPfHandler] Erro:", error);
      return [];
    }
  }
}