"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button";
import { EditarNegociacaoPjForm } from "./forms/form-editar-negociacao-pj";
import { NegociacaoPj } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj";

interface EditarNegociacaoPjModalProps {
  isOpen: boolean;
  onClose: () => void;
  negociacaoSelecionada: NegociacaoPj | null;
}

export function EditarNegociacaoPjFeature({ isOpen, onClose, negociacaoSelecionada }: EditarNegociacaoPjModalProps) {
  const [isSalvando, setIsSalvando] = useState(false);

  if (!isOpen || !negociacaoSelecionada) return null;

  const formId = `form-editar-negociacao-pj-${negociacaoSelecionada.id}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Negociação (PJ)"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSalvando}>Cancelar</Button>
          <Button type="submit" form={formId} variant="primary" disabled={isSalvando}>
            {isSalvando ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </>
      }
    >
      <EditarNegociacaoPjForm
        negociacaoAtual={negociacaoSelecionada}
        onSuccess={onClose}
        onLoadingChange={setIsSalvando}
      />
    </Modal>
  );
}