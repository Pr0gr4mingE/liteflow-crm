"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { AtualizarUsuarioDTO } from "@/modules/usuario/dto/atualizar-usuario.dto";
import { UsuarioPerfil } from "./buscar-usuario-logado.action";

export interface RespostaAtualizarAction {
  sucesso: boolean;
  mensagem: string;
  dados?: UsuarioPerfil;
}

export async function atualizarUsuarioAction(dados: AtualizarUsuarioDTO): Promise<RespostaAtualizarAction> {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) {
      return { sucesso: false, mensagem: "Sessão expirada. Faça login novamente." };
    }

    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/usuario?id=${usuarioId}`,
      {
        method: "PATCH", // O mesmo verbo que configuramos na API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      }
    );

    const resultado = await resposta.json();

    if (resultado.sucesso) {
      // Força o Next.js a limpar o cache do layout. 
      // Útil caso você tenha o nome do usuário aparecendo no Header ou Sidebar!
      revalidatePath("/", "layout");
    }

    return resultado;
  } catch (error) {
    console.error("[Action Error] Erro ao atualizar perfil:", error);
    return { sucesso: false, mensagem: "Erro ao se comunicar com o servidor." };
  }
}