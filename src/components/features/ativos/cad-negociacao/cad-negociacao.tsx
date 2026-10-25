// src/features/ativos/cad-negociacao/CadastroNegociacaoFeature.tsx
"use client";

import { useState } from "react";
import { FormNegociacaoPf } from "./forms/form-negociacao-pf";
import { FormNegociacaoPj } from "./forms/form-negociacao-pj";

export function CadastroNegociacaoFeature() {
  const [tipoNegociacao, setTipoNegociacao] = useState<"PF" | "PJ">("PF");

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow border border-gray-100">
      <div className="border-b p-4 flex justify-between items-center bg-gray-50 rounded-t">
        <h2 className="text-xl font-semibold text-gray-800">
          Nova Negociação
        </h2>
        <div className="flex w-full sm:w-max bg-gray-200 p-1 rounded">
          <button
            onClick={() => setTipoNegociacao("PF")}
            className={`flex-1 sm:flex-none px-2 py-1 sm:px-4 sm:py-1 rounded text-xs sm:text-sm transition-colors ${
              tipoNegociacao === "PF" ? "bg-white shadow font-medium text-green-600" : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            Contato (PF)
          </button>
          <button
            onClick={() => setTipoNegociacao("PJ")}
            className={`flex-1 sm:flex-none px-2 py-1 sm:px-4 sm:py-1 rounded text-xs sm:text-sm transition-colors ${
              tipoNegociacao === "PJ" ? "bg-white shadow font-medium text-green-600" : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            Conta (PJ)
          </button>
        </div>
      </div>

      <div className="p-6">
        {tipoNegociacao === "PF" 
          ? <FormNegociacaoPf /> 
          : <FormNegociacaoPj />
        }
      </div>
    </div>
  );
}