import { NextRequest, NextResponse } from "next/server";
import { makeCriarTarefaHandler } from "@/modules/tarefa/factories/criar-tarefa.factory";
import { makeListarTarefasHandler } from "@/modules/tarefa/factories/listar-tarefa.factory";
import { makeAtualizarTarefaHandler } from "@/modules/tarefa/factories/atualizar-tarefa.factory";

export async function POST(req: NextRequest) {
  try {
    const dadosEntrada = await req.json();
    
    const handler = makeCriarTarefaHandler();
    const resposta = await handler.handle(dadosEntrada);

    if (!resposta.sucesso) {
      return NextResponse.json(resposta, { status: 400 });
    }

    return NextResponse.json(resposta, { status: 201 });
  } catch (error) {
    console.error("[API Tarefa] Erro não tratado:", error);
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
      return NextResponse.json({ sucesso: false, mensagem: "ID do usuário não fornecido" }, { status: 400 });
    }

    const handler = makeListarTarefasHandler();
    const resposta = await handler.handle(usuarioId);

    return NextResponse.json(resposta, { status: 200 });
  } catch (error) {
    console.error("[API Tarefa GET] Erro não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno no servidor." }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...dados } = body;

  const handler = makeAtualizarTarefaHandler();
  const response = await handler.handle(id, dados);

  return NextResponse.json(response, { status: response.sucesso ? 200 : 400 });
}