"use client";

import { useMemo, useState } from "react";
import { useListarNegociacoesPf } from "@/hooks/ativos/buscar-negociacoes/use-listar-negociacao-pf.hook";
import { useListarNegociacoesPj } from "@/hooks/ativos/buscar-negociacoes/use-listar-negociacao-pj.hook";
import {
  NegociacaoPfListagem,
  NegociacaoPjListagem,
} from "@/shared/types/ui/negociacoes/negociacao-listagem.type";
import { obterLabelFaseNegociacao } from "@/shared/utils/negociacoes/label-fase-negociacao.util";

export type TipoNegociacao = "PF" | "PJ";

function normalizarBusca(valor: string) {
  return valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function useNegociacoes() {
  const [tipoNegociacao, setTipoNegociacao] = useState<TipoNegociacao>("PF");
  const [busca, setBusca] = useState("");

  const listagemPf = useListarNegociacoesPf();
  const listagemPj = useListarNegociacoesPj();

  const listagemAtiva = tipoNegociacao === "PF" ? listagemPf : listagemPj;

  const negociacoesPfFiltradas = useMemo(() => {
    const termo = normalizarBusca(busca.trim());
    if (!termo) return listagemPf.negociacoes;

    return listagemPf.negociacoes.filter((negociacao) => {
      const faseLabel = obterLabelFaseNegociacao(negociacao.fase, "PF");
      const alvo = normalizarBusca(
        `${negociacao.titulo} ${negociacao.fase} ${faseLabel} ${negociacao.cliente?.nome ?? ""} ${negociacao.descricao ?? ""} ${negociacao.valor}`
      );
      return alvo.includes(termo);
    });
  }, [busca, listagemPf.negociacoes]);

  const negociacoesPjFiltradas = useMemo(() => {
    const termo = normalizarBusca(busca.trim());
    if (!termo) return listagemPj.negociacoes;

    return listagemPj.negociacoes.filter((negociacao) => {
      const faseLabel = obterLabelFaseNegociacao(negociacao.fase, "PJ");
      const alvo = normalizarBusca(
        `${negociacao.titulo} ${negociacao.fase} ${faseLabel} ${negociacao.cliente?.nome ?? ""} ${negociacao.descricao ?? ""} ${negociacao.valor}`
      );
      return alvo.includes(termo);
    });
  }, [busca, listagemPj.negociacoes]);

  const negociacoes: NegociacaoPfListagem[] | NegociacaoPjListagem[] =
    tipoNegociacao === "PF" ? negociacoesPfFiltradas : negociacoesPjFiltradas;

  return {
    tipoNegociacao,
    setTipoNegociacao,
    busca,
    setBusca,
    negociacoes,
    total: listagemAtiva.negociacoes.length,
    carregando: listagemAtiva.isLoading,
    erro: listagemAtiva.erro,
    refetch: listagemAtiva.refetch,
  };
}
