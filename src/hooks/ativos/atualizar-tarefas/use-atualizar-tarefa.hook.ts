"use client";

import { useState } from "react";
import { atualizarTarefaAction } from "@/actions/ativos/atualizar-ativos/tarefas/atualizar-tarefa.action";

export function useAtualizarTarefa() {
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarTarefa = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setErro(null);

    try {
      const dados: Record<string, unknown> = Object.fromEntries(formData.entries());

      if (dados.dataVencimento) {
        dados.dataVencimento = new Date(dados.dataVencimento as string);
      }

      const response = await atualizarTarefaAction(id, dados);

      if (!response.sucesso) {
        setErro(response.mensagem);
      }
      return response.sucesso;
    } catch (error) {
      console.error("[useAtualizarTarefa] Erro inesperado:", error);
      setErro("Ocorreu um erro inesperado ao atualizar a tarefa.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { atualizarTarefa, isLoading, erro };
}