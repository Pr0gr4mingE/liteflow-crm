"use client";

import { Droppable } from "@hello-pangea/dnd";
import { KanbanColumnProps } from "@/shared/types/ui/kanban/kanban-column.props";
import { KanbanCard } from "./kanban-card";

export function KanbanColumn({ coluna }: { coluna: KanbanColumnProps }) {
  return (
    <div className="flex h-full w-80 min-w-[320px] flex-col rounded-xl bg-slate-100/50 border border-slate-200">
      <div className={`flex items-center justify-between rounded-t-xl border-b border-slate-200 px-4 py-3 ${coluna.corDoCabecalho}`}>
        <h3 className="font-semibold text-slate-700">{coluna.titulo}</h3>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/50 text-xs font-bold text-slate-700">
          {coluna.cards.length}
        </span>
      </div>

      <Droppable droppableId={coluna.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-1 flex-col gap-3 p-3 transition-colors ${
              snapshot.isDraggingOver ? "bg-blue-50/50" : "bg-transparent"
            }`}
          >
            {coluna.cards.map((card, index) => (
              <KanbanCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}