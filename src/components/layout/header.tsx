"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, User, Briefcase, CheckSquare, Loader2, XCircle } from "lucide-react";
import { HeaderProps } from "@/shared/types/layout/header.layout";
import { useIniciais } from "@/shared/hooks/layout/use-iniciais-icone.hook";
import { useBuscaGlobal } from "@/hooks/busca/use-busca-global.hook";
import { TipoEntidadeBusca } from "@/shared/utils/types/tipo-entidade-busca.util";

interface HeaderAtualizadoProps extends HeaderProps {
  nomeUsuario?: string;
}

export function Header({ aoClicarMenu, nomeUsuario }: HeaderAtualizadoProps) {
  const iniciais = useIniciais(nomeUsuario);
  
  const [termo, setTermo] = useState("");
  const [isDropdownAberto, setIsDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { resultados, carregando, erro } = useBuscaGlobal(termo);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const renderizarIcone = (tipo: TipoEntidadeBusca) => {
    switch (tipo) {
      case "CLIENTE": return <User size={16} className="text-blue-500" />;
      case "NEGOCIACAO": return <Briefcase size={16} className="text-amber-500" />;
      case "TAREFA": return <CheckSquare size={16} className="text-emerald-500" />;
      default: return <Search size={16} className="text-slate-400" />;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 gap-4 z-50">
      
      {/* Esquerda: Menu Mobile */}
      <div className="flex items-center flex-1">
        <button onClick={aoClicarMenu} className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu size={24} />
        </button>
      </div>

      {/* Centro: Barra de Pesquisa */}
      <div className="flex-1 flex justify-center w-full max-w-lg relative" ref={dropdownRef}>
        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-100 transition-all hidden sm:flex">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Buscar clientes, negociações ou tarefas..." 
            value={termo}
            onChange={(e) => {
              setTermo(e.target.value);
              setIsDropdownAberto(true);
            }}
            onFocus={() => setIsDropdownAberto(true)}
            className="bg-transparent border-none focus:outline-none ml-2 w-full text-sm text-slate-700 placeholder:text-slate-400"
          />
          {carregando && <Loader2 size={16} className="text-slate-400 animate-spin shrink-0 ml-2" />}
        </div>

        {/* Dropdown de Resultados */}
        {isDropdownAberto && termo.trim().length >= 2 && (
          <div className="absolute top-12 left-0 w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden flex flex-col max-h-[400px]">
            
            {erro && (
              <div className="p-4 text-sm text-red-600 flex items-center gap-2">
                <XCircle size={16} />
                {erro}
              </div>
            )}

            {!carregando && !erro && resultados.length === 0 && (
              <div className="p-4 text-sm text-slate-500 text-center">
                Nenhum resultado encontrado para &quot;{termo}&quot;.
              </div>
            )}

            {!erro && resultados.length > 0 && (
              <ul className="overflow-y-auto p-2 space-y-1">
                {resultados.map((item) => (
                  <li key={`${item.tipo}-${item.id}`}>
                    <Link 
                      href={item.url}
                      onClick={() => setIsDropdownAberto(false)}
                      className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-md transition-colors"
                    >
                      <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md shrink-0">
                        {renderizarIcone(item.tipo)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-slate-700 truncate">
                          {item.titulo}
                        </span>
                        <span className="text-xs text-slate-500 truncate">
                          {item.subtitulo}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Direita: Avatar */}
      <div className="flex items-center justify-end flex-1">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200 shrink-0 select-none">
          {iniciais}
        </div>
      </div>

    </header>
  );
}