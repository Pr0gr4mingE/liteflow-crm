import { useState } from "react";
import { CheckCircle2, Check, Clock, Calendar, User, Briefcase, Pencil, Trash2 } from "lucide-react"; // Adicionado Trash2
import { TarefaListagem } from "@/shared/types/ui/listagem/tarefas/tarefa-listagem.type";
import { FiltroStatusTarefa } from "@/hooks/listagem/tarefas/use-tarefas.hook";
import { formatarDataPtBr } from "@/shared/utils/formatacao/formatar-data-ptbr.util";
import { EstiloTituloTipoTarefa } from "@/shared/utils/formatacao/estilo-titulo-tipo-tarefa.util";

import { EditarTarefaFeature } from "@/components/features/ativos/edit-tarefas/editar-tarefa";
// Import da nova feature de exclusão
import { DeletarTarefaFeature } from "@/components/features/ativos/deletar-tarefas/deletar-tarefa";

import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

import { useFeedback } from "@/shared/hooks/ui/use-feedback.hook";
import { ToastFeedback } from "@/components/ui/feedback/toast-feedback";
import { useAtualizarStatusTarefa } from "@/hooks/ativos/atualizar-tarefas/use-atualizar-status-tarefa.hook";

interface TarefasListaProps {
  filtroStatus: FiltroStatusTarefa;
  tarefas: TarefaListagem[];
  carregando: boolean;
  busca: string;
  onAtualizar: () => void;
}

function SkeletonLista() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index} className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm">
          <div className="mb-3 h-5 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </li>
      ))}
    </ul>
  );
}

function CardTarefa({ 
  tarefa, 
  onEdit,
  onDelete,
  onComplete,
  isAtualizando
}: { 
  tarefa: TarefaListagem;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;  // <-- PRECISA TER AQUI NA TIPAGEM
  isAtualizando?: boolean; // <-- PRECISA TER AQUI NA TIPAGEM
}) {
  const { label, classes } = EstiloTituloTipoTarefa(tarefa.tipo);
  const tipoNegociacao = (tarefa as TarefaListagem).tipoNegociacao;
  return (
    <li className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm transition-hover hover:border-blue-300">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {tarefa.status === "CONCLUIDA" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            ) : (
              <Clock className="h-4 w-4 shrink-0 text-blue-500" />
            )}
            <h3 className={`truncate text-sm font-semibold ${tarefa.status === 'CONCLUIDA' ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
              {tarefa.titulo}
            </h3>
            <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${classes}`}>
              {label}
            </span>
            {tipoNegociacao && (
              <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold tracking-wide ${
                tipoNegociacao.toString().toUpperCase() === 'PJ' ? 'bg-indigo-50 text-indigo-700' : 'bg-orange-50 text-orange-700'
              }`}>
                {tipoNegociacao.toString().toUpperCase() === 'PJ' ? 'B2B' : 'B2C'}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-4">
            {tarefa.cliente && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" />
                {tarefa.cliente.nome}
              </span>
            )}
            {tarefa.negociacao && (
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                {tarefa.negociacao.titulo}
              </span>
            )}
            {tarefa.dataVencimento && (
              <span className={`inline-flex items-center gap-1.5 ${tarefa.status !== 'CONCLUIDA' && new Date(tarefa.dataVencimento) < new Date() ? 'text-red-600 font-medium' : ''}`}>
                <Calendar className="h-3.5 w-3.5" />
                Prazo: {formatarDataPtBr(tarefa.dataVencimento)}
              </span>
            )}
          </div>

          {tarefa.descricao && (
            <p className="line-clamp-2 text-xs text-slate-500 mt-1">
              {tarefa.descricao}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {tarefa.status !== "CONCLUIDA" && (
            <button 
              onClick={onComplete}
              disabled={isAtualizando}
              className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              title="Marcar como Concluída"
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </button>
          )}
          <span className="hidden sm:inline text-xs text-slate-400">
            {tarefa.status === "CONCLUIDA" && tarefa.dataConclusao
              ? `Concluída em ${formatarDataPtBr(tarefa.dataConclusao)}`
              : `Criada em ${formatarDataPtBr(tarefa.dataCriacao)}`}
          </span>
          <button 
            onClick={onEdit}
            className="rounded-md p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Editar Tarefa"
          >
            <Pencil className="h-4 w-4" />
          </button>
          {/* Novo Botão de Excluir */}
          <button 
            onClick={onDelete}
            className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Excluir Tarefa"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

export function TarefasLista({ filtroStatus, tarefas, carregando, busca, onAtualizar }: TarefasListaProps) {
  const [tarefaEditando, setTarefaEditando] = useState<TarefaListagem | null>(null);
  const [tarefaDeletandoId, setTarefaDeletandoId] = useState<string | null>(null);
  
  const { mensagem, mostrarSucesso } = useFeedback();
  const { atualizarStatus, atualizandoId } = useAtualizarStatusTarefa();

function handleSucesso() {
    setTarefaEditando(null);
    mostrarSucesso("Tarefa atualizada");
    onAtualizar();
  }

  function handleSucessoDeletar() {
    setTarefaDeletandoId(null);
    mostrarSucesso("Tarefa excluída");
    onAtualizar();
  }

  async function handleConcluir(id: string) {
    const resultado = await atualizarStatus(id, "CONCLUIDA");
    
    if (resultado.sucesso) {
      mostrarSucesso(resultado.mensagem || "Tarefa concluída!");
      onAtualizar(); 
    } else {
      // Como não há 'mostrarErro' no seu hook, usamos o alert nativo do navegador para não perder o aviso
      alert(resultado.mensagem || "Erro ao concluir a tarefa.");
      console.error("[TarefasLista] Erro ao concluir:", resultado.mensagem);
    }
  }

  if (carregando) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <SkeletonLista />
      </div>
    );
  }

  if (tarefas.length === 0) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          {busca.trim()
            ? "Nenhuma tarefa encontrada para a busca informada."
            : filtroStatus === "PENDENTES"
              ? "Você não tem tarefas pendentes no momento."
              : "Nenhuma tarefa concluída cadastrada."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm md:p-6">
        <ul className="space-y-3">
          {tarefas.map((tarefa) => (
            <CardTarefa 
              key={tarefa.id} 
              tarefa={tarefa} 
              onEdit={() => setTarefaEditando(tarefa)}
              onDelete={() => setTarefaDeletandoId(tarefa.id)} // Nova prop acoplada
              onComplete={() => handleConcluir(tarefa.id)}
              isAtualizando={atualizandoId === tarefa.id}
            />
          ))}
        </ul>
      </div>

      <EditarTarefaFeature
        isOpen={!!tarefaEditando}
        onClose={() => setTarefaEditando(null)}
        onSuccess={handleSucesso}
        tarefaSelecionada={tarefaEditando as Tarefa}
      />

      {/* Nova Feature de Deleção */}
      <DeletarTarefaFeature
        isOpen={!!tarefaDeletandoId}
        onClose={() => setTarefaDeletandoId(null)}
        onSuccess={handleSucessoDeletar}
        tarefaId={tarefaDeletandoId}
      />

      <ToastFeedback mensagem={mensagem} />
    </>
  );
}