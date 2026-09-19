import { IClientePfRepository } from "@/modules/cliente-pf/repositories/ICliente-pf.repository";
import { CriarClientePfDTO } from "@/modules/cliente-pf/dto/criar-cliente-pf.dto";

export class AtualizarClientePfUseCase {
  constructor(private clientePfRepository: IClientePfRepository) {}

  async executar(id: string, dados: Partial<CriarClientePfDTO>): Promise<void> {
    const cliente = await this.clientePfRepository.buscarPorId(id);
    
    if (!cliente) {
      throw new Error("Cliente Pessoa Física não encontrado.");
    }

    await this.clientePfRepository.atualizar(id, dados);
  }
}