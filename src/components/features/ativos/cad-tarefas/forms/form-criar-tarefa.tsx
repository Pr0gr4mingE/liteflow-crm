"use client";

import { useEffect } from "react";
import { useCriarTarefa } from "@/hooks/ativos/cad-tarefas/use-cad-tarefa.hook";
import { CriarTarefaFormProps } from "@/shared/types/ui/ativos/tarefas/criar-tarefa-form.props";

export interface CriarTarefaFormExtendedProps extends CriarTarefaFormProps {
  onLoadingChange?: (loading: boolean) => void;
}

export function CriarTarefaForm({
  negociacaoId,
  clienteId,
  tipoNegociacao,
  onSuccess,
  onLoadingChange,
}: CriarTarefaFormExtendedProps) {
  const { criarTarefa, isLoading, erro } = useCriarTarefa();

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("negociacaoId", negociacaoId);
    if (clienteId) formData.append("clienteId", clienteId);
    formData.append("status", "PENDENTE");

    const sucesso = await criarTarefa(formData);
    if (sucesso && onSuccess) {
      onSuccess();
    }
  }

  return (
    <form id="form-criar-tarefa" onSubmit={onSubmit} className="flex flex-col gap-4">
      <fieldset disabled={isLoading} className="flex flex-col gap-4">
        {erro && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
            {erro}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="titulo" className="text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            name="titulo"
            id="titulo"
            required
            placeholder="Ex: Alinhar escopo do projeto"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="tipo" className="text-sm font-medium text-gray-700">
            Tipo de Tarefa
          </label>
          <select
            name="tipo"
            id="tipo"
            required
            className="border rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          >
            <option value="">Selecione o tipo...</option>
            <option value="LIGACAO">Ligação</option>
            <option value="EMAIL">E-mail</option>
            <option value="LEMBRETE">Lembrete</option>

            {tipoNegociacao === "PJ" ? (
              <>
                <option value="REUNIAO_APRESENTACAO">Reunião de Apresentação (B2B)</option>
                <option value="ENVIO_PROPOSTA">Envio de Proposta (B2B)</option>
              </>
            ) : (
              <>
                <option value="DISPARO_CAMPANHA">Disparo de Campanha (B2C)</option>
                <option value="LEMBRETE_RECOMPRA">Lembrete de Recompra (B2C)</option>
                <option value="ANALISE_DADOS">Análise de Dados (B2C)</option>
              </>
            )}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="dataVencimento" className="text-sm font-medium text-gray-700">
            Data de Vencimento
          </label>
          <input
            type="date"
            name="dataVencimento"
            id="dataVencimento"
            required
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="descricao" className="text-sm font-medium text-gray-700">
            Descrição (Opcional)
          </label>
          <textarea
            name="descricao"
            id="descricao"
            rows={3}
            placeholder="Detalhes adicionais sobre a tarefa..."
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          />
        </div>
      </fieldset>
    </form>
  );
}