"use client";

import { useEffect } from "react";
// Import corrigido com base na nova estrutura de pastas
import { useAtualizarTarefa } from "@/hooks/ativos/atualizar-tarefas/use-atualizar-tarefa.hook";
import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

export interface EditarTarefaFormProps {
  tarefaAtual: Tarefa;
  tipoNegociacao?: "PF" | "PJ";
  onSuccess?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

export function EditarTarefaForm({
  tarefaAtual,
  tipoNegociacao = "PJ",
  onSuccess,
  onLoadingChange,
}: EditarTarefaFormProps) {
  const { atualizarTarefa, isLoading, erro } = useAtualizarTarefa();

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const sucesso = await atualizarTarefa(tarefaAtual.id, formData);
    if (sucesso && onSuccess) {
      onSuccess();
    }
  }

  const dataVencimentoStr = tarefaAtual.dataVencimento 
    ? new Date(tarefaAtual.dataVencimento).toISOString().split("T")[0]
    : "";

  return (
    <form id={`form-editar-tarefa-${tarefaAtual.id}`} onSubmit={onSubmit} className="flex flex-col gap-4">
      <fieldset disabled={isLoading} className="flex flex-col gap-4">
        {erro && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{erro}</div>}

        <div className="flex flex-col gap-1">
          <label htmlFor="titulo" className="text-sm font-medium text-gray-700">Título</label>
          <input
            name="titulo"
            id="titulo"
            required
            defaultValue={tarefaAtual.titulo}
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="tipo" className="text-sm font-medium text-gray-700">Tipo de Tarefa</label>
          <select
            name="tipo"
            id="tipo"
            required
            defaultValue={tarefaAtual.tipo}
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
          <label htmlFor="dataVencimento" className="text-sm font-medium text-gray-700">Data de Vencimento</label>
          <input
            type="date"
            name="dataVencimento"
            id="dataVencimento"
            required
            defaultValue={dataVencimentoStr}
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="descricao" className="text-sm font-medium text-gray-700">Descrição (Opcional)</label>
          <textarea
            name="descricao"
            id="descricao"
            rows={3}
            defaultValue={tarefaAtual.descricao || ""}
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          />
        </div>
      </fieldset>
    </form>
  );
}