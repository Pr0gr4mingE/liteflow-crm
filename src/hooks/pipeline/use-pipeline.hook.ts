"use client";

import { useState, useMemo } from "react";
import { usePipelineNegociacoes } from "./use-pipeline-negociacao.hook";
import { KanbanColumnProps } from "@/shared/types/ui/kanban/kanban-column.props";
import { KanbanCardProps } from "@/shared/types/ui/kanban/kanban-card.props";

export type TipoFunil = "PF" | "PJ";

// Fluxo B2C (Pessoa Física - Automação e Velocidade)
const FASES_PF = [
  { id: "CAPTURA", titulo: "Captura", cor: "bg-slate-200" },
  { id: "ENGAJAMENTO", titulo: "Engajamento", cor: "bg-blue-100" },
  { id: "CONVERSAO", titulo: "Conversão", cor: "bg-green-100" },
  { id: "FIDELIZACAO", titulo: "Fidelização", cor: "bg-purple-100" },
  { id: "DESISTENCIA", titulo: "Desistência", cor: "bg-red-100" }
];

// Fluxo B2B (Pessoa Jurídica - Consultivo)
const FASES_PJ = [
  { id: "LEAD", titulo: "Lead", cor: "bg-slate-200" },
  { id: "CONTATO", titulo: "Contato", cor: "bg-blue-100" },
  { id: "PROPOSTA", titulo: "Proposta", cor: "bg-amber-100" },
  { id: "FECHADO", titulo: "Fechado", cor: "bg-green-100" },
  { id: "INDEFERIDO", titulo: "Indeferido", cor: "bg-red-100" }
];

export function usePipeline() {
  const [tipoFunil, setTipoFunil] = useState<TipoFunil>("PF");
  
  const { negociacoes, isLoading, erro, refetch } = usePipelineNegociacoes();

  const colunasDaPipeline = useMemo<KanbanColumnProps[]>(() => {
    // 1. Filtra as negociações pela aba selecionada
    const negociacoesDoFunil = negociacoes.filter(n => n.tipo === tipoFunil);

    // 2. Define qual array de fases usar com base no tipo
    const fasesDoModelo = tipoFunil === "PF" ? FASES_PF : FASES_PJ;

    // 3. Monta as colunas usando o mapa correto
    return fasesDoModelo.map(fase => {
      const negociacoesDaFase = negociacoesDoFunil.filter(n => n.fase === fase.id);

      const cards: KanbanCardProps[] = negociacoesDaFase.map(n => ({
        id: n.id,
        titulo: n.titulo,
        subtitulo: n.dataPrevisaoFechamento ? `Previsão: ${n.dataPrevisaoFechamento}` : undefined,
        valorFormatado: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n.valor),
        // Adiciona uma lógica visual simples: cards de desistência/indeferido ficam vermelhos, fechados ficam verdes
        corDestaque: (fase.id === "DESISTENCIA" || fase.id === "INDEFERIDO") ? "vermelho" : 
                     (fase.id === "CONVERSAO" || fase.id === "FECHADO") ? "verde" : "azul",
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
    refetch,
    negociacoes
  };
}