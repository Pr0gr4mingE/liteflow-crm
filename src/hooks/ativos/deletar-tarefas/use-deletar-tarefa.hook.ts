import { useState } from "react";
import { deletarTarefaAction } from "@/actions/ativos/deletar-ativos/tarefas/deletar-tarefa.action";

export function useDeletarTarefa() {
  const [isDeletando, setIsDeletando] = useState(false);

  const deletar = async (id: string) => {
    setIsDeletando(true);
    try {
      const data = await deletarTarefaAction(id);
      
      if (!data.sucesso) {
        throw new Error(data.mensagem);
      }

      return { sucesso: true, mensagem: data.mensagem };
    } catch (error: unknown) {
      console.error("[Hook Error - Tarefa] Erro na orquestração de exclusão:", error);
      return { 
        sucesso: false, 
        mensagem: "Ocorreu um erro inesperado ao deletar a tarefa." 
      };
    } finally {
      setIsDeletando(false);
    }
  };

  return { deletar, isDeletando };
}