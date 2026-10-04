import {NegociacaoPj} from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj"

export type NegociacaoPjFormdata = Pick<NegociacaoPj,
  | "titulo"
  | "descricao"
  | "valor"
  | "fase"
  | "dataPrevisaoFechamento"
>;
