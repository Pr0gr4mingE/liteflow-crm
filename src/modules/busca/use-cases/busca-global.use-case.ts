import { IBuscaRepository } from "../repositories/IBusca.repository";
import { ResultadoBuscaDTO } from "../dto/resultado-busca.dto";

export class BuscaGlobalUseCase {
  constructor(private readonly buscaRepository: IBuscaRepository) {}

  async execute(termo: string, usuarioId: string): Promise<ResultadoBuscaDTO[]> {
    // 1. Regra de Negócio: Não permite buscas vazias ou com apenas 1 caractere
    // Isso evita sobrecarregar o banco com resultados gigantescos
    if (!termo || termo.trim().length < 2) {
      return [];
    }

    // 2. Regra de Segurança: Garante que um usuário foi identificado
    if (!usuarioId) {
      return [];
    }

    // 3. Execução: Delega a complexidade das consultas simultâneas ao repositório
    return await this.buscaRepository.buscarGeral(termo.trim(), usuarioId);
  }
}