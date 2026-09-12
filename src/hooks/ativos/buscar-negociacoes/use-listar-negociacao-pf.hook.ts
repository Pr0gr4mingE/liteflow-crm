"use client";

import { useState, useEffect, useCallback } from "react";
import { listarNegociacoesPfAction } from "@/actions/ativos/buscar-ativos/negociacoes/listar-negociacoa-pf.action";
import { NegociacaoPfListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pf-listagem.type";

export function useListarNegociacoesPf() {
  const [negociacoes, setNegociacoes] = useState<NegociacaoPfListagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function carregarInicial() {
      try {
        const dados = await listarNegociacoesPfAction();
        if (montado) setNegociacoes(dados);
      } catch (error) {
        console.error("[Erro no Hook - Listar Negociações PF]:", error);
        if (montado) setErro("Falha ao carregar a lista de negociações PF.");
      } finally {
        if (montado) setIsLoading(false);
      }
    }

    carregarInicial();

    return () => {
      montado = false;
    };
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setErro(null);

    try {
      const dados = await listarNegociacoesPfAction();
      setNegociacoes(dados);
    } catch (error) {
      console.error("[Erro no Hook - Refetch Negociações PF]:", error);
      setErro("Falha ao atualizar a lista de negociações PF.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { negociacoes, isLoading, erro, refetch };
}
