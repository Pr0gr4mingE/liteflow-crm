"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button";
import { EditarClientePfForm } from "./forms/form-editar-cliente-pf";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";

interface EditarClientePfModalProps {
  isOpen: boolean;
  onClose: () => void;
  clienteSelecionado: ClientePf | null;
  onSuccess: () => void;
}

export function EditarClientePfFeature({ isOpen, onClose, clienteSelecionado, onSuccess }: EditarClientePfModalProps) {
  const [isSalvando, setIsSalvando] = useState(false);

  if (!isOpen || !clienteSelecionado) return null;

  const formId = `form-editar-cliente-pf-${clienteSelecionado.id}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Cliente (PF)"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSalvando}>Cancelar</Button>
          <Button type="submit" form={formId} variant="primary" disabled={isSalvando}>
            {isSalvando ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </>
      }
    >
      <EditarClientePfForm
        clienteAtual={clienteSelecionado}
        onSuccess={onSuccess}
        onLoadingChange={setIsSalvando}
      />
    </Modal>
  );
}