import { KanbanCardProps } from "./kanban-card.props";

export interface KanbanColumnProps {
  id: string; 
  titulo: string; 
  corDoCabecalho: string; 
  cards: KanbanCardProps[]; 
}