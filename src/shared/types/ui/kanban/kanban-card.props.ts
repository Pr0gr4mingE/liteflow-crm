import { CorDestaque } from "@/shared/utils/types/cor-destaque.type";

export interface KanbanCardProps {
  id: string;
  titulo: string;
  subtitulo?: string; 
  valorFormatado?: string; 
  corDestaque?: CorDestaque; 
  aoClicar?: (id: string) => void; 
}