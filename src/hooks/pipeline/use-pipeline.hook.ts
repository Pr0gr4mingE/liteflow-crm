"use client";

import { useState, useMemo } from "react";
// Importa o hook de fetch puro que criamos antes
import { usePipelineNegociacoes } from "./use-pipeline-negociacao.hook";
import { KanbanColumnProps } from "@/shared/types/ui/kanban/kanban-column.props";
import { KanbanCardProps } from "@/shared/types/ui/kanban/kanban-card.props";

export type TipoFunil = "PF" | "PJ";

// Estas fases devem bater exatamente com as strings que você salva no banco de dados!
const FASES_PADRAO = [
  { id: "PROSPECCAO", titulo: "Prospecção", cor: "bg-slate-200" },
  { id: "QUALIFICACAO", titulo: "Qualificação", cor: "bg-blue-100" },
  { id: "PROPOSTA", titulo: "Proposta", cor: "bg-amber-100" },
  { id: "NEGOCIACAO", titulo: "Negociação", cor: "bg-orange-100" },
  { id: "FECHAMENTO", titulo: "Fechamento", cor: "bg-green-100" }
];

export function usePipeline() {
  const [tipoFunil, setTipoFunil] = useState<TipoFunil>("PF");
  
  // 1. Busca os dados brutos da API
  const { negociacoes, isLoading, erro, refetch } = usePipelineNegociacoes();

  // 2. Formata e divide os dados em colunas usando useMemo (para performance)
  const colunasDaPipeline = useMemo<KanbanColumnProps[]>(() => {
    // Separa os dados de acordo com a aba selecionada (PF ou PJ)
    const negociacoesDoFunil = negociacoes.filter(n => n.tipo === tipoFunil);

    // Constrói as colunas injetando os cards corretos dentro delas
    return FASES_PADRAO.map(fase => {
      const negociacoesDaFase = negociacoesDoFunil.filter(n => n.fase === fase.id);

      const cards: KanbanCardProps[] = negociacoesDaFase.map(n => ({
        id: n.id,
        titulo: n.titulo,
        subtitulo: n.dataPrevisaoFechamento ? `Previsão: ${n.dataPrevisaoFechamento}` : undefined,
        valorFormatado: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n.valor),
        corDestaque: "azul",
      }));

      return {
        id: fase.id,
        titulo: fase.titulo,
        corDoCabecalho: fase.cor,
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
    refetch
  };
}