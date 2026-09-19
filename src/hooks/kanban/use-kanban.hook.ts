"use client";

import { useState, useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { KanbanColumnProps } from "@/shared/types/ui/kanban/kanban-column.props";

export function useKanban(
  colunasIniciais: KanbanColumnProps[],
  aoMoverCard?: (cardId: string, novaFaseId: string) => void
) {
  const [colunas, setColunas] = useState<KanbanColumnProps[]>(colunasIniciais);
  const [prevIniciais, setPrevIniciais] = useState<KanbanColumnProps[]>(colunasIniciais);

  const dadosMudaram = JSON.stringify(colunasIniciais) !== JSON.stringify(prevIniciais);

  if (dadosMudaram) {
    setPrevIniciais(colunasIniciais);
    setColunas(colunasIniciais);
  }

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    if (!destination) return;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    setColunas((prevColunas) => {
      const novasColunas = prevColunas.map(coluna => ({
        ...coluna,
        cards: [...coluna.cards]
      }));

      const origemIndex = novasColunas.findIndex(c => c.id === source.droppableId);
      const destinoIndex = novasColunas.findIndex(c => c.id === destination.droppableId);

      const [cardMovido] = novasColunas[origemIndex].cards.splice(source.index, 1);
      
      novasColunas[destinoIndex].cards.splice(destination.index, 0, cardMovido);

      return novasColunas;
    });

    if (aoMoverCard && source.droppableId !== destination.droppableId) {
      aoMoverCard(draggableId, destination.droppableId);
    }
  }, [aoMoverCard]); 

  return { colunas, setColunas, handleDragEnd };
}