import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmarExclusaoModal } from "../confirmar-exclusao-modal";
import { useBuscarTituloAtivo } from "@/hooks/modals/use-buscar-titulo-ativo.hook";

jest.mock("@/hooks/modals/use-buscar-titulo-ativo.hook");
const mockUseBuscarTituloAtivo = useBuscarTituloAtivo as jest.MockedFunction<typeof useBuscarTituloAtivo>;

describe("Feature: ConfirmarExclusaoModal", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("[Verde/Positivo] deve carregar o título e disparar onConfirm ao clicar no botão de excluir", async () => {
    const user = userEvent.setup(); // Inicializa a simulação real de usuário
    
    mockUseBuscarTituloAtivo.mockReturnValue({ titulo: "Cliente Alpha", carregandoTitulo: false });
    
    render(
      <ConfirmarExclusaoModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} ativoId="123" tipoAtivo="cliente-pj" tituloFallback="Excluir Empresa" descricao="Aviso" isDeletando={false} />
    );

    expect(screen.getByText('Excluir "Cliente Alpha"')).toBeInTheDocument();
    
    // user.click é assíncrono e dispara todos os eventos reais (hover, pointerdown, mouseup, click)
    await user.click(screen.getByRole("button", { name: /sim, excluir/i }));
    
    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
  });

  it("[Vermelho/Positivo] deve bloquear os botões e impedir o onConfirm se a mutação já estiver em andamento", async () => {
    const user = userEvent.setup();
    mockUseBuscarTituloAtivo.mockReturnValue({ titulo: "Cliente Alpha", carregandoTitulo: false });
    
    render(
      <ConfirmarExclusaoModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} ativoId="123" tipoAtivo="cliente-pj" tituloFallback="Excluir Empresa" descricao="Aviso" isDeletando={true} />
    );

    const btnExcluir = screen.getByRole("button", { name: /excluindo/i });
    expect(btnExcluir).toBeDisabled();

    // Mesmo forçando o clique, o botão HTML disabled absorve e não propaga
    await user.click(btnExcluir);
    
    expect(mockOnConfirm).not.toHaveBeenCalled(); 
  });

  it("[Verde/Negativo] deve exibir o título de fallback caso a busca do hook retorne vazio", () => {
    mockUseBuscarTituloAtivo.mockReturnValue({ titulo: null, carregandoTitulo: false });
    
    render(
      <ConfirmarExclusaoModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} ativoId="123" tipoAtivo="cliente-pj" tituloFallback="Excluir Empresa Genérica" descricao="Aviso" isDeletando={false} />
    );

    expect(screen.getByText("Excluir Empresa Genérica")).toBeInTheDocument();
  });
});