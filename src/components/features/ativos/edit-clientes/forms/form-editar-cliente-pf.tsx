"use client";

import { useEffect } from "react";
// Import corrigido
import { useAtualizarClientePf } from "@/hooks/ativos/atualizar-clientes/use-atualizar-cliente-pf.hook";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";

export interface EditarClientePfFormProps {
  clienteAtual: ClientePf;
  onSuccess?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

export function EditarClientePfForm({
  clienteAtual,
  onSuccess,
  onLoadingChange,
}: EditarClientePfFormProps) {
  const { atualizarClientePf, isLoading, erro } = useAtualizarClientePf();

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const sucesso = await atualizarClientePf(clienteAtual.id, formData);
    if (sucesso && onSuccess) {
      onSuccess();
    }
  }

  return (
    <form id={`form-editar-cliente-pf-${clienteAtual.id}`} onSubmit={onSubmit} className="flex flex-col gap-4">
      <fieldset disabled={isLoading} className="flex flex-col gap-4">
        {erro && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{erro}</div>}

        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome</label>
          <input name="nome" id="nome" required defaultValue={clienteAtual.nome} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF</label>
          <input name="cpf" id="cpf" required defaultValue={clienteAtual.cpf} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
          <input type="email" name="email" id="email" required defaultValue={clienteAtual.email} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone</label>
          <input name="telefone" id="telefone" required defaultValue={clienteAtual.telefone} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
      </fieldset>
    </form>
  );
}