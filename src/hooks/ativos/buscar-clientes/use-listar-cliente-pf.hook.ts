"use client";

import { useState, useEffect, useCallback } from "react";
import { listarClientesPfAction } from "@/actions/ativos/buscar-ativos/clientes/listar-cliente-pf.action";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";

export function useListarClientesPf() {
  const [clientes, setClientes] = useState<ClientePf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function carregarInicial() {
      try {
        const dados = await listarClientesPfAction();
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
