// src/actions/ativos/buscar-ativos/clientes/listar-clientes-pf.action.ts
"use server";

export async function listarClientesPfAction() {
  try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cliente-pf`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", 
    });

    if (!resposta.ok) return [];
    return await resposta.json();
  } catch (error) {
    console.error("[Action Error] Erro ao listar clientes PF:", error);
    return [];
  }
}