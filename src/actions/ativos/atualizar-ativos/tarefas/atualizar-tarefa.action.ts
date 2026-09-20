"use server";

import { CriarTarefaFormData } from "@/shared/types/ui/formdata/ativos/tarefas.formdata";

export async function atualizarTarefaAction(id: string, dados: Partial<CriarTarefaFormData>) {
  try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tarefas`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...dados }),
    });

    return await resposta.json();
  } catch (error) {
    console.error("[Action] Erro ao atualizar tarefa:", error);
    return { sucesso: false, mensagem: "Erro interno de comunicação ao atualizar tarefa." };
  }
}