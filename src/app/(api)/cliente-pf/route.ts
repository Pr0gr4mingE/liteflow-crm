import { NextRequest, NextResponse } from "next/server";
import { makeCriarClientePfHandler } from "@/modules/cliente-pf/factories/criar-cliente-pf.factory";
import { makeListarClientesPfHandler } from "@/modules/cliente-pf/factories/listar-cliente-pf.factory";
import { makeAtualizarClientePfHandler } from "@/modules/cliente-pf/factories/atualizar-cliente-pf.factory";
import { makeDeletarClientePfHandler } from "@/modules/cliente-pf/factories/deletar-cliente-pf.factory";

export async function POST(req: NextRequest) {
  try {
    const dadosEntrada = await req.json();
    
    const handler = makeCriarClientePfHandler();
    const resposta = await handler.handle(dadosEntrada);

    if (!resposta.sucesso) {
      return NextResponse.json(resposta, { status: 400 });
    }

    return NextResponse.json(resposta, { status: 201 });
  } catch (error) {
    console.error("[API Cliente PF] Erro não tratado:", error);
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

    const handler = makeListarClientesPfHandler();
    const resposta = await handler.handle(usuarioId);

    return NextResponse.json(resposta, { status: 200 });
  } catch (error) {
    console.error("[API Cliente PF GET] Erro não tratado:", error);
    return NextResponse.json({ sucesso: false, mensagem: "Erro interno" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...dados } = body;

  const handler = makeAtualizarClientePfHandler();
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

    const handler = makeDeletarClientePfHandler();
    const resposta = await handler.handle(id);

    return NextResponse.json(resposta, { status: resposta.sucesso ? 200 : 400 });
  } catch (error) {
    console.error("[API Cliente PF DELETE] Erro não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}