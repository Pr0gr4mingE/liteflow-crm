import { useState } from "react";
import { deletarClientePfAction } from "@/actions/ativos/deletar-ativos/clientes/deletar-cliente-pf.action";

export function useDeletarClientePf() {
  const [isDeletando, setIsDeletando] = useState(false);

  const deletar = async (id: string) => {
    setIsDeletando(true);
    try {
      const data = await deletarClientePfAction(id);
      
      if (!data.sucesso) {
        throw new Error(data.mensagem);
      }

      return { sucesso: true, mensagem: data.mensagem };
    } catch (error: unknown) {
      console.error("[Hook Error - Cliente PF] Erro na orquestração de exclusão:", error);
      return { 
        sucesso: false, 
        mensagem: "Ocorreu um erro inesperado ao deletar o cliente." 
      };
    } finally {
      setIsDeletando(false);
    }
  };

  return { deletar, isDeletando };
}