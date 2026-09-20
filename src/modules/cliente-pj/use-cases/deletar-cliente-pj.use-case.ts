import { IClientePjRepository } from "@/modules/cliente-pj/repositories/ICliente-pj.repository";

export class DeletarClientePjUseCase {
  constructor(private readonly clientePjRepository: IClientePjRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      const deletou = await this.clientePjRepository.deletar(id);
      
      if (!deletou) {
        throw new Error("Empresa não encontrada para exclusão.");
      }
      
      return true;
    } catch (error) {
      console.error("[DeletarClientePjUseCase] Falha ao deletar:", error);
      throw new Error("Não foi possível excluir a empresa no momento.");
    }
  }
}