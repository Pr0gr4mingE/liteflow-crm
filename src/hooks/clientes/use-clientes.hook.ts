"use client";

import { useMemo, useState } from "react";
import { useListarClientesPf } from "@/hooks/ativos/buscar-clientes/use-listar-cliente-pf.hook";
import { useListarClientesPj } from "@/hooks/ativos/buscar-clientes/use-listar-cliente-pj.hook";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";

export type TipoCliente = "PF" | "PJ";

function normalizarBusca(valor: string) {
  return valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function useClientes() {
  const [tipoCliente, setTipoCliente] = useState<TipoCliente>("PF");
  const [busca, setBusca] = useState("");

  const listagemPf = useListarClientesPf();
  const listagemPj = useListarClientesPj();

  const listagemAtiva = tipoCliente === "PF" ? listagemPf : listagemPj;

  const clientesPfFiltrados = useMemo(() => {
    const termo = normalizarBusca(busca.trim());
    if (!termo) return listagemPf.clientes;

    return listagemPf.clientes.filter((cliente) => {
      const alvo = normalizarBusca(
        `${cliente.nome} ${cliente.email} ${cliente.cpf} ${cliente.telefone}`
      );
      return alvo.includes(termo);
    });
  }, [busca, listagemPf.clientes]);

  const clientesPjFiltrados = useMemo(() => {
    const termo = normalizarBusca(busca.trim());
    if (!termo) return listagemPj.clientes;

    return listagemPj.clientes.filter((cliente) => {
      const alvo = normalizarBusca(
        `${cliente.razaoSocial} ${cliente.nomeFantasia} ${cliente.email} ${cliente.cnpj} ${cliente.telefone} ${cliente.segmento ?? ""}`
      );
      return alvo.includes(termo);
    });
  }, [busca, listagemPj.clientes]);

  const clientes: ClientePf[] | ClientePj[] =
    tipoCliente === "PF" ? clientesPfFiltrados : clientesPjFiltrados;

  return {
    tipoCliente,
    setTipoCliente,
    busca,
    setBusca,
    clientes,
    total: listagemAtiva.clientes.length,
    carregando: listagemAtiva.isLoading,
    erro: listagemAtiva.erro,
    refetch: listagemAtiva.refetch,
  };
}
