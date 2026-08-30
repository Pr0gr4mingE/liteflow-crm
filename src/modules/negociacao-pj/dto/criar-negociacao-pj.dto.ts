import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

export type CriarNegociacaoPjDTO = Omit<
  NegociacaoPj, 
  "id" | "dataCriacao" | "dataAtualizacao"
>;