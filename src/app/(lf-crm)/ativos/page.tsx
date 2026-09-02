// src/app/ativos/cadastro/page.tsx
"use client";

import { useState } from "react";
import { CadastroClientesFeature } from "@/components/features/ativos/cad-clientes/cad-cliente";
import { CadastroNegociacaoFeature } from "@/components/features/ativos/cad-negociacao/cad-negociacao";

export default function CadastroAtivosPage() {
  const [abaAtiva, setAbaAtiva] = useState<"CLIENTE" | "NEGOCIACAO">("CLIENTE");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cadastro de Ativos</h1>
          <p className="text-gray-500 mt-1">Gerencie seus clientes e abra novas negociações.</p>
        </div>
      </div>

      {/* Navegação Centralizada em Caixinhas */}
      <div className="flex justify-center w-full">
        <div className="flex bg-gray-100 p-1.5 rounded-lg border border-gray-200 shadow-sm gap-2">
          <button
            onClick={() => setAbaAtiva("CLIENTE")}
            className={`px-6 py-2.5 rounded-md text-sm transition-all duration-200 ${
              abaAtiva === "CLIENTE"
                ? "bg-white shadow font-semibold text-blue-600"
                : "text-gray-600 hover:bg-gray-200 font-medium"
            }`}
          >
            Novo Cliente
          </button>
          <button
            onClick={() => setAbaAtiva("NEGOCIACAO")}
            className={`px-6 py-2.5 rounded-md text-sm transition-all duration-200 ${
              abaAtiva === "NEGOCIACAO"
                ? "bg-white shadow font-semibold text-green-600"
                : "text-gray-600 hover:bg-gray-200 font-medium"
            }`}
          >
            Nova Negociação
          </button>
        </div>
      </div>

      {/* Renderização Totalmente Independente */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
        {abaAtiva === "CLIENTE" ? <CadastroClientesFeature /> : <CadastroNegociacaoFeature />}
      </div>

    </div>
  );
}