"use server";

import { cookies } from "next/headers";
import { RespostaBuscaGlobalDTO } from "@/modules/busca/dto/resposta-busca-global.dto";

export async function buscaGlobalAction(termo: string): Promise<RespostaBuscaGlobalDTO> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return { sucesso: false, mensagem: "Sessão expirada. Faça login novamente." };
    }

    if (!termo || termo.trim().length < 2) {
      return { sucesso: true, mensagem: "Termo muito curto.", dados: [] };
    }

    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/busca?q=${encodeURIComponent(termo.trim())}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_token=${sessionToken}`,
        },
        cache: "no-store",
      }
    );

    // 1. Trata erros HTTP (ex: 400, 401, 500) que o fetch não joga pro catch automaticamente
    if (!resposta.ok) {
      const erroPayload = await resposta.json().catch(() => null);
      return {
        sucesso: false,
        mensagem: erroPayload?.mensagem || `Servidor recusou a busca (Status: ${resposta.status}).`
      };
    }

    const resultado: RespostaBuscaGlobalDTO = await resposta.json();
    return resultado;

  } catch (error) {
    console.error("[Action Error] Erro na busca global:", error);
    
    // 2. Refina a mensagem do catch baseada no tipo real do erro
    let mensagemExata = "Falha inesperada ao tentar realizar a busca.";
    
    if (error instanceof Error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        mensagemExata = "Servidor de busca indisponível. Verifique sua conexão com a internet ou contate o suporte.";
      } else if (error.name === "SyntaxError") {
        mensagemExata = "Erro ao processar a resposta do servidor (formato inválido).";
      }
    }

    return { sucesso: false, mensagem: mensagemExata };
  }
}