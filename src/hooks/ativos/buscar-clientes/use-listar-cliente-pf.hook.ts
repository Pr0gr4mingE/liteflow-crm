// src/hooks/ativos/buscar-clientes/use-listar-cliente-pf.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { listarClientesPfAction } from "@/actions/ativos/buscar-ativos/clientes/listar-cliente-pf.action";

export interface ClientePfResumo {
  id: string;
  nome: string;
  email: string;
}

export function useListarClientesPf() {
  const [clientes, setClientes] = useState<ClientePfResumo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function carregarInicial() {
      try {
        const dados = await listarClientesPfAction();
        // Os estados só são atualizados APÓS o await, empurrando-os para a microtask queue
        // e evitando qualquer conflito síncrono com a renderização do React 19.
        if (montado) setClientes(dados);
      } catch (error) {
        console.error("[Erro no Hook - Listar Clientes PF]:", error);
        if (montado) setErro("Falha ao carregar a lista de contatos.");
      } finally {
        if (montado) setIsLoading(false);
      }
    }

    carregarInicial();

    return () => {
      montado = false;
    };
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setErro(null);

    try {
      const dados = await listarClientesPfAction();
      setClientes(dados);
    } catch (error) {
      console.error("[Erro no Hook - Refetch Clientes PF]:", error);
      setErro("Falha ao atualizar a lista de contatos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { clientes, isLoading, erro, refetch };
}