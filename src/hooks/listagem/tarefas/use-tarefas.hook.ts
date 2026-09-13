"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { listarTarefasAction } from "@/actions/ativos/buscar-ativos/tarefas/listar-tarefa.action";
import { TarefaListagem } from "@/shared/types/ui/listagem/tarefas/tarefa-listagem.type";

export type FiltroStatusTarefa = "PENDENTES" | "CONCLUIDAS";

function normalizarBusca(valor: string) {
  return valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function useTarefas() {
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatusTarefa>("PENDENTES");
  const [busca, setBusca] = useState("");
  const [todasTarefas, setTodasTarefas] = useState<TarefaListagem[]>([]);
  
  // O estado inicial já é true, evitando a necessidade de setIsLoading(true) no mount
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // 1. Carregamento Inicial Seguro (Sem estado síncrono no Effect)
  useEffect(() => {
    let montado = true;

    async function carregarInicial() {
      try {
        const dados = await listarTarefasAction();
        if (montado) setTodasTarefas(dados);
      } catch (error) {
        console.error("[Erro no Hook - Listar Tarefas]:", error);
        if (montado) setErro("Falha ao carregar a lista de tarefas.");
      } finally {
        if (montado) setIsLoading(false);
      }
    }

    carregarInicial();

    return () => {
      montado = false;
    };
  }, []);

  // 2. Ação disparada manualmente pelo usuário (Botão de atualizar)
  const refetch = useCallback(async () => {
    setIsLoading(true);
    setErro(null);

    try {
      const dados = await listarTarefasAction();
      setTodasTarefas(dados);
    } catch (error) {
      console.error("[Erro no Hook - Refetch Tarefas]:", error);
      setErro("Falha ao atualizar a lista de tarefas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const tarefasFiltradas = useMemo(() => {
    const separadasPorStatus = todasTarefas.filter((tarefa) => {
      if (filtroStatus === "PENDENTES") {
        return tarefa.status !== "CONCLUIDA";
      }
      return tarefa.status === "CONCLUIDA";
    });

    const termo = normalizarBusca(busca.trim());
    if (!termo) return separadasPorStatus;

    return separadasPorStatus.filter((tarefa) => {
      const alvo = normalizarBusca(
        `${tarefa.titulo} ${tarefa.descricao ?? ""} ${tarefa.cliente?.nome ?? ""} ${tarefa.negociacao?.titulo ?? ""} ${tarefa.tipo}`
      );
      return alvo.includes(termo);
    });
  }, [todasTarefas, filtroStatus, busca]);

  return {
    filtroStatus,
    setFiltroStatus,
    busca,
    setBusca,
    tarefas: tarefasFiltradas,
    total: tarefasFiltradas.length,
    carregando: isLoading,
    erro,
    refetch,
  };
}