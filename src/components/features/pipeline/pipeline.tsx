"use client";

import { useState, useMemo } from "react";
import { KanbanBoard as KanbanBoardUI } from "@/components/ui/kanban/kanban-board";
import { useKanban } from "@/hooks/kanban/use-kanban.hook";
import { usePipeline } from "@/hooks/pipeline/use-pipeline.hook";
import { DetalhesNegociacaoModal } from "@/components/features/modal/modal-detalhes-negociacao";

export function PipelineFeature() {
  // 1. Extraímos também as 'negociacoes' brutas para poder alimentar o modal com os dados completos
  const { 
    tipoFunil, 
    setTipoFunil, 
    colunasDaPipeline, 
    carregandoPipeline, 
    erro, 
    refetch,
    negociacoes
  } = usePipeline();
  
  const { colunas, handleDragEnd } = useKanban(colunasDaPipeline);

  // 2. Estado local da Feature para controlar qual modal está aberto
  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);

  // 3. Injetamos a função 'aoClicar' nos cards de forma dinâmica
  // Usamos useMemo para não recriar essa lista a cada renderização à toa
  const colunasComClique = useMemo(() => {
    return colunas.map((coluna) => ({
      ...coluna,
      cards: coluna.cards.map((card) => ({
        ...card,
        aoClicar: (id: string) => setIdSelecionado(id),
      })),
    }));
  }, [colunas]);

  // 4. Busca os dados completos da negociação clicada usando o ID
  const negociacaoSelecionada = useMemo(() => {
    if (!idSelecionado || !negociacoes) return null;
    return negociacoes.find((n) => n.id === idSelecionado) || null;
  }, [idSelecionado, negociacoes]);

  return (
    <div className="flex h-full flex-col">
      {/* Header e Controles */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline de Vendas</h1>
          <p className="text-sm text-slate-500">
            Gerencie suas negociações arrastando os cards entre as fases.
          </p>
        </div>
        
        {/* Toggle PF / PJ */}
        <div className="flex w-max items-center gap-2 rounded-lg bg-slate-100 p-1">
          <button 
            onClick={() => setTipoFunil("PF")} 
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tipoFunil === "PF" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Pessoa Física (B2C)
          </button>
          <button 
            onClick={() => setTipoFunil("PJ")} 
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tipoFunil === "PJ" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Pessoa Jurídica (B2B)
          </button>
        </div>
      </div>

      {/* Tratamento de Erro Seguro */}
      {erro && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{erro}</p>
          <button onClick={refetch} className="text-sm font-medium text-red-700 hover:underline">
            Tentar novamente
          </button>
        </div>
      )}

      {/* O componente visual agora recebe as colunas com o evento de clique já injetado */}
      <KanbanBoardUI 
        colunas={colunasComClique} 
        onDragEnd={handleDragEnd} 
        carregando={carregandoPipeline} 
        tipoFunil={tipoFunil}  
      />

      {/* O Modal consome o estado da Feature */}
      <DetalhesNegociacaoModal
        isOpen={!!idSelecionado}
        onClose={() => setIdSelecionado(null)}
        negociacao={negociacaoSelecionada}
      />
    </div>
  );
}