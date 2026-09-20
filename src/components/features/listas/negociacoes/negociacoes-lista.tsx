import { useState } from "react";
import { Briefcase, User, Calendar, Banknote, Pencil, Trash2 } from "lucide-react"; // Adicionado Trash2
import { NegociacaoPfListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pf-listagem.type";
import { TipoNegociacao } from "@/hooks/listagem/negociacoes/use-negociacoes.hook";
import { formatarDataPtBr } from "@/shared/utils/formatacao/formatar-data-ptbr.util";
import { obterLabelFaseNegociacao } from "@/shared/utils/negociacoes/label-fase-negociacao.util";
import { NegociacaoPjListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pj-listagem.type";
import { formatarMoedaBRL } from "@/shared/utils/formatacao/formatar-moeda.util";
import { EstiloTituloFase } from "@/shared/utils/formatacao/estilo-titulo-fase-negociacao.util";

import { EditarNegociacaoPfFeature } from "@/components/features/ativos/edit-negociacoes/editar-negociacao-pf";
import { EditarNegociacaoPjFeature } from "@/components/features/ativos/edit-negociacoes/editar-negociacao-pj";
// Imports das novas features de exclusão
import { DeletarNegociacaoPfFeature } from "@/components/features/ativos/deletar-negociacoes/deletar-negociacao-pf";
import { DeletarNegociacaoPjFeature } from "@/components/features/ativos/deletar-negociacoes/deletar-negociacao-pj";

import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";
import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

import { useFeedback } from "@/shared/hooks/ui/use-feedback.hook";
import { ToastFeedback } from "@/components/ui/feedback/toast-feedback";

interface NegociacoesListaProps {
  tipoNegociacao: TipoNegociacao;
  negociacoes: NegociacaoPfListagem[] | NegociacaoPjListagem[];
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

function CardNegociacao({
  negociacao,
  tipoNegociacao,
  onEdit,
  onDelete, // Nova prop recebida
}: {
  negociacao: NegociacaoPfListagem | NegociacaoPjListagem;
  tipoNegociacao: TipoNegociacao;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const clienteFallback = tipoNegociacao === "PF" ? "Cliente Desconhecido" : "Empresa Desconhecida";

  return (
    <li className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm transition-hover hover:border-blue-300">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Briefcase className="h-4 w-4 shrink-0 text-slate-500" />
            <h3 className="truncate text-sm font-semibold text-slate-900">{negociacao.titulo}</h3>
            <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${EstiloTituloFase(negociacao.fase)}`}>
              {obterLabelFaseNegociacao(negociacao.fase, tipoNegociacao)}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-4">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-slate-400" />
              {negociacao.cliente?.nome || clienteFallback}
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
              <Banknote className="h-3.5 w-3.5" />
              {formatarMoedaBRL(negociacao.valor)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Previsão: {formatarDataPtBr(negociacao.dataPrevisaoFechamento, "Sem previsão")}
            </span>
          </div>

          {negociacao.descricao && (
            <p className="line-clamp-2 text-xs text-slate-500">{negociacao.descricao}</p>
          )}

          {negociacao.motivoPerda && (
            <p className="text-xs text-red-600">Motivo da perda: {negociacao.motivoPerda}</p>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <span className="hidden sm:inline text-xs text-slate-400">Desde {formatarDataPtBr(negociacao.dataCriacao)}</span>
          <button 
            onClick={onEdit}
            className="rounded-md p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Editar Negociação"
          >
            <Pencil className="h-4 w-4" />
          </button>
          {/* Novo Botão de Excluir */}
          <button 
            onClick={onDelete}
            className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Excluir Negociação"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

export function NegociacoesLista({ tipoNegociacao, negociacoes, carregando, busca, onAtualizar }: NegociacoesListaProps) {
  const [negociacaoPfEditando, setNegociacaoPfEditando] = useState<NegociacaoPfListagem | null>(null);
  const [negociacaoPjEditando, setNegociacaoPjEditando] = useState<NegociacaoPjListagem | null>(null);
  
  // Novos estados para exclusão (apenas o ID)
  const [negociacaoPfDeletandoId, setNegociacaoPfDeletandoId] = useState<string | null>(null);
  const [negociacaoPjDeletandoId, setNegociacaoPjDeletandoId] = useState<string | null>(null);
  
  const { mensagem, mostrarSucesso } = useFeedback();

  function handleSucessoPf() {
    setNegociacaoPfEditando(null);
    mostrarSucesso("Negociação atualizada");
    onAtualizar();
  }

  function handleSucessoPj() {
    setNegociacaoPjEditando(null);
    mostrarSucesso("Negociação corporativa atualizada");
    onAtualizar();
  }

  // Handlers de sucesso para exclusão
  function handleSucessoDeletarPf() {
    setNegociacaoPfDeletandoId(null);
    mostrarSucesso("Negociação excluída");
    onAtualizar();
  }

  function handleSucessoDeletarPj() {
    setNegociacaoPjDeletandoId(null);
    mostrarSucesso("Negociação corporativa excluída");
    onAtualizar();
  }

  if (carregando) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <SkeletonLista />
      </div>
    );
  }

  if (negociacoes.length === 0) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          {busca.trim()
            ? "Nenhuma negociação encontrada para a busca informada."
            : tipoNegociacao === "PF"
              ? "Nenhuma negociação pessoa física cadastrada."
              : "Nenhuma negociação pessoa jurídica cadastrada."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm md:p-6">
        <ul className="space-y-3">
          {negociacoes.map((negociacao) => (
            <CardNegociacao
              key={negociacao.id}
              negociacao={negociacao}
              tipoNegociacao={tipoNegociacao}
              onEdit={() => {
                if (tipoNegociacao === "PF") setNegociacaoPfEditando(negociacao as NegociacaoPfListagem);
                else setNegociacaoPjEditando(negociacao as NegociacaoPjListagem);
              }}
              onDelete={() => { // Nova prop acoplada ao estado
                if (tipoNegociacao === "PF") setNegociacaoPfDeletandoId(negociacao.id);
                else setNegociacaoPjDeletandoId(negociacao.id);
              }}
            />
          ))}
        </ul>
      </div>

      <EditarNegociacaoPfFeature
        isOpen={!!negociacaoPfEditando}
        onClose={() => setNegociacaoPfEditando(null)}
        onSuccess={handleSucessoPf}
        negociacaoSelecionada={negociacaoPfEditando as NegociacaoPf} 
      />

      <EditarNegociacaoPjFeature
        isOpen={!!negociacaoPjEditando}
        onClose={() => setNegociacaoPjEditando(null)}
        onSuccess={handleSucessoPj}
        negociacaoSelecionada={negociacaoPjEditando as NegociacaoPj}
      />

      {/* Novas Features de Deleção */}
      <DeletarNegociacaoPfFeature
        isOpen={!!negociacaoPfDeletandoId}
        onClose={() => setNegociacaoPfDeletandoId(null)}
        onSuccess={handleSucessoDeletarPf}
        negociacaoId={negociacaoPfDeletandoId}
      />

      <DeletarNegociacaoPjFeature
        isOpen={!!negociacaoPjDeletandoId}
        onClose={() => setNegociacaoPjDeletandoId(null)}
        onSuccess={handleSucessoDeletarPj}
        negociacaoId={negociacaoPjDeletandoId}
      />

      <ToastFeedback mensagem={mensagem} />
    </>
  );
}