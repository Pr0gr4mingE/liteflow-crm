"use server";
import { cookies } from "next/headers";

export async function listarNegociacoesPjAction() {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) return [];

    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/negociacao-pj?usuarioId=${usuarioId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!resposta.ok) return [];
    return await resposta.json();
  } catch (error) {
    console.error("[Action Error] Erro ao listar negociações PJ:", error);
    return [];
  }
}