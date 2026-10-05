"use server";

import { cookies } from "next/headers";
import { IRespostaDTO } from "@/shared/utils/dto/IResposta-padrao.dto";

export async function deletarContaAction(id: string): Promise<IRespostaDTO> {
  console.log("2. [ACTION] Recebeu o comando para deletar ID:", id);
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    const urlDaApi = `${process.env.API_URL}/usuario?id=${id}`;
    console.log("2.1 [ACTION] Fazendo fetch para URL:", urlDaApi);

    const resposta = await fetch(urlDaApi, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Se o token for null, envia null (cuidado se sua API barrar isso)
        },
        cache: "no-store",
    });

    console.log("2.2 [ACTION] Status HTTP da resposta da API:", resposta.status);

    if (!resposta.ok) {
      const errorData = await resposta.json().catch(() => null);
      console.log("2.3 [ACTION] API retornou erro:", errorData);
      return { 
        sucesso: false, 
        mensagem: errorData?.mensagem || errorData?.erro || "Erro na API." 
      };
    }

    cookieStore.delete("session_token");
    const data = await resposta.json();
    console.log("2.4 [ACTION] API retornou sucesso:", data);
    
    return data as IRespostaDTO;
  } catch (error) {
    console.error("2.X [ACTION] Erro no catch:", error);
    return { sucesso: false, mensagem: "Erro interno na action." };
  }
}