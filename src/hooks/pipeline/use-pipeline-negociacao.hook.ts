"use client";

import { useState, useEffect, useCallback } from "react";
import { listarNegociacoesPfAction } from "@/actions/ativos/buscar-ativos/negociacoes/listar-negociacao-pf.action";
import { listarNegociacoesPjAction } from "@/actions/ativos/buscar-ativos/negociacoes/listar-negociacao-pj.action";
import { formatarDataPtBr } from "@/shared/utils/formatacao/formatar-data-ptbr.util";
import { NegociacaoPfListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pf-listagem.type";
import { NegociacaoPjListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pj-listagem.type";

export type NegociacaoPipeline = {
  id: string;
  titulo: string;
  valor: number;
  fase: string;
  dataPrevisaoFechamento: string | null;
  tipo: "PF" | "PJ";
  clienteNome: string;
};

export function usePipelineNegociacoes() {
  const [negociacoes, setNegociacoes] = useState<NegociacaoPipeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarEFormatarDados = async (): Promise<NegociacaoPipeline[]> => {
    const [dadosPf, dadosPj] = await Promise.all([
      listarNegociacoesPfAction(),
      listarNegociacoesPjAction()
    ]);

    // Mapeamento explícito garante que apenas os dados necessários do Pipeline vão para o estado,
    // e o TypeScript reconhece a conversão correta de Date para string.
    const formatadoPf: NegociacaoPipeline[] = dadosPf.map((n: NegociacaoPfListagem) => ({
      id: n.id,
      titulo: n.titulo,
      valor: Number(n.valor) || 0,
      fase: n.fase,
      dataPrevisaoFechamento: n.dataPrevisaoFechamento ? formatarDataPtBr(n.dataPrevisaoFechamento) : null,
      tipo: "PF",
      clienteNome: n.cliente?.nome || "Cliente Desconhecido",
    }));

    const formatadoPj: NegociacaoPipeline[] = dadosPj.map((n: NegociacaoPjListagem) => ({
      id: n.id,
      titulo: n.titulo,
      valor: Number(n.valor) || 0,
      fase: n.fase,
      dataPrevisaoFechamento: n.dataPrevisaoFechamento ? formatarDataPtBr(n.dataPrevisaoFechamento) : null,
      tipo: "PJ",
      clienteNome: n.cliente?.nome || "Empresa Desconhecida",
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