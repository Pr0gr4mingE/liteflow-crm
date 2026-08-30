import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";

export type CriarNegociacaoPfDTO = Omit<
  NegociacaoPf, 
  "id" | "dataCriacao" | "dataAtualizacao"
>;