// src/actions/tarefas/criar-tarefa.action.ts
"use server";

import { cookies } from "next/headers";
import { CriarTarefaFormData } from "@/shared/types/ui/formdata/ativos/tarefas.formdata";
import { StatusTarefa } from "@/shared/utils/types/status-tarefa.type";
import { TipoTarefa } from "@/shared/utils/types/tipo-tarefa.type";
import { TipoTarefaB2b } from "@/shared/utils/types/tipo-tarefa-b2b.type";
import { TipoTarefaB2c } from "@/shared/utils/types/tipo-tarefa-b2c.type";
import { formatarDataParaApi } from "@/shared/utils/formatacao/data-iso-8601.util";

export async function criarTarefaAction(formData: FormData) {
  // 1. Valida a autenticação
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("session_token")?.value;

  if (!usuarioId) {
    return { sucesso: false, mensagem: "Usuário não autenticado. Faça login novamente." };
  }

  // Extração segura de campos opcionais
  const clienteId = formData.get("clienteId") as string | null;
  const negociacaoId = formData.get("negociacaoId") as string | null;
  const dataVencimentoStr = formData.get("dataVencimento") as string;

  const dataVencimentoISO = formatarDataParaApi(dataVencimentoStr);

  // 2. Extrai e tipa os dados do formulário nativo (FormData)
  const payload: CriarTarefaFormData = {
    titulo: formData.get("titulo") as string,
    tipo: formData.get("tipo") as TipoTarefa | TipoTarefaB2b | TipoTarefaB2c,
    status: formData.get("status") as StatusTarefa,
    descricao: (formData.get("descricao") as string) || undefined,
    dataVencimento: dataVencimentoISO ? new Date(dataVencimentoISO) : new Date(),
    clienteId: clienteId || undefined,
    negociacaoId: negociacaoId || undefined,
  };

  // 3. Injeta o usuarioResponsavelId no payload final
  const payloadDaApi = {
    ...payload,
    usuarioResponsavelId: usuarioId,
    dataVencimento: dataVencimentoISO,
  };

  try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tarefa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadDaApi),
    });

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok || !dados.sucesso) {
      return {
        sucesso: false,
        mensagem: dados.mensagem || dados.error || "Não foi possível criar a tarefa.",
      };
    }

    return { sucesso: true, mensagem: dados.mensagem || "Tarefa criada com sucesso!" };
  } catch (error) {
    console.error("[Action Error] Erro ao criar Tarefa:", error);
    return { sucesso: false, mensagem: "Erro interno de conexão com a API." };
  }
}