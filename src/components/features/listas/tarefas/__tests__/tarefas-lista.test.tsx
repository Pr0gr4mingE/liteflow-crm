import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextEncoder, TextDecoder: TextDecoder as unknown });

import { render, screen } from "@testing-library/react";
import React from "react";
import { TarefasLista } from "../tarefas-lista";

// 1. Mocks dos Hooks
jest.mock("@/shared/hooks/ui/use-feedback.hook", () => ({
  useFeedback: () => ({ mensagem: null, mostrarSucesso: jest.fn() })
}));

jest.mock("@/hooks/ativos/atualizar-tarefas/use-atualizar-status-tarefa.hook", () => ({
  useAtualizarStatusTarefa: () => ({
    atualizarStatus: jest.fn().mockResolvedValue({ sucesso: true }), 
    atualizandoId: null
  })
}));

// ==========================================
// 2. A SALVAÇÃO: MOCK DOS COMPONENTES FILHOS
// Isso impede o Jest de renderizar os Server Actions que quebram o teste
// ==========================================
jest.mock("@/components/features/ativos/edit-tarefas/editar-tarefa", () => ({
  EditarTarefaFeature: () => {
    console.log("🟢 [Mock] Renderizou a âncora do modal de Editar");
    return <div data-testid="mock-editar-feature" />;
  }
}));

jest.mock("@/components/features/ativos/deletar-tarefas/deletar-tarefa", () => ({
  DeletarTarefaFeature: () => {
    console.log("🟢 [Mock] Renderizou a âncora do modal de Deletar");
    return <div data-testid="mock-deletar-feature" />;
  }
}));

describe("Integração: TarefasLista", () => {
  const mockOnAtualizar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    console.log("-----------------------------------------");
  });

  it("[Verde/Positivo] deve renderizar a lista quando dados válidos forem fornecidos", () => {
    console.log("🚀 Iniciando teste: Renderizar Lista");
    const tarefasMock = [
      { 
        id: "1", 
        titulo: "Reunião de Alinhamento", 
        descricao: "Alinhamento estratégico do trimestre", 
        status: "PENDENTE", 
        tipo: "REUNIAO", 
        dataCriacao: new Date(),
        dataVencimento: new Date()
      }
    ];

    type TarefasProp = React.ComponentProps<typeof TarefasLista>["tarefas"];

    console.log("⏳ Chamando o render()...");
    render(
      <TarefasLista 
        filtroStatus="PENDENTES" 
        tarefas={tarefasMock as TarefasProp} 
        carregando={false} 
        busca="" 
        onAtualizar={mockOnAtualizar} 
      />
    );
    console.log("✅ Render() concluído sem quebrar a callstack!");

    expect(screen.getByText("Reunião de Alinhamento")).toBeInTheDocument();
  });

  it("[Vermelho/Positivo] deve bloquear a exibição da interface real e mostrar o Skeleton quando estiver carregando", () => {
    console.log("🚀 Iniciando teste: Skeleton Loading");
    const { container } = render(
      <TarefasLista filtroStatus="PENDENTES" tarefas={[]} carregando={true} busca="" onAtualizar={mockOnAtualizar} />
    );

    expect(screen.queryByText(/Você não tem tarefas pendentes/i)).not.toBeInTheDocument();
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it("[Verde/Negativo] deve exibir mensagem amigável de fallback quando a matriz de tarefas estiver vazia", () => {
    console.log("🚀 Iniciando teste: Lista Vazia");
    render(
      <TarefasLista filtroStatus="PENDENTES" tarefas={[]} carregando={false} busca="" onAtualizar={mockOnAtualizar} />
    );
    
    expect(screen.getByText("Você não tem tarefas pendentes no momento.")).toBeInTheDocument();
  });
});