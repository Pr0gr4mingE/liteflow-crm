"use client";

import { useState } from "react";
import { atualizarTarefaAction } from "@/actions/ativos/atualizar-ativos/tarefas/atualizar-tarefa.action"; 
import { StatusTarefa } from "@/shared/utils/types/status-tarefa.type";

export function useAtualizarStatusTarefa() {
  const [atualizandoId, setAtualizandoId] = useState<string | null>(null);

  async function atualizarStatus(id: string, novoStatus: StatusTarefa) {
    setAtualizandoId(id);
    
    try {
      // Como o DTO é Partial, podemos enviar apenas o status
      const resultado = await atualizarTarefaAction(id, { status: novoStatus });
      return resultado;
    } catch (error) {
      console.error("[useAtualizarStatusTarefa] Erro:", error);
      return { sucesso: false, mensagem: "Erro ao tentar atualizar a tarefa." };
    } finally {
      setAtualizandoId(null);
    }
  }

  return {
    atualizarStatus,
    atualizandoId,
  };
}