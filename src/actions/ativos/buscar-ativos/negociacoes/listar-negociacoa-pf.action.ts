"use server";

import { cookies } from "next/headers";
import { NegociacaoPfListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pf-listagem.type";

export async function listarNegociacoesPfAction(): Promise<NegociacaoPfListagem[]> {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) return [];

    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/negociacao-pf?usuarioId=${usuarioId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!resposta.ok) return [];
    return (await resposta.json()) as NegociacaoPfListagem[];
  } catch (error) {
    console.error("[Action Error] Erro ao listar negociações PF:", error);
    return [];
  }
}
