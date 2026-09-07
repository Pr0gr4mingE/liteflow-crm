// src/actions/dashboard/obter-balanco-geral.action.ts
"use server";

import { cookies } from "next/headers";
import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type";
import { rehidratarData } from "@/shared/utils/formatacao/rehidratar-data.util"; // Ajuste para o caminho real do seu utilitário
import { TarefaBruta } from "@/shared/types/ui/dashboard/dados-brutos/tarefa-bruta";
import { NegociacaoBruta } from "@/shared/types/ui/dashboard/dados-brutos/negociacao-bruta";

type TarefaCrua = Omit<TarefaBruta, "dataVencimento"> & { 
  dataVencimento: string; 
};

type NegociacaoCrua = Omit<NegociacaoBruta, "dataPrevisaoFechamento"> & { 
  dataPrevisaoFechamento: string; 
};

export async function obterBalancoGeralAction(tipoFunil: "TODOS" | "PF" | "PJ" = "TODOS"): Promise<{ sucesso: boolean; dados?: BalancoGeralResponse; mensagem?: string }> {
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("session_token")?.value;

  if (!usuarioId) {
    return { sucesso: false, mensagem: "Usuário não autenticado." };
  }

  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`);
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

    const payload = await resposta.json();
    const dadosCrus = payload.dados || payload;

    // Hidratação: Intercepta as strings ISO que vieram do JSON e reconverte para objetos Date blindados
    const dadosHidratados: BalancoGeralResponse = {
      ...dadosCrus,
      tarefasProximas: dadosCrus.tarefasProximas.map((tarefa: TarefaCrua) => ({
        ...tarefa,
        dataVencimento: rehidratarData(tarefa.dataVencimento)
      })),
      negociacoesProximas: dadosCrus.negociacoesProximas.map((neg: NegociacaoCrua) => ({
        ...neg,
        dataPrevisaoFechamento: rehidratarData(neg.dataPrevisaoFechamento)
      }))
    };
    
    return { 
      sucesso: payload.sucesso ?? true, 
      dados: dadosHidratados,
      mensagem: payload.mensagem
    };
  } catch (error) {
    console.error("[Action Error] Erro ao obter balanço geral:", error);
    return { sucesso: false, mensagem: "Erro ao carregar os dados do dashboard." };
  }
}