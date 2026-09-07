import { NextRequest, NextResponse } from "next/server";
import { makeObterBalancoGeralHandler } from "@/modules/dashboard/factories/obter-balanco-geral.factory";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const usuarioId = searchParams.get("usuarioId");
    const tipo = searchParams.get("tipo") || "TODOS";

    if (!usuarioId) {
      return NextResponse.json(
        { sucesso: false, mensagem: "ID não fornecido" }, 
        { status: 400 }
      );
    }

    const handler = makeObterBalancoGeralHandler();
    const resposta = await handler.handle(usuarioId, tipo);

    return NextResponse.json(resposta, { status: 200 });
  } catch (error) {
    console.error("[API Dashboard GET] Erro não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno" }, 
      { status: 500 }
    );
  }
}