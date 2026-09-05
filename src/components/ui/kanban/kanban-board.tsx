"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { KanbanBoardProps } from "@/shared/types/ui/kanban/kanban-board.props";
import { KanbanColumn } from "./kanban-column";

export function KanbanBoard({ colunas, carregando, onDragEnd, tipoFunil }: KanbanBoardProps) {
  if (carregando) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-sm font-medium text-slate-500">
            Carregando funil {tipoFunil === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}...
          </p>
        </div>
      </div>
    );
  }

  if (colunas.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
        <p className="text-sm text-slate-500">Nenhuma coluna configurada para este funil.</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-[calc(100vh-180px)] w-full items-start gap-6 overflow-x-auto overflow-y-hidden pb-4 pt-2 custom-scrollbar">
        {colunas.map((coluna) => (
          <KanbanColumn key={coluna.id} coluna={coluna} />
        ))}
      </div>
    </DragDropContext>
  );
}