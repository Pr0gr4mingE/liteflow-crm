"use client";

import { useState, useEffect, useCallback } from "react";
import { listarNegociacoesPfAction } from "@/actions/ativos/buscar-ativos/negociacoes/listar-negociacoa-pf.action";
import { listarNegociacoesPjAction } from "@/actions/ativos/buscar-ativos/negociacoes/listar-negociacao-pj.action";

export type NegociacaoPipeline = {
  id: string;
  titulo: string;
  valor: number;
  fase: string;
  dataPrevisaoFechamento: string | null;
  tipo: "PF" | "PJ";
};

// Tipagem para a resposta pura da API
type NegociacaoApi = Omit<NegociacaoPipeline, "tipo"> & { valor: string | number };

export function usePipelineNegociacoes() {
  const [negociacoes, setNegociacoes] = useState<NegociacaoPipeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Função auxiliar para não repetir a formatação duas vezes
  const buscarEFormatarDados = async (): Promise<NegociacaoPipeline[]> => {
    const [dadosPf, dadosPj] = await Promise.all([
      listarNegociacoesPfAction(),
      listarNegociacoesPjAction()
    ]);

    const formatadoPf: NegociacaoPipeline[] = dadosPf.map((n: NegociacaoApi) => ({
      ...n,
      valor: Number(n.valor),
      tipo: "PF",
    }));

    const formatadoPj: NegociacaoPipeline[] = dadosPj.map((n: NegociacaoApi) => ({
      ...n,
      valor: Number(n.valor),
      tipo: "PJ",
    }));

    return [...formatadoPf, ...formatadoPj];
  };

  useEffect(() => {
    let montado = true;

    async function carregarInicial() {
      try {
        const dados = await buscarEFormatarDados();
        if (montado) setNegociacoes(dados);
      } catch (error) {
        console.error("[Erro no Hook - Listar Pipeline]:", error);
        if (montado) setErro("Falha ao carregar os dados do pipeline.");
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
      const dados = await buscarEFormatarDados();
      setNegociacoes(dados);
    } catch (error) {
      console.error("[Erro no Hook - Refetch Pipeline]:", error);
      setErro("Falha ao atualizar os dados do pipeline.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { negociacoes, isLoading, erro, refetch };
}