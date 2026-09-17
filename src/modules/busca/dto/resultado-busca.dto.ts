import { TipoEntidadeBusca } from "@/shared/utils/types/tipo-entidade-busca.util";

export interface ResultadoBuscaDTO {
  id: string;
  tipo: TipoEntidadeBusca;
  titulo: string;       // Ex: "Maria Silva" ou "Ligar para Maria"
  subtitulo: string;    // Ex: "maria@email.com" ou "Vencimento: Amanhã"
  url: string;          // Para onde o usuário vai ao clicar
}