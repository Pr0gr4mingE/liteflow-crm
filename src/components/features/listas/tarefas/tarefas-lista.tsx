import { useState } from "react";
import { CheckCircle2, Clock, Calendar, User, Briefcase, Pencil } from "lucide-react";
import { TarefaListagem } from "@/shared/types/ui/listagem/tarefas/tarefa-listagem.type";
import { FiltroStatusTarefa } from "@/hooks/listagem/tarefas/use-tarefas.hook";
import { formatarDataPtBr } from "@/shared/utils/formatacao/formatar-data-ptbr.util";
import { EstiloTituloTipoTarefa } from "@/shared/utils/formatacao/estilo-titulo-tipo-tarefa.util";

import { EditarTarefaFeature } from "@/components/features/ativos/edit-tarefas/editar-tarefa";
import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

import { useFeedback } from "@/shared/hooks/ui/use-feedback.hook";
import { ToastFeedback } from "@/components/ui/feedback/toast-feedback";

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
  onEdit 
}: { 
  tarefa: TarefaListagem;
  onEdit: () => void;
}) {
  const { label, classes } = EstiloTituloTipoTarefa(tarefa.tipo);

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

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-slate-400">Criada em {formatarDataPtBr(tarefa.dataCriacao)}</span>
          <button 
            onClick={onEdit}
            className="rounded-md p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Editar Tarefa"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

export function TarefasLista({ filtroStatus, tarefas, carregando, busca, onAtualizar }: TarefasListaProps) {
  const [tarefaEditando, setTarefaEditando] = useState<TarefaListagem | null>(null);
  const { mensagem, mostrarSucesso } = useFeedback();

  function handleSucesso() {
    setTarefaEditando(null);
    mostrarSucesso("Tarefa");
    onAtualizar();
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

      <ToastFeedback mensagem={mensagem} />
    </>
  );
}