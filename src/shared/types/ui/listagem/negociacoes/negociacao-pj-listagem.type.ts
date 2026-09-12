import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

export type NegociacaoPjListagem = NegociacaoPj & {
  cliente?: { nome: string };
};
