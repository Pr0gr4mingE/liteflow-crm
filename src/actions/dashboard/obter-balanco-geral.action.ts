"use server";

import { cookies } from "next/headers";
// 👇 Importação atualizada apontando para o arquivo singular na pasta UI
import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type";

export async function obterBalancoGeralAction(tipoFunil: "TODOS" | "PF" | "PJ" = "TODOS"): Promise<{ sucesso: boolean; dados?: BalancoGeralResponse; mensagem?: string }> {
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("session_token")?.value;

  if (!usuarioId) {
    return { sucesso: false, mensagem: "Usuário não autenticado." };
  }

  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/balanco-geral`);
    url.searchParams.append("tipo", tipoFunil);
    url.searchParams.append("usuarioId", usuarioId);

    const resposta = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 } 
    });

    if (!resposta.ok) {
      throw new Error("Falha ao buscar dados do dashboard");
    }

    const dados = await resposta.json();
    
    return { sucesso: true, dados };
  } catch (error) {
    console.error("[Action Error] Erro ao obter balanço geral:", error);
    return { sucesso: false, mensagem: "Erro ao carregar os dados do dashboard." };
  }
}