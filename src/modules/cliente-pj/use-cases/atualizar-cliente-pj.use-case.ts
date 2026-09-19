import { IClientePjRepository } from "@/modules/cliente-pj/repositories/ICliente-pj.repository";
import { CriarClientePjDTO } from "@/modules/cliente-pj/dto/criar-cliente-pj.dto";

export class AtualizarClientePjUseCase {
  constructor(private clientePjRepository: IClientePjRepository) {}

  async executar(id: string, dados: Partial<CriarClientePjDTO>): Promise<void> {
    const cliente = await this.clientePjRepository.buscarPorId(id);
    
    if (!cliente) {
      throw new Error("Cliente Pessoa Jurídica não encontrado.");
    }

    await this.clientePjRepository.atualizar(id, dados);
  }
}