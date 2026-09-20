import { useState } from "react";
import { deletarNegociacaoPfAction } from "@/actions/ativos/deletar-ativos/negociacoes/deletar-negociacao-pf.action";

export function useDeletarNegociacaoPf() {
  const [isDeletando, setIsDeletando] = useState(false);

  const deletar = async (id: string) => {
    setIsDeletando(true);
    try {
      const data = await deletarNegociacaoPfAction(id);
      
      if (!data.sucesso) {
        throw new Error(data.mensagem);
      }

      return { sucesso: true, mensagem: data.mensagem };
    } catch (error: unknown) {
      console.error("[Hook Error - Negociação PF] Erro na orquestração de exclusão:", error);
      return { 
        sucesso: false, 
        mensagem: "Ocorreu um erro inesperado ao deletar a negociação." 
      };
    } finally {
      setIsDeletando(false);
    }
  };

  return { deletar, isDeletando };
}