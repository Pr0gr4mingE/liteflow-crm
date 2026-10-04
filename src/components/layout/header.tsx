"use client";

import { Menu } from "lucide-react";
import { HeaderProps } from "@/shared/types/layout/header.layout";
import { BarraBusca } from "@/components/features/layout/barra-pesquisa"; // Ajuste o import se criou em outra pasta

export function Header({ aoClicarMenu }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 gap-4 z-50">
      
      {/* Esquerda: Menu Mobile (Ocupa 1 fração do espaço) */}
      <div className="flex items-center flex-1">
        <button onClick={aoClicarMenu} className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu size={24} />
        </button>
      </div>

      {/* Centro: Componente Isolado de Busca */}
      <div className="flex justify-center w-full max-w-xl">
        <BarraBusca />
      </div>

      {/* Direita: Elemento vazio (Ocupa 1 fração do espaço para equilibrar o layout) */}
      <div className="flex flex-1"></div>

    </header>
  );
}