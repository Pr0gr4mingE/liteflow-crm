"use client";

import { useState, useMemo } from "react";
import { KanbanBoard as KanbanBoardUI } from "@/components/ui/kanban/kanban-board";
import { useKanban } from "@/hooks/kanban/use-kanban.hook";
import { usePipeline } from "@/hooks/pipeline/use-pipeline.hook";
import { DetalhesNegociacaoModal } from "@/components/features/modal/modal-detalhes-negociacao";
// 1. Import do novo Modal Wrapper
import { CadastroTarefaFeature } from "@/components/features/ativos/cad-tarefas/cad-tarefa";

export function PipelineFeature() {
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

  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);
  
  // 2. Estado local para controlar o modal de tarefas
  const [modalTarefaAberto, setModalTarefaAberto] = useState(false);
  const [contextoTarefa, setContextoTarefa] = useState<{ id: string; tipo: "PF" | "PJ" } | null>(null);

  const colunasComClique = useMemo(() => {
    return colunas.map((coluna) => ({
      ...coluna,
      cards: coluna.cards.map((card) => ({
        ...card,
        aoClicar: (id: string) => setIdSelecionado(id),
        // 3. Injetamos o callback do botão de adicionar tarefa nos cards
        aoAdicionarTarefa: (id: string) => {
          setContextoTarefa({ id, tipo: tipoFunil });
          setModalTarefaAberto(true);
        },
      })),
    }));
    // É obrigatório colocar tipoFunil na dependência para ele pegar o contexto B2B/B2C atualizado
  }, [colunas, tipoFunil]); 

  const negociacaoSelecionada = useMemo(() => {
    if (!idSelecionado || !negociacoes) return null;
    return negociacoes.find((n) => n.id === idSelecionado) || null;
  }, [idSelecionado, negociacoes]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline de Vendas</h1>
          <p className="text-sm text-slate-500">
            Gerencie suas negociações arrastando os cards entre as fases.
          </p>
        </div>
        
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

      {erro && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{erro}</p>
          <button onClick={refetch} className="text-sm font-medium text-red-700 hover:underline">
            Tentar novamente
          </button>
        </div>
      )}

      <KanbanBoardUI 
        colunas={colunasComClique} 
        onDragEnd={handleDragEnd} 
        carregando={carregandoPipeline} 
        tipoFunil={tipoFunil}  
      />

      <DetalhesNegociacaoModal
        isOpen={!!idSelecionado}
        onClose={() => setIdSelecionado(null)}
        negociacao={negociacaoSelecionada}
      />

      {/* 4. Renderização independente do novo modal */}
      <CadastroTarefaFeature
        isOpen={modalTarefaAberto}
        onClose={() => {
          setModalTarefaAberto(false);
          setContextoTarefa(null);
        }}
        negociacaoSelecionada={contextoTarefa}
      />
    </div>
  );
}