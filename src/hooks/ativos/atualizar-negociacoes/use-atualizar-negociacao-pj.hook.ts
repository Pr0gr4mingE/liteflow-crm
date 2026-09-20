"use client";

import { useState } from "react";
import { atualizarNegociacaoPjAction } from "@/actions/ativos/atualizar-ativos/negociacoes/atualizar-negociacao-pj.action";

export function useAtualizarNegociacaoPj() {
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarNegociacaoPj = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setErro(null);

    try {
      const dados: Record<string, unknown> = Object.fromEntries(formData.entries());

      if (dados.valor) dados.valor = Number(dados.valor);
      if (dados.dataPrevisaoFechamento) {
        dados.dataPrevisaoFechamento = new Date(dados.dataPrevisaoFechamento as string);
      }

      const response = await atualizarNegociacaoPjAction(id, dados);

      if (!response.sucesso) {
        setErro(response.mensagem);
      }
      return response.sucesso;
    } catch (error) {
      console.error("[useAtualizarNegociacaoPj] Erro inesperado:", error);
      setErro("Ocorreu um erro inesperado ao atualizar a negociação.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { atualizarNegociacaoPj, isLoading, erro };
}