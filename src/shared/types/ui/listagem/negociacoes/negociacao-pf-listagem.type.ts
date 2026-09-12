import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";

export type NegociacaoPfListagem = NegociacaoPf & {
  cliente?: { nome: string };
};

