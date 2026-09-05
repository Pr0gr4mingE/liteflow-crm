"use client";

import { Draggable } from "@hello-pangea/dnd";
import { KanbanCardProps } from "@/shared/types/ui/kanban/kanban-card.props";
import { MAPA_CORES } from "@/shared/utils/constantes/mapa-cores";

export function KanbanCard({ card, index }: { card: KanbanCardProps; index: number }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => card.aoClicar?.(card.id)}
          className={`group relative flex flex-col gap-2 rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
            snapshot.isDragging ? "ring-2 ring-blue-400 rotate-2 shadow-lg" : "border-slate-200"
          }`}
        >
          {card.corDestaque && (
            <div className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${MAPA_CORES[card.corDestaque]}`} />
          )}
          
          <h4 className="text-sm font-semibold text-slate-900">{card.titulo}</h4>
          
          {card.subtitulo && <p className="text-xs text-slate-500">{card.subtitulo}</p>}
          
          {card.valorFormatado && (
            <div className="mt-2 inline-block rounded-md bg-slate-50 px-2 py-1 w-max">
              <span className="text-xs font-medium text-slate-700">{card.valorFormatado}</span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}