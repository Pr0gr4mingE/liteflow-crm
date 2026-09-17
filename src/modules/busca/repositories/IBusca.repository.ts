import { ResultadoBuscaDTO } from "../dto/resultado-busca.dto";

export interface IBuscaRepository {
  buscarGeral(termo: string, usuarioId: string): Promise<ResultadoBuscaDTO[]>;
}