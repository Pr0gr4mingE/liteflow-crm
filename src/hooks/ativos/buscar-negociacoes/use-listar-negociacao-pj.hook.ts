"use client";

import { useState, useEffect, useCallback } from "react";
import { listarNegociacoesPjAction } from "@/actions/ativos/buscar-ativos/negociacoes/listar-negociacao-pj.action";
import { NegociacaoPjListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pj-listagem.type"; 

export function useListarNegociacoesPj() {
  const [negociacoes, setNegociacoes] = useState<NegociacaoPjListagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function carregarInicial() {
      try {
        const dados = await listarNegociacoesPjAction();
        if (montado) setNegociacoes(dados);
      } catch (error) {
        console.error("[Erro no Hook - Listar Negociações PJ]:", error);
        if (montado) setErro("Falha ao carregar a lista de negociações PJ.");
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
      const dados = await listarNegociacoesPjAction();
      setNegociacoes(dados);
    } catch (error) {
      console.error("[Erro no Hook - Refetch Negociações PJ]:", error);
      setErro("Falha ao atualizar a lista de negociações PJ.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { negociacoes, isLoading, erro, refetch };
}
