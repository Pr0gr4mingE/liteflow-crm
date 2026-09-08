"use server";

import { cookies } from "next/headers";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";

export async function listarClientesPfAction(): Promise<ClientePf[]> {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) return [];

    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cliente-pf?usuarioId=${usuarioId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!resposta.ok) return [];
    return (await resposta.json()) as ClientePf[];
  } catch (error) {
    console.error("[Action Error] Erro ao listar clientes PF:", error);
    return [];
  }
}
