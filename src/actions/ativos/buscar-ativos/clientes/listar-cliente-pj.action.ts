"use server";

import { cookies } from "next/headers";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";

export async function listarClientesPjAction(): Promise<ClientePj[]> {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) return [];

    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cliente-pj?usuarioId=${usuarioId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!resposta.ok) return [];
    return (await resposta.json()) as ClientePj[];
  } catch (error) {
    console.error("[Action Error] Erro ao listar clientes PJ:", error);
    return [];
  }
}
