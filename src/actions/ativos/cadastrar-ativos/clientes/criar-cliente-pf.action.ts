// src/actions/ativos/cadastrar-ativos/clientes/criar-cliente-pf.action.ts
"use server";

import { cookies } from "next/headers";
import { ClientePfFormdata } from "@/shared/types/ui/formdata/ativos/cliente-pf.formdata";

export async function criarClientePfAction(formData: FormData) {
  // 1. Pegamos a chave de sessão do "bolso" do servidor
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("session_token")?.value;

  if (!usuarioId) {
    return { sucesso: false, mensagem: "Usuário não autenticado. Faça login novamente." };
  }

  // 2. Extração e tipagem baseada no DTO
  const payload: ClientePfFormdata = {
    nome: formData.get("nome") as string,
    cpf: formData.get("cpf") as string,
    email: formData.get("email") as string,
    telefone: formData.get("telefone") as string,
  };

  // 3. Injetamos o ID do responsável no payload final
  const payloadDaApi = {
    ...payload,
    usuarioResponsavelId: usuarioId
  };

  try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cliente-pf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadDaApi), 
    });

    const dados = await resposta.json();

    if (!resposta.ok || !dados.sucesso) {
      return {
        sucesso: false,
        mensagem: dados.mensagem || "Não foi possível cadastrar o cliente.",
      };
    }

    return {
      sucesso: true,
      id: dados.dados?.id,
      mensagem: dados.mensagem || "Cliente PF criado com sucesso!",
    };
  } catch (error) {
    console.error("[Action Error] Erro ao criar Cliente PF:", error);
    return { sucesso: false, mensagem: "Erro interno de conexão com a API." };
  }
}