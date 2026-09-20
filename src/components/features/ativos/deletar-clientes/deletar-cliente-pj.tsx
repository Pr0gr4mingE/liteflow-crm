"use client";

import { ConfirmarExclusaoModal } from "@/components/features/modal/confirmar-exclusao-modal";
import { useDeletarClientePj } from "@/hooks/ativos/deletar-clientes/deletar-cliente-pj.hook";

interface DeletarClientePjFeatureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  clienteId: string | null;
}

export function DeletarClientePjFeature({ isOpen, onClose, onSuccess, clienteId }: DeletarClientePjFeatureProps) {
  const { deletar, isDeletando } = useDeletarClientePj();

  async function handleConfirmar() {
    try {
      if (!clienteId) return;
      const resposta = await deletar(clienteId);
      if (resposta.sucesso) onSuccess();
      else alert(resposta.mensagem);
    } catch (error: unknown) {
      console.error("[Feature Error - Cliente PJ] Erro crítico ao confirmar exclusão:", error);
      alert("Falha crítica na interface ao tentar excluir a empresa.");
    }
  }

  return (
    <ConfirmarExclusaoModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirmar}
      isDeletando={isDeletando}
      ativoId={clienteId}
      tipoAtivo="cliente-pj"
      tituloFallback="Excluir Empresa"
      descricao="Tem certeza que deseja excluir esta empresa? Todos os dados vinculados serão removidos."
    />
  );
}