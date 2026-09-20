import { NextRequest, NextResponse } from "next/server";
import { makeCriarNegociacaoPjHandler } from "@/modules/negociacao-pj/factories/criar-negociacao-pj.factory";
import { makeListarNegociacoesPjHandler } from "@/modules/negociacao-pj/factories/listar-negociacao-pj.factory";
import { makeAtualizarNegociacaoPjHandler } from "@/modules/negociacao-pj/factories/atualizar-negociacao-pj.factory";
import { makeDeletarNegociacaoPjHandler } from "@/modules/negociacao-pj/factories/deletar-negociacao-pj.factory";

export async function POST(req: NextRequest) {
  try {
    const dadosEntrada = await req.json();
    
    const handler = makeCriarNegociacaoPjHandler();
    const resposta = await handler.handle(dadosEntrada);

    if (!resposta.sucesso) {
      return NextResponse.json(resposta, { status: 400 });
    }

    return NextResponse.json(resposta, { status: 201 });
  } catch (error) {
    console.error("[API Negociação PJ] Erro não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const usuarioId = searchParams.get("usuarioId");

    if (!usuarioId) {
      return NextResponse.json({ sucesso: false, mensagem: "ID não fornecido" }, { status: 400 });
    }

    const handler = makeListarNegociacoesPjHandler();
    const resposta = await handler.handle(usuarioId);

    return NextResponse.json(resposta, { status: 200 });
  } catch (error) {
    console.error("[API Negociacao PF GET] Erro não tratado:", error);
    return NextResponse.json({ sucesso: false, mensagem: "Erro interno" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...dados } = body;

  const handler = makeAtualizarNegociacaoPjHandler();
  const response = await handler.handle(id, dados);

  return NextResponse.json(response, { status: response.sucesso ? 200 : 400 });
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { sucesso: false, mensagem: "ID não fornecido para exclusão." },
        { status: 400 }
      );
    }

    const handler = makeDeletarNegociacaoPjHandler();
    const resposta = await handler.handle(id);

    return NextResponse.json(resposta, { status: resposta.sucesso ? 200 : 400 });
  } catch (error) {
    console.error("[API Negociacao PJ DELETE] Erro não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}