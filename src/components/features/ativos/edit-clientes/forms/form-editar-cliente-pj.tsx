"use client";

import { useEffect } from "react";
// Import corrigido
import { useAtualizarClientePj } from "@/hooks/ativos/atualizar-clientes/use-atualizar-cliente-pj.hook";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";

export interface EditarClientePjFormProps {
  clienteAtual: ClientePj;
  onSuccess?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

export function EditarClientePjForm({
  clienteAtual,
  onSuccess,
  onLoadingChange,
}: EditarClientePjFormProps) {
  const { atualizarClientePj, isLoading, erro } = useAtualizarClientePj();

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const sucesso = await atualizarClientePj(clienteAtual.id, formData);
    if (sucesso && onSuccess) {
      onSuccess();
    }
  }

  return (
    <form id={`form-editar-cliente-pj-${clienteAtual.id}`} onSubmit={onSubmit} className="flex flex-col gap-4">
      <fieldset disabled={isLoading} className="flex flex-col gap-4">
        {erro && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{erro}</div>}

        <div className="flex flex-col gap-1">
          <label htmlFor="razaoSocial" className="text-sm font-medium text-gray-700">Razão Social</label>
          <input name="razaoSocial" id="razaoSocial" required defaultValue={clienteAtual.razaoSocial} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="nomeFantasia" className="text-sm font-medium text-gray-700">Nome Fantasia</label>
          <input name="nomeFantasia" id="nomeFantasia" required defaultValue={clienteAtual.nomeFantasia} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cnpj" className="text-sm font-medium text-gray-700">CNPJ</label>
          <input name="cnpj" id="cnpj" required defaultValue={clienteAtual.cnpj} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
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