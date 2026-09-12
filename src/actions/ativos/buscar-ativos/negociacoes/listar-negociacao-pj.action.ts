"use server";

import { cookies } from "next/headers";
import { NegociacaoPjListagem } from "@/shared/types/ui/listagem/negociacoes/negociacao-pj-listagem.type";
import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

export async function listarNegociacoesPjAction(): Promise<NegociacaoPjListagem[]> {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) return [];
    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/negociacao-pj?usuarioId=${usuarioId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!resposta.ok) return [];
    const dados = await resposta.json();

    // Responsabilidade Única: Garantir a integridade do tipo Date antes de entregar ao Client
    return dados.map((negociacao: NegociacaoPj) => ({
      ...negociacao,
      dataCriacao: negociacao.dataCriacao ? new Date(negociacao.dataCriacao) : undefined,
      dataAtualizacao: negociacao.dataAtualizacao ? new Date(negociacao.dataAtualizacao) : undefined,
      dataPrevisaoFechamento: negociacao.dataPrevisaoFechamento ? new Date(negociacao.dataPrevisaoFechamento) : undefined,
    })) as NegociacaoPjListagem[];
  } catch (error) {
    console.error("[Action Error] Erro ao listar negociações PJ:", error);
    return [];
  }
} 

