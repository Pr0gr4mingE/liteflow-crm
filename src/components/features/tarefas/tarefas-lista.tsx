import { CheckCircle2, Clock, Calendar, User, Briefcase } from "lucide-react";
import { TarefaListagem } from "@/shared/types/ui/listagem/tarefas/tarefa-listagem.type";
import { FiltroStatusTarefa } from "@/hooks/listagem/tarefas/use-tarefas.hook";
import { formatarDataPtBr } from "@/shared/utils/formatacao/formatar-data-ptbr.util";

interface TarefasListaProps {
  filtroStatus: FiltroStatusTarefa;
  tarefas: TarefaListagem[];
  carregando: boolean;
  busca: string;
}

// Estilização semântica agrupando os tipos do domínio
function obterEstiloETituloTipo(tipo: string) {
  const label = tipo.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  
  const tiposB2b = ["REUNIAO_APRESENTACAO", "ENVIO_PROPOSTA"];
  const tiposB2c = ["DISPARO_CAMPANHA", "LEMBRETE_RECOMPRA", "ANALISE_DADOS"];
  
  if (tiposB2b.includes(tipo)) {
    return { label, classes: "text-indigo-700 bg-indigo-50 border-indigo-200" };
  }
  if (tiposB2c.includes(tipo)) {
    return { label, classes: "text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200" };
  }
  // LIGACAO, EMAIL, LEMBRETE
  return { label, classes: "text-slate-700 bg-slate-100 border-slate-200" };
}

function SkeletonLista() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          key={index}
          className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 h-5 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </li>
      ))}
    </ul>
  );
}

function CardTarefa({ tarefa }: { tarefa: TarefaListagem }) {
  const { label, classes } = obterEstiloETituloTipo(tarefa.tipo);

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

        <span className="shrink-0 text-xs text-slate-400">
          Criada em {formatarDataPtBr(tarefa.dataCriacao)}
        </span>
      </div>
    </li>
  );
}

export function TarefasLista({
  filtroStatus,
  tarefas,
  carregando,
  busca,
}: TarefasListaProps) {
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
    <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm md:p-6">
      <ul className="space-y-3">
        {tarefas.map((tarefa) => (
          <CardTarefa key={tarefa.id} tarefa={tarefa} />
        ))}
      </ul>
    </div>
  );
}