import { IClientePfRepository } from "@/modules/cliente-pf/repositories/ICliente-pf.repository";

export class DeletarClientePfUseCase {
  constructor(private readonly clientePfRepository: IClientePfRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      const deletou = await this.clientePfRepository.deletar(id);
      
      if (!deletou) {
        throw new Error("Cliente Pessoa Física não encontrado para exclusão.");
      }
      
      return true;
    } catch (error) {
      console.error("[DeletarClientePfUseCase] Falha ao deletar:", error);
      throw new Error("Não foi possível excluir o cliente pessoa física no momento.");
    }
  }
}