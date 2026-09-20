"use client";

import { ConfirmarExclusaoModal } from "@/components/features/modal/confirmar-exclusao-modal";
import { useDeletarClientePf } from "@/hooks/ativos/deletar-clientes/deletar-cliente-pf.hook";

interface DeletarClientePfFeatureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  clienteId: string | null;
}

export function DeletarClientePfFeature({ isOpen, onClose, onSuccess, clienteId }: DeletarClientePfFeatureProps) {
  const { deletar, isDeletando } = useDeletarClientePf();

  async function handleConfirmar() {
    try {
      if (!clienteId) return;
      const resposta = await deletar(clienteId);
      if (resposta.sucesso) onSuccess();
      else alert(resposta.mensagem);
    } catch (error: unknown) {
      console.error("[Feature Error - Cliente PF] Erro crítico ao confirmar exclusão:", error);
      alert("Falha crítica na interface ao tentar excluir o cliente.");
    }
  }

  return (
    <ConfirmarExclusaoModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirmar}
      isDeletando={isDeletando}
      ativoId={clienteId}
      tipoAtivo="cliente-pf"
      tituloFallback="Excluir Cliente"
      descricao="Tem certeza que deseja excluir este cliente? Todos os dados vinculados serão removidos."
    />
  );
}