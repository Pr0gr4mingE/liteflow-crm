"use client";

import { Menu, User } from "lucide-react";
import { HeaderProps } from "@/shared/types/layout/header.layout";
import { BarraBusca } from "@/components/features/layout/barra-pesquisa"; // Ajuste o import se criou em outra pasta

export function Header({ aoClicarMenu }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 gap-4 z-50">
      
      {/* Esquerda: Menu Mobile */}
      <div className="flex items-center flex-1">
        <button onClick={aoClicarMenu} className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu size={24} />
        </button>
      </div>

      {/* Centro: Componente Isolado de Busca */}
      <BarraBusca />

      {/* Direita: Avatar Fixo Genérico */}
      <div className="flex items-center justify-end flex-1">
        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200 shrink-0 select-none">
          <User size={18} />
        </div>
      </div>

    </header>
  );
}