"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button";
import { EditarTarefaForm } from "./forms/form-editar-tarefa";
import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

interface EditarTarefaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tarefaSelecionada: Tarefa | null;
  tipoNegociacao?: "PF" | "PJ";
  onSuccess: () => void;
}

export function EditarTarefaFeature({ 
  isOpen, 
  onClose, 
  tarefaSelecionada, 
  tipoNegociacao,
  onSuccess
}: EditarTarefaModalProps) {
  const [isSalvando, setIsSalvando] = useState(false);

  if (!isOpen || !tarefaSelecionada) return null;

  const formId = `form-editar-tarefa-${tarefaSelecionada.id}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Tarefa"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSalvando}>Cancelar</Button>
          <Button type="submit" form={formId} variant="primary" disabled={isSalvando}>
            {isSalvando ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </>
      }
    >
      <EditarTarefaForm
        tarefaAtual={tarefaSelecionada}
        tipoNegociacao={tipoNegociacao}
        onSuccess={onSuccess}
        onLoadingChange={setIsSalvando}
      />
    </Modal>
  );
}