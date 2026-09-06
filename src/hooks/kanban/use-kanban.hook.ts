"use client";

import { useState, useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { KanbanColumnProps } from "@/shared/types/ui/kanban/kanban-column.props";

export function useKanban(colunasIniciais: KanbanColumnProps[]) {
  const [colunas, setColunas] = useState<KanbanColumnProps[]>(colunasIniciais);
  const [prevIniciais, setPrevIniciais] = useState<KanbanColumnProps[]>(colunasIniciais);

  // 1. Padrão oficial do React: Atualizar estado derivado durante o render.
  // 2. Usamos stringify para comparar os VALORES (ignora funções), o que blinda
  // o componente contra o loop infinito causado por recriação de arrays no componente pai.
  const dadosMudaram = JSON.stringify(colunasIniciais) !== JSON.stringify(prevIniciais);

  if (dadosMudaram) {
    setPrevIniciais(colunasIniciais);
    setColunas(colunasIniciais);
  }

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    // Ignora se o card for solto fora de uma coluna
    if (!destination) return;
    
    // Ignora se soltar exatamente no mesmo lugar
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    setColunas((prevColunas) => {
      // Cria uma cópia profunda para respeitar a imutabilidade do React
      const novasColunas = prevColunas.map(coluna => ({
        ...coluna,
        cards: [...coluna.cards]
      }));

      // Encontra a coluna de onde saiu e para onde vai
      const origemIndex = novasColunas.findIndex(c => c.id === source.droppableId);
      const destinoIndex = novasColunas.findIndex(c => c.id === destination.droppableId);

      // Arranca o card da coluna original
      const [cardMovido] = novasColunas[origemIndex].cards.splice(source.index, 1);
      
      // Injeta o card na coluna de destino na exata posição (index) que o usuário soltou
      novasColunas[destinoIndex].cards.splice(destination.index, 0, cardMovido);

      return novasColunas;
    });

    // TODO: (Sprint 5) Aqui chamaremos a Action para salvar a nova fase no Banco de Dados!
    console.log(`[API Mock] Mover card ${draggableId} para a fase ${destination.droppableId}`);
  }, []);

  return { colunas, setColunas, handleDragEnd };
}