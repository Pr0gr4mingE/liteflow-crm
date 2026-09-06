"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button";
import { CriarTarefaForm } from "./forms/form-criar-tarefa";

interface CriarTarefaModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Recebe apenas o essencial para renderizar o form
  negociacaoSelecionada: { id: string; tipo: "PF" | "PJ" } | null;
}

export function CadastroTarefaFeature({ isOpen, onClose, negociacaoSelecionada }: CriarTarefaModalProps) {
  const [isSalvando, setIsSalvando] = useState(false);

  // Previne renderização desnecessária se não houver negociação
  if (!isOpen || !negociacaoSelecionada) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo="Nova Tarefa"
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSalvando}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="form-criar-tarefa"
            variant="primary"
            disabled={isSalvando}
          >
            {isSalvando ? "Salvando..." : "Salvar Tarefa"}
          </Button>
        </>
      }
    >
      <CriarTarefaForm
        negociacaoId={negociacaoSelecionada.id}
        tipoNegociacao={negociacaoSelecionada.tipo}
        onSuccess={onClose}
        onLoadingChange={setIsSalvando}
      />
    </Modal>
  );
}