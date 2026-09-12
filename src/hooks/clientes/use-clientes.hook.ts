"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { listarClientesPfAction } from "@/actions/ativos/buscar-ativos/clientes/listar-cliente-pf.action";
import { listarClientesPjAction } from "@/actions/ativos/buscar-ativos/clientes/listar-cliente-pj.action";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";

export type TipoCliente = "PF" | "PJ";

function normalizarBusca(valor: string) {
  return valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function useClientes() {
  const [tipoCliente, setTipoCliente] = useState<TipoCliente>("PF");
  const [busca, setBusca] = useState("");

  const [clientesPf, setClientesPf] = useState<ClientePf[]>([]);
  const [clientesPj, setClientesPj] = useState<ClientePj[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // O fetch manual (pelo botão de refresh) busca especificamente a aba ativa
  const refetch = useCallback(async () => {
    setIsLoading(true);
    setErro(null);

    try {
      if (tipoCliente === "PF") {
        const dados = await listarClientesPfAction();
        setClientesPf(dados);
      } else {
        const dados = await listarClientesPjAction();
        setClientesPj(dados);
      }
    } catch (error) {
      console.error(`[Erro no Hook - Refetch Clientes ${tipoCliente}]:`, error);
      setErro("Falha ao atualizar a lista de clientes.");
    } finally {
      setIsLoading(false);
    }
  }, [tipoCliente]);

  // Carregamento condicional ("Lazy Loading") baseado na aba
  useEffect(() => {
    let montado = true;

    async function carregarInicial() {
      setIsLoading(true);
      setErro(null);

      try {
        if (tipoCliente === "PF" && clientesPf.length === 0) {
          const dados = await listarClientesPfAction();
          if (montado) setClientesPf(dados);
        } else if (tipoCliente === "PJ" && clientesPj.length === 0) {
          const dados = await listarClientesPjAction();
          if (montado) setClientesPj(dados);
        }
      } catch (error) {
        console.error("[Erro no Hook - Listar Clientes]:", error);
        if (montado) setErro("Falha ao carregar a lista de clientes.");
      } finally {
        if (montado) setIsLoading(false);
      }
    }

    carregarInicial();

    return () => {
      montado = false;
    };
  }, [tipoCliente, clientesPf.length, clientesPj.length]);

  const clientesFiltrados = useMemo(() => {
    const termo = normalizarBusca(busca.trim());
    
    if (tipoCliente === "PF") {
      if (!termo) return clientesPf;
      return clientesPf.filter((cliente) => {
        const alvo = normalizarBusca(`${cliente.nome} ${cliente.email} ${cliente.cpf} ${cliente.telefone}`);
        return alvo.includes(termo);
      });
    } else {
      if (!termo) return clientesPj;
      return clientesPj.filter((cliente) => {
        const alvo = normalizarBusca(`${cliente.razaoSocial} ${cliente.nomeFantasia} ${cliente.email} ${cliente.cnpj} ${cliente.telefone} ${cliente.segmento ?? ""}`);
        return alvo.includes(termo);
      });
    }
  }, [busca, tipoCliente, clientesPf, clientesPj]);

  return {
    tipoCliente,
    setTipoCliente,
    busca,
    setBusca,
    clientes: clientesFiltrados,
    total: tipoCliente === "PF" ? clientesPf.length : clientesPj.length,
    carregando: isLoading,
    erro,
    refetch,
  };
}