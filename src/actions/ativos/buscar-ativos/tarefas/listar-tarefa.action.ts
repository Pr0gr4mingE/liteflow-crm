"use server";

import { cookies } from "next/headers";
import { TarefaListagem } from "@/shared/types/ui/listagem/tarefas/tarefa-listagem.type";
import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

export async function listarTarefasAction(): Promise<TarefaListagem[]> {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) return [];

    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tarefa?usuarioId=${usuarioId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!resposta.ok) return [];
    const dados = await resposta.json();

    // Mantendo o padrão de responsabilidade única: reidratar datas no servidor
    return dados.map((tarefa: Tarefa) => ({
      ...tarefa,
      dataVencimento: tarefa.dataVencimento ? new Date(tarefa.dataVencimento) : undefined,
      dataCriacao: tarefa.dataCriacao ? new Date(tarefa.dataCriacao) : new Date(),
    })) as TarefaListagem[];
  } catch (error) {
    console.error("[Action Error] Erro ao listar tarefas:", error);
    return [];
  }
}