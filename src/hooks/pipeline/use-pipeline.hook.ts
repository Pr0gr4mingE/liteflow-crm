import { useState, useMemo } from "react";
import { usePipelineNegociacoes } from "./use-pipeline-negociacao.hook";
import { KanbanColumnProps } from "@/shared/types/ui/kanban/kanban-column.props";
import { KanbanCardProps } from "@/shared/types/ui/kanban/kanban-card.props";
import { FASES_PF, FASES_PJ } from "@/shared/utils/constantes/pipeline-fases";

export type TipoFunil = "PF" | "PJ";

export function usePipeline() {
  const [tipoFunil, setTipoFunil] = useState<TipoFunil>("PF");
  
  const { negociacoes, isLoading, erro, refetch } = usePipelineNegociacoes();

  const colunasDaPipeline = useMemo<KanbanColumnProps[]>(() => {
    const negociacoesDoFunil = negociacoes.filter(n => n.tipo === tipoFunil);
    const fasesDoModelo = tipoFunil === "PF" ? FASES_PF : FASES_PJ;

    return fasesDoModelo.map(fase => {
      const negociacoesDaFase = negociacoesDoFunil.filter(n => n.fase === fase.id);

      const cards: KanbanCardProps[] = negociacoesDaFase.map(n => ({
        id: n.id,
        titulo: n.titulo,
        subtitulo: n.dataPrevisaoFechamento ? `Previsão: ${n.dataPrevisaoFechamento}` : undefined,
        valorFormatado: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n.valor),
        corDestaque: (fase.id === "DESISTENCIA" || fase.id === "INDEFERIDO") ? "vermelho" : 
                     (fase.id === "CONVERSAO" || fase.id === "FECHADO") ? "verde" : "azul",
      }));

      return {
        id: fase.id,
        titulo: fase.titulo,
        corDoCabecalho: fase.tailwindClass, // <-- Consumindo da nova constante
        cards
      };
    });
  }, [negociacoes, tipoFunil]);

  return {
    tipoFunil,
    setTipoFunil,
    colunasDaPipeline,
    carregandoPipeline: isLoading,
    erro,
    refetch,
    negociacoes
  };
}