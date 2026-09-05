"use client";

import { Modal } from "@/components/ui/modal/modal";
// Importamos a tipagem do seu hook de API(hook que interage com a action de busca de negociacoes)
import { NegociacaoPipeline } from "@/hooks/pipeline/use-pipeline-negociacao.hook";

interface DetalhesNegociacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  negociacao: NegociacaoPipeline | null;
}

export function DetalhesNegociacaoModal({ isOpen, onClose, negociacao }: DetalhesNegociacaoModalProps) {
  // Se o modal for chamado mas não tiver nenhuma negociação selecionada, ele não renderiza nada
  if (!negociacao) return null;

  const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(negociacao.valor);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo={negociacao.titulo}
      footer={
        <button
          onClick={onClose}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
        >
          Fechar
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        {/* Grid de Informações Principais */}
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Valor da Negociação</span>
            <span className="text-xl font-bold text-blue-600">{valorFormatado}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Funil</span>
            <span className="text-sm font-semibold text-slate-700">
              {negociacao.tipo === "PF" ? "Pessoa Física (B2C)" : "Pessoa Jurídica (B2B)"}
            </span>
          </div>
        </div>

        {/* Informações Secundárias */}
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 mt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Fase Atual (ID do Banco)</span>
          <span className="text-sm font-medium text-slate-900">{negociacao.fase}</span>
        </div>

        <div className="flex flex-col gap-1 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Previsão de Fechamento</span>
          <span className="text-sm font-medium text-slate-900">
            {negociacao.dataPrevisaoFechamento || "Nenhuma data informada."}
          </span>
        </div>
        
        {/* Aqui no futuro podemos colocar um formulário de edição ou histórico de atividades (Sprint 6+) */}
      </div>
    </Modal>
  );
}