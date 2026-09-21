import { render, screen } from "@testing-library/react";
import { ToastFeedback } from "../toast-feedback"; // Ajuste o caminho se necessário

describe("Componente: ToastFeedback", () => {
  // 1. VERDE / POSITIVO: Exibe a mensagem de sucesso quando acionado com um texto válido
  it("[Verde/Positivo] deve renderizar a mensagem de sucesso na tela quando a prop mensagem for preenchida", () => {
    render(<ToastFeedback mensagem="Cliente Pessoa Física atualizado com sucesso!" />);

    expect(screen.getByText("Cliente Pessoa Física atualizado com sucesso!")).toBeInTheDocument();
  });

  // 2. VERMELHO / POSITIVO: Tentativa de renderizar um estado corrompido ou erro crítico de estrutura (ex: string vazia ou nula), o componente se recusa a exibir lixo na tela
  it("[Vermelho/Positivo] não deve exibir nenhum elemento de toast caso a mensagem venha vazia ou nula", () => {
    const { container } = render(<ToastFeedback mensagem="" />);

    // Garante que o componente retorna vazio/null e não injeta divs fantasmas na árvore DOM
    expect(container.firstChild).toBeNull();
  });

  // 3. VERDE / NEGATIVO: O usuário não disparou nenhuma ação, logo a mensagem é indefinida e o componente fica oculto silenciosamente
  it("[Verde/Negativo] deve permanecer oculto de forma graciosa quando nenhuma mensagem de feedback for fornecida", () => {
    const { container } = render(<ToastFeedback mensagem={null as unknown as string} />);

    expect(container.firstChild).toBeNull();
  });
});