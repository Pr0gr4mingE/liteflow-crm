"use client";

import { useState } from "react";
import { atualizarClientePfAction } from "@/actions/ativos/atualizar-ativos/clientes/atualizar-cliente-pf.action";

export function useAtualizarClientePf() {
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarClientePf = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setErro(null);

    try {
      // Como Cliente PF só tem strings, fromEntries é suficiente
      const dados = Object.fromEntries(formData.entries());

      const response = await atualizarClientePfAction(id, dados);

      if (!response.sucesso) {
        setErro(response.mensagem);
      }
      return response.sucesso;
    } catch (error) {
      console.error("[useAtualizarClientePf] Erro inesperado:", error);
      setErro("Ocorreu um erro inesperado ao atualizar o cliente.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { atualizarClientePf, isLoading, erro };
}