import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";
import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

export type NegociacaoPfListagem = NegociacaoPf & {
  cliente?: { nome: string };
};

export type NegociacaoPjListagem = NegociacaoPj & {
  cliente?: { nome: string };
};
