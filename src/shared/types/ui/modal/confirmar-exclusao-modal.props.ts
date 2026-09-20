import { ReactNode } from "react";
import { TipoAtivo } from "@/hooks/modals/use-buscar-titulo-ativo.hook";

export interface ConfirmarExclusaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  ativoId: string | null;
  tipoAtivo: TipoAtivo;
  tituloFallback: string;
  descricao: ReactNode;
  isDeletando: boolean;
}