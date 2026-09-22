"use server";

import { cookies } from "next/headers";
import { Usuario } from "@/shared/types/domain/agentes/IUsuario";

// Contrato para o Front-end (garantindo que a senha não vaze na tipagem)
export type UsuarioPerfil = Omit<Usuario, "senha">;

export async function buscarUsuarioLogadoAction(): Promise<UsuarioPerfil | null> {
  try {
    const cookieStore = await cookies();
    // Reutilizando o mesmo padrão de token que usamos nas tarefas
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) {
      console.warn("[Action] Nenhum token de sessão encontrado.");
      return null;
    }

    const resposta = await fetch(
      `${process.env.API_URL}/usuario?id=${usuarioId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // Dados de perfil não devem ter cache estático
      }
    );

    if (!resposta.ok) {
      return null;
    }
    
    const body = await resposta.json();
    
    // O retorno da nossa API vem encapsulado na propriedade "dados"
    return body.dados as UsuarioPerfil;
  } catch (error) {
    console.error("[Action Error] Erro ao buscar dados do usuário logado:", error);
    return null;
  }
}