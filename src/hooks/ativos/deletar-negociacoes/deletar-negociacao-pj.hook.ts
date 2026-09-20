import { useState } from "react";
import { deletarNegociacaoPjAction } from "@/actions/ativos/deletar-ativos/negociacoes/deletar-negociacao-pj.action";

export function useDeletarNegociacaoPj() {
  const [isDeletando, setIsDeletando] = useState(false);

  const deletar = async (id: string) => {
    setIsDeletando(true);
    try {
      const data = await deletarNegociacaoPjAction(id);
      
      if (!data.sucesso) {
        throw new Error(data.mensagem);
      }

      return { sucesso: true, mensagem: data.mensagem };
    } catch (error: unknown) {
      console.error("[Hook Error - Negociação PJ] Erro na orquestração de exclusão:", error);
      return { 
        sucesso: false, 
        mensagem: "Ocorreu um erro inesperado ao deletar a negociação corporativa." 
      };
    } finally {
      setIsDeletando(false);
    }
  };

  return { deletar, isDeletando };
}