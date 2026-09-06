"use client";

import { useState, useCallback } from "react";
import { criarTarefaAction } from "@/actions/ativos/cadastrar-ativos/tarefas/criar-tarefa.action";

export function useCriarTarefa() {
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const criarTarefa = useCallback(async (formData: FormData): Promise<boolean> => {
    setIsLoading(true);
    setErro(null);

    try {
      // Repassa o form cru nativo direto para a Action
      const resultado = await criarTarefaAction(formData);

      if (!resultado.sucesso) {
        setErro(resultado.mensagem || "Falha ao criar tarefa.");
        return false;
      }

      return true; // Sucesso absoluto
    } catch (err) {
      console.error("[Hook Error] Falha na execução da action criarTarefa:", err);
      setErro("Erro inesperado de comunicação.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { criarTarefa, isLoading, erro };
}