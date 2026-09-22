"use server";

import { NegociacaoPfFormdata } from "@/shared/types/ui/formdata/ativos/negociacao-pf.formdata";

export async function atualizarNegociacaoPfAction(id: string, dados: Partial<NegociacaoPfFormdata>) {
  try {
    const resposta = await fetch(`${process.env.API_URL}/negociacao-pf`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...dados }),
    });

    return await resposta.json();
  } catch (error) {
    console.error("[Action] Erro ao atualizar negociação PF:", error);
    return { sucesso: false, mensagem: "Erro interno de comunicação ao atualizar negociação PF." };
  }
}