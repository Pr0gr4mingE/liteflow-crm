"use server";

import { NegociacaoPjFormdata } from "@/shared/types/ui/formdata/ativos/negociacao-pj.formdata";

export async function atualizarNegociacaoPjAction(id: string, dados: Partial<NegociacaoPjFormdata>) {
  try {
    const resposta = await fetch(`${process.env.API_URL}/negociacao-pj`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...dados }),
    });

    return await resposta.json();
  } catch (error) {
    console.error("[Action] Erro ao atualizar negociação PJ:", error);
    return { sucesso: false, mensagem: "Erro interno de comunicação ao atualizar negociação PJ." };
  }
}