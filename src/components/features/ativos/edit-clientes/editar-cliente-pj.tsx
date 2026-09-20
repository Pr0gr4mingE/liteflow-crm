"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button";
import { EditarClientePjForm } from "./forms/form-editar-cliente-pj";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";

interface EditarClientePjModalProps {
  isOpen: boolean;
  onClose: () => void;
  clienteSelecionado: ClientePj | null;
}

export function EditarClientePjFeature({ isOpen, onClose, clienteSelecionado }: EditarClientePjModalProps) {
  const [isSalvando, setIsSalvando] = useState(false);

  if (!isOpen || !clienteSelecionado) return null;

  const formId = `form-editar-cliente-pj-${clienteSelecionado.id}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Empresa (PJ)"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSalvando}>Cancelar</Button>
          <Button type="submit" form={formId} variant="primary" disabled={isSalvando}>
            {isSalvando ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </>
      }
    >
      <EditarClientePjForm
        clienteAtual={clienteSelecionado}
        onSuccess={onClose}
        onLoadingChange={setIsSalvando}
      />
    </Modal>
  );
}