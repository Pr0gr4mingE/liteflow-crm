"use client";

import { useState } from "react";
import { atualizarNegociacaoPfAction } from "@/actions/ativos/atualizar-ativos/negociacoes/atualizar-negociacao-pf.action";

export function useAtualizarNegociacaoPf() {
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarNegociacaoPf = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setErro(null);

    try {
      const dados: Record<string, unknown> = Object.fromEntries(formData.entries());

      // Cast de tipos específicos
      if (dados.valor) dados.valor = Number(dados.valor);
      if (dados.dataPrevisaoFechamento) {
        dados.dataPrevisaoFechamento = new Date(dados.dataPrevisaoFechamento as string);
      }

      const response = await atualizarNegociacaoPfAction(id, dados);

      if (!response.sucesso) {
        setErro(response.mensagem);
      }
      return response.sucesso;
    } catch (error) {
      console.error("[useAtualizarNegociacaoPf] Erro inesperado:", error);
      setErro("Ocorreu um erro inesperado ao atualizar a negociação.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { atualizarNegociacaoPf, isLoading, erro };
}