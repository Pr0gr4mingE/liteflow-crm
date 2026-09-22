"use server";

import { ClientePjFormdata } from "@/shared/types/ui/formdata/ativos/cliente-pj.formdata";

export async function atualizarClientePjAction(id: string, dados: Partial<ClientePjFormdata>) {
  try {
    const resposta = await fetch(`${process.env.API_URL}/cliente-pj`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...dados }),
    });

    return await resposta.json();
  } catch (error) {
    console.error("[Action] Erro ao atualizar cliente PJ:", error);
    return { sucesso: false, mensagem: "Erro interno de comunicação ao atualizar cliente PJ." };
  }
}