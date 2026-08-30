import { NextRequest, NextResponse } from "next/server";
import { makeLoginUseCase } from "@/modules/auth/factories/criar-login.factory";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const useCase = makeLoginUseCase();
    const resposta = await useCase.execute(body);

    return NextResponse.json(resposta, { status: resposta.sucesso ? 200 : 400 });
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}