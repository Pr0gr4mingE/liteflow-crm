"use server";

import { CriarTarefaFormData } from "@/shared/types/ui/formdata/ativos/tarefas.formdata";
import { revalidatePath } from "next/cache";

export async function atualizarTarefaAction(id: string, dados: Partial<CriarTarefaFormData>) {
  try {
    const resposta = await fetch(`${process.env.API_URL}/tarefa`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...dados }),
    });

    const resultado = await resposta.json();

    if (resultado.sucesso) {
      revalidatePath("/tarefas"); 
    }

    return resultado;

  } catch (error) {
    console.error("[Action] Erro ao atualizar tarefa:", error);
    return { sucesso: false, mensagem: "Erro interno de comunicação ao atualizar tarefa." };
  }
}