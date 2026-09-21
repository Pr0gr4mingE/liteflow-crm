import { render, screen } from "@testing-library/react";
import React from "react";
import { TarefasLista } from "../tarefas-lista";

jest.mock("@/shared/hooks/ui/use-feedback.hook", () => ({
  useFeedback: () => ({ mensagem: null, mostrarSucesso: jest.fn() })
}));

describe("Integração: TarefasLista", () => {
  const mockOnAtualizar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("[Verde/Positivo] deve renderizar a lista quando dados válidos forem fornecidos", () => {
    const tarefasMock = [
      { 
        id: "1", 
        titulo: "Reunião de Alinhamento", 
        descricao: "Alinhamento estratégico do trimestre", // Adicionado
        status: "PENDENTE", 
        tipo: "REUNIAO", 
        dataCriacao: new Date(),
        dataVencimento: new Date() // Adicionado
      }
    ];

    type TarefasProp = React.ComponentProps<typeof TarefasLista>["tarefas"];

    render(
      <TarefasLista 
        filtroStatus="PENDENTES" 
        tarefas={tarefasMock as TarefasProp} 
        carregando={false} 
        busca="" 
        onAtualizar={mockOnAtualizar} 
      />
    );

    expect(screen.getByText("Reunião de Alinhamento")).toBeInTheDocument();
  });

    it("[Vermelho/Positivo] deve bloquear a exibição da interface real e mostrar o Skeleton quando estiver carregando", () => {
    const { container } = render(
      <TarefasLista filtroStatus="PENDENTES" tarefas={[]} carregando={true} busca="" onAtualizar={mockOnAtualizar} />
    );

    expect(screen.queryByText(/Você não tem tarefas pendentes/i)).not.toBeInTheDocument();
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it("[Verde/Negativo] deve exibir mensagem amigável de fallback quando a matriz de tarefas estiver vazia", () => {
    render(
      <TarefasLista filtroStatus="PENDENTES" tarefas={[]} carregando={false} busca="" onAtualizar={mockOnAtualizar} />
    );
    
    expect(screen.getByText("Você não tem tarefas pendentes no momento.")).toBeInTheDocument();
  });
});