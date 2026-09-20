"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button";
import { EditarNegociacaoPfForm } from "./forms/form-editar-negociacao-pf";
import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";

interface EditarNegociacaoPfModalProps {
  isOpen: boolean;
  onClose: () => void;
  negociacaoSelecionada: NegociacaoPf | null;
  onSuccess: () => void;
}

export function EditarNegociacaoPfFeature({ isOpen, onClose, negociacaoSelecionada, onSuccess }: EditarNegociacaoPfModalProps) {
  const [isSalvando, setIsSalvando] = useState(false);

  if (!isOpen || !negociacaoSelecionada) return null;

  const formId = `form-editar-negociacao-pf-${negociacaoSelecionada.id}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Negociação (PF)"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSalvando}>Cancelar</Button>
          <Button type="submit" form={formId} variant="primary" disabled={isSalvando}>
            {isSalvando ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </>
      }
    >
      <EditarNegociacaoPfForm
        negociacaoAtual={negociacaoSelecionada}
        onSuccess={onSuccess}
        onLoadingChange={setIsSalvando}
      />
    </Modal>
  );
}