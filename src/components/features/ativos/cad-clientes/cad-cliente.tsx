// src/features/ativos/cad-clientes/CadastroClientesFeature.tsx
"use client";

import { useState } from "react";
import { FormClientePf } from "./forms/form-cliente-pf";
import { FormClientePj } from "./forms/form-cliente-pj";

export function CadastroClientesFeature() {
  const [tipoPessoa, setTipoPessoa] = useState<"PF" | "PJ">("PF");

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow border border-gray-100">
      <div className="border-b p-4 flex justify-between items-center bg-gray-50 rounded-t">
        <h2 className="text-xl font-semibold text-gray-800">
          Cadastrar Novo Cliente
        </h2>
        <div className="flex bg-gray-200 p-1 rounded">
          <button
            onClick={() => setTipoPessoa("PF")}
            className={`px-4 py-1 rounded text-sm transition-colors ${
              tipoPessoa === "PF" ? "bg-white shadow font-medium text-blue-600" : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            Pessoa Física (PF)
          </button>
          <button
            onClick={() => setTipoPessoa("PJ")}
            className={`px-4 py-1 rounded text-sm transition-colors ${
              tipoPessoa === "PJ" ? "bg-white shadow font-medium text-blue-600" : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            Pessoa Jurídica (PJ)
          </button>
        </div>
      </div>

      <div className="p-6">
        {tipoPessoa === "PF" 
          ? <FormClientePf /> 
          : <FormClientePj />
        }
      </div>
    </div>
  );
}