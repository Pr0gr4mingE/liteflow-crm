// src/hooks/ativos/buscar-clientes/use-listar-cliente-pj.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { listarClientesPjAction } from "@/actions/ativos/buscar-ativos/clientes/listar-cliente-pj.action";

export interface ClientePjResumo {
  id: string;
  razaoSocial: string;
  email: string;
}

export function useListarClientesPj() {
  const [clientes, setClientes] = useState<ClientePjResumo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function carregarInicial() {
      try {
        const dados = await listarClientesPjAction();
        if (montado) setClientes(dados);
      } catch (error) {
        console.error("[Erro no Hook - Listar Clientes PJ]:", error);
        if (montado) setErro("Falha ao carregar a base de empresas.");
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
      const dados = await listarClientesPjAction();
      setClientes(dados);
    } catch (error) {
      console.error("[Erro no Hook - Refetch Clientes PJ]:", error);
      setErro("Falha ao atualizar a base de empresas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { clientes, isLoading, erro, refetch };
}