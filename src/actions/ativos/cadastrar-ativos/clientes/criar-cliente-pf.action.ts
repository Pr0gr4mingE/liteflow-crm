"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache"; // 1. Import adicionado
import { ClientePfFormdata } from "@/shared/types/ui/formdata/ativos/cliente-pf.formdata";

export async function criarClientePfAction(formData: FormData) {
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("session_token")?.value;

  if (!usuarioId) {
    return { sucesso: false, mensagem: "Usuário não autenticado. Faça login novamente." };
  }

  const payload: ClientePfFormdata = {
    nome: formData.get("nome") as string,
    cpf: formData.get("cpf") as string,
    email: formData.get("email") as string,
    telefone: formData.get("telefone") as string,
  };

  const payloadDaApi = {
    ...payload,
    usuarioResponsavelId: usuarioId
  };

  try {
    const resposta = await fetch(`${process.env.API_URL}/cliente-pf`, {
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

    // 2. O PULO DO GATO: Limpa o cache da página após o sucesso da API
    revalidatePath("/ativos");

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