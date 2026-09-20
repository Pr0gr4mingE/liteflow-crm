"use server";

import { cookies } from "next/headers";
import { IRespostaDTO } from "@/shared/utils/dto/IResposta-padrao.dto";

export async function deletarTarefaAction(id: string): Promise<IRespostaDTO> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return { sucesso: false, mensagem: "Usuário não autenticado." };
    }

    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tarefa?id=${id}`,
      {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        cache: "no-store",
      }
    );

    if (!resposta.ok) {
      const errorData = await resposta.json().catch(() => null);
      return { 
        sucesso: false, 
        mensagem: errorData?.mensagem || "Erro na API ao deletar a tarefa." 
      };
    }

    return (await resposta.json()) as IRespostaDTO;
  } catch (error) {
    console.error("[Action Error] Erro ao deletar tarefa:", error);
    return { sucesso: false, mensagem: "Erro interno de comunicação com a API." };
  }
}