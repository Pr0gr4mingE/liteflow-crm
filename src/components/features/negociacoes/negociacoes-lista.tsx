import { Briefcase, User, Calendar, Banknote } from "lucide-react";
import { NegociacaoPfListagem} from "@/shared/types/ui/listagem/negociacoes/negociacao-pf-listagem.type";
import { TipoNegociacao } from "@/hooks/listagem/negociacoes/use-negociacoes.hook";
import { formatarDataPtBr } from "@/shared/utils/formatacao/formatar-data-ptbr.util";
import { obterLabelFaseNegociacao } from "@/shared/utils/negociacoes/label-fase-negociacao.util";
import { NegociacaoPjListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pj-listagem.type";

interface NegociacoesListaProps {
  tipoNegociacao: TipoNegociacao;
  negociacoes: NegociacaoPfListagem[] | NegociacaoPjListagem[];
  carregando: boolean;
  busca: string;
}

function formatarMoeda(valor: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(valor) || 0);
}

function classeFase(fase: string) {
  if (fase === "DESISTENCIA" || fase === "INDEFERIDO") {
    return "bg-red-50 text-red-700 border-red-200";
  }
  if (fase === "CONVERSAO" || fase === "FECHADO") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
  return "bg-slate-50 text-slate-700 border-slate-200";
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

function CardNegociacao({
  negociacao,
  tipoNegociacao,
}: {
  negociacao: NegociacaoPfListagem | NegociacaoPjListagem;
  tipoNegociacao: TipoNegociacao;
}) {
  const clienteFallback =
    tipoNegociacao === "PF" ? "Cliente Desconhecido" : "Empresa Desconhecida";

  return (
    <li className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Briefcase className="h-4 w-4 shrink-0 text-slate-500" />
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {negociacao.titulo}
            </h3>
            <span
              className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${classeFase(negociacao.fase)}`}
            >
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
              {formatarMoeda(negociacao.valor)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Previsão:{" "}
              {formatarDataPtBr(negociacao.dataPrevisaoFechamento, "Sem previsão")}
            </span>
          </div>

          {negociacao.descricao && (
            <p className="line-clamp-2 text-xs text-slate-500">
              {negociacao.descricao}
            </p>
          )}

          {negociacao.motivoPerda && (
            <p className="text-xs text-red-600">
              Motivo da perda: {negociacao.motivoPerda}
            </p>
          )}
        </div>

        <span className="shrink-0 text-xs text-slate-400">
          Desde {formatarDataPtBr(negociacao.dataCriacao)}
        </span>
      </div>
    </li>
  );
}

export function NegociacoesLista({
  tipoNegociacao,
  negociacoes,
  carregando,
  busca,
}: NegociacoesListaProps) {
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
    <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm md:p-6">
      <ul className="space-y-3">
        {negociacoes.map((negociacao) => (
          <CardNegociacao
            key={negociacao.id}
            negociacao={negociacao}
            tipoNegociacao={tipoNegociacao}
          />
        ))}
      </ul>
    </div>
  );
}
