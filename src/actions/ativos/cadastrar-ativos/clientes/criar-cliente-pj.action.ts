// src/actions/ativos/cadastrar-ativos/clientes/criar-cliente-pj.action.ts
"use server";

import { cookies } from "next/headers";
import { ClientePjFormdata } from "@/shared/types/ui/formdata/ativos/cliente-pj.formdata";
import { SegmentoEmpresa } from "@/shared/utils/types/segmento-empresa.type";

export async function criarClientePjAction(formData: FormData) {
  // 1. Pegamos a chave de sessão do "bolso" do servidor
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("session_token")?.value;

  if (!usuarioId) {
    return { sucesso: false, mensagem: "Usuário não autenticado. Faça login novamente." };
  }

  // 2. Extração e tipagem baseada no DTO
  const payload: ClientePjFormdata = {
    razaoSocial: formData.get("razaoSocial") as string,
    nomeFantasia: formData.get("nomeFantasia") as string,
    cnpj: formData.get("cnpj") as string,
    segmento: formData.get("segmento") as SegmentoEmpresa,
    email: formData.get("email") as string,
    telefone: formData.get("telefone") as string,
  };

  // 3. Injetamos o ID do responsável no payload final
  const payloadDaApi = {
    ...payload,
    usuarioResponsavelId: usuarioId
  };

  try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cliente-pj`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadDaApi), 
    });

    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.mensagem || "Erro na API");

    return { sucesso: true, id: dados.id, mensagem: "Empresa criada com sucesso!" };
  } catch (error) {
    console.error("[Action Error] Erro ao criar Cliente PJ:", error);
    return { sucesso: false, mensagem: "Erro interno de conexão com a API." };
  }
}