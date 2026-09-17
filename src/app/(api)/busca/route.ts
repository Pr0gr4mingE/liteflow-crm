import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { makeBuscaGlobalHandler } from "@/modules/busca/factories/busca-global.factory";

export async function GET(req: NextRequest) {
  try {
    // Autenticação: Pegando quem está buscando
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("session_token")?.value;

    if (!usuarioId) {
      return NextResponse.json(
        { sucesso: false, mensagem: "Não autorizado." },
        { status: 401 }
      );
    }

    // Pega o que o usuário digitou (ex: /api/busca?q=Maria)
    const { searchParams } = new URL(req.url);
    const termo = searchParams.get("q") || "";

    // Aciona a máquina!
    const handler = makeBuscaGlobalHandler();
    const resposta = await handler.handle(termo, usuarioId);

    if (!resposta.sucesso) {
      return NextResponse.json(resposta, { status: 400 });
    }

    return NextResponse.json(resposta, { status: 200 });
  } catch (error) {
    console.error("[API Busca Global] Erro não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}