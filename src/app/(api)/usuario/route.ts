import { NextRequest, NextResponse } from "next/server";
import { makeCriarUsuarioHandler } from "@/modules/usuario/factories/criar-usuario.factory";
import { makeBuscarUsuarioPorIdHandler } from "@/modules/usuario/factories/buscar-usuario.factory";

export async function POST(req: NextRequest) {
  try {
    const dadosEntrada = await req.json(); // No Next.js App Router, o body é extraído assim
    
    const handler = makeCriarUsuarioHandler();
    const resposta = await handler.handle(dadosEntrada);

    if (!resposta.sucesso) {
      return NextResponse.json(resposta, { status: 400 });
    }

    return NextResponse.json(resposta, { status: 201 });
  } catch (error) {
    console.error("[API Usuario] Erro não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Extrai o ID da URL (ex: /api/usuario?id=123)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { sucesso: false, mensagem: "ID do usuário não fornecido." },
        { status: 400 }
      );
    }

    const handler = makeBuscarUsuarioPorIdHandler();
    const resposta = await handler.handle(id);

    if (!resposta.sucesso) {
      // Retorna 404 se a mensagem indicar que não achou, senão 400
      const statusError = resposta.mensagem === "Usuário não encontrado." ? 404 : 400;
      return NextResponse.json(resposta, { status: statusError });
    }

    return NextResponse.json(resposta, { status: 200 });
  } catch (error) {
    console.error("[API Usuario GET] Erro não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}