"use server";

import { cookies } from "next/headers";

export async function atualizarFaseNegociacaoAction(
  negociacaoId: string, 
  novaFase: string, 
  tipoFunil: "PF" | "PJ"
) {
  // 1. Valida a autenticação
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("session_token")?.value;

  if (!usuarioId) {
    return { sucesso: false, mensagem: "Usuário não autenticado. Faça login novamente." };
  }

  // 2. Monta o payload para a API da Pipeline
  const payloadDaApi = {
    id: negociacaoId,
    novaFase,
    tipo: tipoFunil,
  };

  try {
    const resposta = await fetch(`${process.env.API_URL}/pipeline-kanban`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadDaApi),
    });

    const dados = await resposta.json();

    if (!resposta.ok || !dados.sucesso) {
      return {
        sucesso: false,
        mensagem: dados.mensagem || "Não foi possível atualizar a fase da negociação.",
      };
    }

    return { sucesso: true, mensagem: dados.mensagem || "Fase atualizada com sucesso!" };
  } catch (error) {
    console.error("[Action Error] Erro ao atualizar fase da negociação:", error);
    return { sucesso: false, mensagem: "Erro interno de conexão com a API." };
  }
}