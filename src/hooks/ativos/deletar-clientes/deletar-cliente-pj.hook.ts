import { useState } from "react";
import { deletarClientePjAction } from "@/actions/ativos/deletar-ativos/clientes/deletar-cliente-pj.action";

export function useDeletarClientePj() {
  const [isDeletando, setIsDeletando] = useState(false);

  const deletar = async (id: string) => {
    setIsDeletando(true);
    try {
      const data = await deletarClientePjAction(id);
      
      if (!data.sucesso) {
        throw new Error(data.mensagem);
      }

      return { sucesso: true, mensagem: data.mensagem };
    } catch (error: unknown) {
      console.error("[Hook Error - Cliente PJ] Erro na orquestração de exclusão:", error);
      return { 
        sucesso: false, 
        mensagem: "Ocorreu um erro inesperado ao deletar a empresa." 
      };
    } finally {
      setIsDeletando(false);
    }
  };

  return { deletar, isDeletando };
}