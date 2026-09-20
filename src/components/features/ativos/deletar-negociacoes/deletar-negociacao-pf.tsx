"use client";

import { ConfirmarExclusaoModal } from "@/components/features/modal/confirmar-exclusao-modal";
import { useDeletarNegociacaoPf } from "@/hooks/ativos/deletar-negociacoes/deletar-negociacao-pf.hook";

interface DeletarNegociacaoPfFeatureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  negociacaoId: string | null;
}

export function DeletarNegociacaoPfFeature({ isOpen, onClose, onSuccess, negociacaoId }: DeletarNegociacaoPfFeatureProps) {
  const { deletar, isDeletando } = useDeletarNegociacaoPf();

  async function handleConfirmar() {
    try {
      if (!negociacaoId) return;
      const resposta = await deletar(negociacaoId);
      if (resposta.sucesso) onSuccess();
      else alert(resposta.mensagem);
    } catch (error: unknown) {
      console.error("[Feature Error - Negociação PF] Erro crítico ao confirmar exclusão:", error);
      alert("Falha crítica na interface ao tentar excluir a negociação.");
    }
  }

  return (
    <ConfirmarExclusaoModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirmar}
      isDeletando={isDeletando}
      ativoId={negociacaoId}
      tipoAtivo="negociacao-pf"
      tituloFallback="Excluir Negociação"
      descricao="Tem certeza que deseja excluir esta negociação? Esta ação não pode ser desfeita."
    />
  );
}