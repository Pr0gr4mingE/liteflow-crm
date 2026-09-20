"use client";

import { useState } from "react";
import { atualizarClientePjAction } from "@/actions/ativos/atualizar-ativos/clientes/atualizar-cliente-pj.action";

export function useAtualizarClientePj() {
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarClientePj = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setErro(null);

    try {
      const dados = Object.fromEntries(formData.entries());

      const response = await atualizarClientePjAction(id, dados);

      if (!response.sucesso) {
        setErro(response.mensagem);
      }
      return response.sucesso;
    } catch (error) {
      console.error("[useAtualizarClientePj] Erro inesperado:", error);
      setErro("Ocorreu um erro inesperado ao atualizar a empresa.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { atualizarClientePj, isLoading, erro };
}