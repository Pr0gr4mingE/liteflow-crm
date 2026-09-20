"use client";

import { ConfirmarExclusaoModal } from "@/components/features/modal/confirmar-exclusao-modal";
import { useDeletarNegociacaoPj } from "@/hooks/ativos/deletar-negociacoes/deletar-negociacao-pj.hook";

interface DeletarNegociacaoPjFeatureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  negociacaoId: string | null;
}

export function DeletarNegociacaoPjFeature({ isOpen, onClose, onSuccess, negociacaoId }: DeletarNegociacaoPjFeatureProps) {
  const { deletar, isDeletando } = useDeletarNegociacaoPj();

  async function handleConfirmar() {
    try {
      if (!negociacaoId) return;
      const resposta = await deletar(negociacaoId);
      if (resposta.sucesso) onSuccess();
      else alert(resposta.mensagem);
    } catch (error: unknown) {
      console.error("[Feature Error - Negociação PJ] Erro crítico ao confirmar exclusão:", error);
      alert("Falha crítica na interface ao tentar excluir a negociação corporativa.");
    }
  }

  return (
    <ConfirmarExclusaoModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirmar}
      isDeletando={isDeletando}
      ativoId={negociacaoId}
      tipoAtivo="negociacao-pj"
      tituloFallback="Excluir Negociação Corporativa"
      descricao="Tem certeza que deseja excluir esta negociação corporativa? Esta ação não pode ser desfeita."
    />
  );
}