"use client";

import { ConfirmarExclusaoModal } from "@/components/features/modal/confirmar-exclusao-modal";
import { useDeletarTarefa } from "@/hooks/ativos/deletar-tarefas/use-deletar-tarefa.hook";

interface DeletarTarefaFeatureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tarefaId: string | null; 
}

export function DeletarTarefaFeature({ isOpen, onClose, onSuccess, tarefaId }: DeletarTarefaFeatureProps) {
  const { deletar, isDeletando } = useDeletarTarefa();

  async function handleConfirmar() {
    try {
      if (!tarefaId) return;
      const resposta = await deletar(tarefaId);
      if (resposta.sucesso) onSuccess();
      else alert(resposta.mensagem);
    } catch (error: unknown) {
      console.error("[Feature Error - Tarefa] Erro crítico ao confirmar exclusão:", error);
      alert("Falha crítica na interface ao tentar excluir a tarefa.");
    }
  }

  return (
    <ConfirmarExclusaoModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirmar}
      isDeletando={isDeletando}
      ativoId={tarefaId}
      tipoAtivo="tarefa"
      tituloFallback="Excluir Tarefa"
      descricao="Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
    />
  );
}