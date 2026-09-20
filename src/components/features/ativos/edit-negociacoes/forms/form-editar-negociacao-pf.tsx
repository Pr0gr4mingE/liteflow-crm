"use client";

import { useEffect } from "react";
// Import corrigido
import { useAtualizarNegociacaoPf } from "@/hooks/ativos/atualizar-negociacoes/use-atualizar-negociacao-pf.hook";
import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";

export interface EditarNegociacaoPfFormProps {
  negociacaoAtual: NegociacaoPf;
  onSuccess?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

export function EditarNegociacaoPfForm({
  negociacaoAtual,
  onSuccess,
  onLoadingChange,
}: EditarNegociacaoPfFormProps) {
  const { atualizarNegociacaoPf, isLoading, erro } = useAtualizarNegociacaoPf();

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const sucesso = await atualizarNegociacaoPf(negociacaoAtual.id, formData);
    if (sucesso && onSuccess) {
      onSuccess();
    }
  }

  const dataPrevisaoStr = negociacaoAtual.dataPrevisaoFechamento 
    ? new Date(negociacaoAtual.dataPrevisaoFechamento).toISOString().split("T")[0]
    : "";

  return (
    <form id={`form-editar-negociacao-pf-${negociacaoAtual.id}`} onSubmit={onSubmit} className="flex flex-col gap-4">
      <fieldset disabled={isLoading} className="flex flex-col gap-4">
        {erro && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{erro}</div>}

        <div className="flex flex-col gap-1">
          <label htmlFor="titulo" className="text-sm font-medium text-gray-700">Título da Negociação</label>
          <input name="titulo" id="titulo" required defaultValue={negociacaoAtual.titulo} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="valor" className="text-sm font-medium text-gray-700">Valor Estimado</label>
          <input type="number" step="0.01" name="valor" id="valor" required defaultValue={negociacaoAtual.valor} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fase" className="text-sm font-medium text-gray-700">Fase Atual</label>
          <select name="fase" id="fase" required defaultValue={negociacaoAtual.fase} className="border rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300">
            <option value="PROSPECCAO">Prospecção</option>
            <option value="QUALIFICACAO">Qualificação</option>
            <option value="PROPOSTA">Proposta</option>
            <option value="NEGOCIACAO">Negociação</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dataPrevisaoFechamento" className="text-sm font-medium text-gray-700">Previsão de Fechamento</label>
          <input type="date" name="dataPrevisaoFechamento" id="dataPrevisaoFechamento" defaultValue={dataPrevisaoStr} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="descricao" className="text-sm font-medium text-gray-700">Descrição (Opcional)</label>
          <textarea name="descricao" id="descricao" rows={3} defaultValue={negociacaoAtual.descricao || ""} className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
        </div>
      </fieldset>
    </form>
  );
}