"use server";

import { ClientePfFormdata } from "@/shared/types/ui/formdata/ativos/cliente-pf.formdata";

export async function atualizarClientePfAction(id: string, dados: Partial<ClientePfFormdata>) {
  try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cliente-pf`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...dados }),
    });

    return await resposta.json();
  } catch (error) {
    console.error("[Action] Erro ao atualizar cliente PF:", error);
    return { sucesso: false, mensagem: "Erro interno de comunicação ao atualizar cliente PF." };
  }
}