import { ReactNode } from "react";

export interface ConfirmarExclusaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  titulo: string;
  descricao: ReactNode;
  isDeletando: boolean;
}