"use server";

import { cookies } from "next/headers";
import { NegociacaoPfListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pf-listagem.type";
import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";

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
    const dados = await resposta.json();

    // Responsabilidade Única: Garantir a integridade do tipo Date antes de entregar ao Client
    return dados.map((negociacao: NegociacaoPf) => ({
      ...negociacao,
      dataCriacao: negociacao.dataCriacao ? new Date(negociacao.dataCriacao) : undefined,
      dataAtualizacao: negociacao.dataAtualizacao ? new Date(negociacao.dataAtualizacao) : undefined,
      dataPrevisaoFechamento: negociacao.dataPrevisaoFechamento ? new Date(negociacao.dataPrevisaoFechamento) : undefined,
    })) as NegociacaoPfListagem[];



  } catch (error) {
    console.error("[Action Error] Erro ao listar negociações PF:", error);
    return [];

  }
}