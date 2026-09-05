import { DropResult } from "@hello-pangea/dnd";
import { KanbanColumnProps } from "./kanban-column.props";

export interface KanbanBoardProps {
  colunas: KanbanColumnProps[];
  carregando?: boolean;
  onDragEnd: (result: DropResult) => void; 
  tipoFunil: "PF" | "PJ"; 
}