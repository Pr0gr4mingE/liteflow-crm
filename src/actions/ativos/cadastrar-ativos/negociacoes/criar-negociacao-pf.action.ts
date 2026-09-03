// src/actions/ativos/cadastrar-ativos/negociacoes/criar-negociacao-pf.action.ts
"use server";

import { cookies } from "next/headers";
import { NegociacaoPfFormdata } from "@/shared/types/ui/formdata/ativos/negociacao-pf.formdata";
import { FaseNegociacaoPf } from "@/shared/utils/types/fase-negociacao-pf.type";

export async function criarNegociacaoPfAction(formData: FormData) {
  // 1. Valida a autenticação
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("session_token")?.value;

  if (!usuarioId) {
    return { sucesso: false, mensagem: "Usuário não autenticado. Faça login novamente." };
  }

  const clienteId = formData.get("clienteId") as string; 
  const dataPrevisaoStr = formData.get("dataPrevisaoFechamento") as string;

  const payload: NegociacaoPfFormdata = {
    titulo: formData.get("titulo") as string,
    valor: Number(formData.get("valor")),
    fase: formData.get("fase") as FaseNegociacaoPf,
    descricao: formData.get("descricao") as string || undefined,
    dataPrevisaoFechamento: dataPrevisaoStr ? new Date(dataPrevisaoStr) : undefined,
  };

  // 2. Injeta o clienteId e o usuarioResponsavelId no payload final
  const payloadDaApi = {
    ...payload,
    clienteId,
    usuarioResponsavelId: usuarioId,
  };

  try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/negociacao-pf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadDaApi), 
    });

    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.mensagem || "Erro na API");

    return { sucesso: true, mensagem: "Negociação PF criada com sucesso!" };
  } catch (error) {
    console.error("[Action Error] Erro ao criar Negociação PF:", error);
    return { sucesso: false, mensagem: "Erro interno de conexão com a API." };
  }
}