"use client";

import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { ConfirmarExclusaoModalProps } from "@/shared/types/ui/modal/confirmar-exclusao-modal.props";

export function ConfirmarExclusaoModal({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  descricao,
  isDeletando,
}: ConfirmarExclusaoModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={isDeletando ? () => {} : onClose}
      titulo={titulo} // Tipagem estrita respeitada (apenas string)
      footer={
        <div className="flex w-full justify-end gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onClose} 
            disabled={isDeletando}
          >
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={onConfirm} 
            disabled={isDeletando}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isDeletando ? "Excluindo..." : "Sim, Excluir"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 py-2">
        <div className="flex items-start gap-3 rounded-md bg-red-50 p-3 text-red-600 border border-red-100">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            {descricao}
          </div>
        </div>
      </div>
    </Modal>
  );
}