import { useState, useCallback } from "react";

export function useFeedback() {
  const [mensagem, setMensagem] = useState<string | null>(null);

  const mostrarSucesso = useCallback((modulo: string) => {
    // Interpola dinamicamente o nome do módulo
    setMensagem(`${modulo} atualizado(a) com sucesso!`);
    
    setTimeout(() => {
      setMensagem(null);
    }, 3000);
  }, []);

  return { mensagem, mostrarSucesso };
}