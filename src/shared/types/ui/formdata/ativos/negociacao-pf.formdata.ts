import {NegociacaoPf} from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf"

export type NegociacaoPfFormdata = Pick<NegociacaoPf,
  | "titulo"
  | "descricao"
  | "valor"
  | "fase"
  | "dataPrevisaoFechamento"
>;