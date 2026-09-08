import { FaseNegociacaoPf } from "@/shared/utils/types/fase-negociacao-pf.type";
import { FaseNegociacaoPj } from "@/shared/utils/types/fase-negociacao-pj.type";

export const LABEL_FASE_NEGOCIACAO_PF: Record<FaseNegociacaoPf, string> = {
  CAPTURA: "Captura",
  ENGAJAMENTO: "Engajamento",
  CONVERSAO: "Conversão",
  FIDELIZACAO: "Fidelização",
  DESISTENCIA: "Desistência",
};

export const LABEL_FASE_NEGOCIACAO_PJ: Record<FaseNegociacaoPj, string> = {
  LEAD: "Lead",
  CONTATO: "Contato",
  PROPOSTA: "Proposta",
  FECHADO: "Fechado",
  INDEFERIDO: "Indeferido",
};

export function obterLabelFaseNegociacao(
  fase: string,
  tipo: "PF" | "PJ"
): string {
  if (tipo === "PF") {
    return LABEL_FASE_NEGOCIACAO_PF[fase as FaseNegociacaoPf] ?? fase;
  }
  return LABEL_FASE_NEGOCIACAO_PJ[fase as FaseNegociacaoPj] ?? fase;
}
