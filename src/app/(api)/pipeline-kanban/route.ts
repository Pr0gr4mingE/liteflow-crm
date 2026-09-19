import { NextRequest, NextResponse } from "next/server";
import { makeAtualizarFaseNegociacaoHandler } from "@/modules/pipeline/factories/atualizar-fase-negociacao.factory";

export async function PATCH(req: NextRequest) {
  try {
    const dadosEntrada = await req.json();
    
    const handler = makeAtualizarFaseNegociacaoHandler();
    const resposta = await handler.handle(dadosEntrada);

    if (!resposta.sucesso) {
      return NextResponse.json(resposta, { status: 400 });
    }

    return NextResponse.json(resposta, { status: 200 });
  } catch (error) {
    console.error("[API Pipeline PATCH] Erro crítico não tratado:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro fatal no servidor ao processar a mudança de fase da negociação." },
      { status: 500 }
    );
  }
}