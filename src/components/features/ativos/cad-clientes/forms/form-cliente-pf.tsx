// src/features/ativos/cad-clientes/forms/form-cliente-pf.tsx
"use client";

import { useCadastrarClientePf } from "@/hooks/ativos/cad-clientes/use-cad-cliente-pf.hook";

export function FormClientePf() {
  const { cadastrar, isPending, erro } = useCadastrarClientePf();

  const handleSubmit = async (formData: FormData) => {
    const { sucesso, id } = await cadastrar(formData);
    
    if (sucesso && id) {
      console.log("Cliente PF criado com Sucesso! ID:", id);
      // Futuro: adicionar toast de sucesso ou limpar o formulário
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome Completo *</label>
          <input type="text" id="nome" name="nome" required className="border p-2 rounded" placeholder="Ex: Bruce Wayne" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF *</label>
          <input type="text" id="cpf" name="cpf" required className="border p-2 rounded" placeholder="000.000.000-00" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone *</label>
          <input type="tel" id="telefone" name="telefone" required className="border p-2 rounded" placeholder="(00) 90000-0000" />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail *</label>
          <input type="email" id="email" name="email" required className="border p-2 rounded" placeholder="bruce@wayne.com" />
        </div>
      </div>

      {erro && (
        <div className="p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
          {erro}
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Criando Contato..." : "Criar Contato PF"}
        </button>
      </div>
    </form>
  );
}